import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { orders, orderItems } from "@db/schema";
import { findCatalogItem } from "../contracts/catalog";
import { rateLimit, clientIp } from "./rate-limit";

const ghanaPhone = z
  .string()
  .trim()
  .regex(/^(\+233|0)\d{9}$/, "Enter a valid Ghanaian phone number, e.g. 0267495057");

const orderInput = z.object({
  items: z
    .array(
      z.object({
        catalogId: z.string().min(1).max(64),
        quantity: z.number().int().min(1).max(50),
      }),
    )
    .min(1, "Your order is empty")
    .max(30),
  customerName: z.string().trim().min(2, "Please enter your name").max(120),
  phone: ghanaPhone,
  fulfillment: z.enum(["delivery", "pickup"]),
  address: z.string().trim().max(300).optional(),
  notes: z.string().trim().max(500).optional(),
  // Spam protection: honeypot must stay empty, form must take > 3s to fill
  website: z.string().max(0).optional().or(z.literal("")),
  elapsedMs: z.number().int().min(0),
});

export const orderRouter = createRouter({
  create: publicQuery.input(orderInput).mutation(async ({ input, ctx }) => {
    if (!rateLimit(`order:${clientIp(ctx.req)}`, 5, 10 * 60 * 1000)) {
      throw new TRPCError({
        code: "TOO_MANY_REQUESTS",
        message: "Too many orders from this connection. Please call us instead: +233 26 749 5057.",
      });
    }
    if (input.website) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Spam detected." });
    }
    if (input.elapsedMs < 3000) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Form submitted too quickly. Please try again." });
    }
    if (input.fulfillment === "delivery" && (!input.address || input.address.length < 5)) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Please enter a delivery address." });
    }

    // Server-side pricing from the trusted catalog — never trust client prices.
    let total = 0;
    const lines: { catalogId: string; name: string; unitPricePesewas: number; quantity: number }[] = [];
    for (const item of input.items) {
      const cat = findCatalogItem(item.catalogId);
      if (!cat) {
        throw new TRPCError({ code: "BAD_REQUEST", message: `Unknown item: ${item.catalogId}` });
      }
      total += cat.pricePesewas * item.quantity;
      lines.push({ catalogId: item.catalogId, name: cat.name, unitPricePesewas: cat.pricePesewas, quantity: item.quantity });
    }

    const orderNumber = `JK-${Date.now().toString(36).toUpperCase()}${Math.floor(Math.random() * 90 + 10)}`;
    const db = getDb();
    const [result] = await db.insert(orders).values({
      orderNumber,
      customerName: input.customerName,
      phone: input.phone,
      fulfillment: input.fulfillment,
      address: input.address ?? null,
      notes: input.notes ?? null,
      totalPesewas: total,
    });
    const orderId = Number(result.insertId);
    await db.insert(orderItems).values(lines.map((l) => ({ ...l, orderId })));

    return { orderNumber, totalPesewas: total };
  }),
});
