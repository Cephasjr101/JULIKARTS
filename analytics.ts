import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { pageViews } from "@db/schema";
import { rateLimit, clientIp } from "./rate-limit";

/**
 * First-party, cookieless analytics. Only fires after the visitor accepts
 * the cookie/consent banner. Stores only path + referrer + timestamp —
 * no cookies, no IP storage, no cross-site tracking.
 */
export const analyticsRouter = createRouter({
  track: publicQuery
    .input(
      z.object({
        path: z.string().min(1).max(200).regex(/^\//, "Path must be site-relative"),
        referrer: z.string().max(300).optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      if (!rateLimit(`analytics:${clientIp(ctx.req)}`, 60, 60 * 1000)) {
        return { ok: false };
      }
      await getDb().insert(pageViews).values({
        path: input.path,
        referrer: input.referrer ?? null,
      });
      return { ok: true };
    }),
});
