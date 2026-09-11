import { Link } from "react-router";
import { BUSINESS } from "@contracts/catalog";

export function Footer() {
  return (
    <footer className="bg-charcoal text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3">
        <div>
          <p className="font-display text-3xl font-semibold">
            Julikart<span className="text-terracotta">.</span>
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-cream/70">
            {BUSINESS.tagline} One stop on the Mallam–Gbawe Road for authentic Ghanaian food,
            comfortable stays and everyday shopping.
          </p>
        </div>
        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-gold">Visit us</h2>
          <address className="mt-4 text-sm not-italic leading-relaxed text-cream/80">
            {BUSINESS.address}
            <br />
            {BUSINESS.area}
          </address>
          <ul className="mt-3 space-y-1 text-sm">
            {BUSINESS.phones.map((p) => (
              <li key={p}>
                <a
                  href={`tel:${p.replace(/\s/g, "")}`}
                  className="text-cream/80 underline-offset-2 transition-colors hover:text-gold hover:underline"
                >
                  {p}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-gold">Opening hours</h2>
          <ul className="mt-4 space-y-2 text-sm text-cream/80">
            {BUSINESS.hours.map((h) => (
              <li key={h.days} className="flex justify-between gap-6">
                <span>{h.days}</span>
                <span className="font-display">{h.time}</span>
              </li>
            ))}
          </ul>
          <a
            href={BUSINESS.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-block rounded-full border border-cream/40 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-cream transition-colors hover:border-gold hover:text-gold"
          >
            Get directions
          </a>
        </div>
      </div>
      <div className="border-t border-cream/15">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-5 text-xs text-cream/60 sm:flex-row">
          <p>© {new Date().getFullYear()} Julikart, Gbawe — Accra. All rights reserved.</p>
          <nav className="flex gap-6" aria-label="Legal">
            <Link to="/privacy" className="transition-colors hover:text-cream">
              Privacy Policy
            </Link>
            <Link to="/terms" className="transition-colors hover:text-cream">
              Terms &amp; Conditions
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
