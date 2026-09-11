import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { CookieConsent } from "./CookieConsent";
import { CartDrawer } from "./CartDrawer";
import { trpc } from "@/providers/trpc";
import { getConsent } from "@/lib/consent";

const TITLES: Record<string, string> = {
  "/": "Julikart — Restaurant, Hotel & Mart | Mallam–Gbawe Road, Accra",
  "/restaurant": "Restaurant & Food Ordering — Julikart, Gbawe Accra",
  "/hotel": "Hotel Rooms & Reservations — Julikart, Gbawe Accra",
  "/mart": "Shopping Mart — Julikart, Gbawe Accra",
  "/privacy": "Privacy Policy — Julikart",
  "/terms": "Terms & Conditions — Julikart",
};

export function Layout() {
  const location = useLocation();
  const track = trpc.analytics.track.useMutation();
  const trackRef = useRef(track);
  trackRef.current = track;

  // Scroll to top + per-page title + first-party analytics (consent-gated).
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = TITLES[location.pathname] ?? "Page not found — Julikart";
    if (getConsent() === "accepted") {
      trackRef.current.mutate({ path: location.pathname, referrer: document.referrer || undefined });
    }
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <CookieConsent />
    </div>
  );
}
