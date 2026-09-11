import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { reservations } from "@db/schema";
import { findRoom } from "../contracts/catalog";
import { rateLimit, clientIp } from "./rate-limit";

const ghanaPhone = z
  .string()
  .trim()
  .regex(/^(\+233|0)\d{9}$/, "Enter a valid Ghanaian phone number, e.g. 0267495057");

const dateStr = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date");

const base = {
  name: z.string().trim().min(2, "Please enter your name").max(120),
  phone: ghanaPhone,
  email: z.string().trim().email("Enter a valid email").max(160).optional().or(z.literal("")),
  guests: z.number().int().min(1).max(20),
  notes: z.string().trim().max(500).optional(),
  website: z.string().max(0).optional().or(z.literal("")),
  elapsedMs: z.number().int().min(0),
};

const reservationInput = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("room"),
    roomId: z.string().min(1).max(64),
    checkIn: dateStr,
    checkOut: dateStr,
    ...base,
  }),
  z.object({
    type: z.literal("table"),
    date: dateStr,
    time: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Invalid time"),
    ...base,
  }),
]);

function todayAccra(): string {
  return new Date().toLocaleDateString("en-CA", { timeZone: "Africa/Accra" });
}

export const reservationRouter = createRouter({
  create: publicQuery.input(reservationInput).mutation(async ({ input, ctx }) => {
    if (!rateLimit(`reservation:${clientIp(ctx.req)}`, 5, 10 * 60 * 1000)) {
      throw new TRPCError({
        code: "TOO_MANY_REQUESTS",
        message: "Too many reservation attempts. Please call us instead: +233 26 749 5057.",
      });
    }
    if (input.website) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Spam detected." });
    }
    if (input.elapsedMs < 3000) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Form submitted too quickly. Please try again." });
    }

    const today = todayAccra();
    let nights: number | null = null;
    let totalPesewas: number | null = null;
    let roomId: string | null = null;

    if (input.type === "room") {
      const room = findRoom(input.roomId);
      if (!room) throw new TRPCError({ code: "BAD_REQUEST", message: "Unknown room type." });
      if (input.checkIn < today) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Check-in date cannot be in the past." });
      }
      nights = Math.round((Date.parse(input.checkOut) - Date.parse(input.checkIn)) / 86400000);
      if (!Number.isFinite(nights) || nights < 1 || nights > 60) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Check-out must be after check-in (max 60 nights)." });
      }
      if (input.guests > room.capacity) {
        throw new TRPCError({ code: "BAD_REQUEST", message: `${room.name} sleeps up to ${room.capacity} guests.` });
      }
      roomId = room.id;
      totalPesewas = room.pricePerNightPesewas * nights;
    } else {
      if (input.date < today) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Please choose a date in the future." });
      }
      if (input.guests > 12) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "For parties above 12, please call us: +233 26 749 5057." });
      }
    }

    const reference = `JKR-${Date.now().toString(36).toUpperCase()}${Math.floor(Math.random() * 90 + 10)}`;
    await getDb().insert(reservations).values({
      reference,
      type: input.type,
      roomId,
      name: input.name,
      phone: input.phone,
      email: input.email || null,
      checkIn: input.type === "room" ? input.checkIn : null,
      checkOut: input.type === "room" ? input.checkOut : null,
      date: input.type === "table" ? input.date : null,
      time: input.type === "table" ? input.time : null,
      guests: input.guests,
      nights,
      totalPesewas,
      notes: input.notes ?? null,
    });

    return { reference, nights, totalPesewas };
  }),
});
