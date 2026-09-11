import { createRouter, publicQuery } from "./middleware";
import { orderRouter } from "./order";
import { reservationRouter } from "./reservation";
import { analyticsRouter } from "./analytics";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  order: orderRouter,
  reservation: reservationRouter,
  analytics: analyticsRouter,
});

export type AppRouter = typeof appRouter;
