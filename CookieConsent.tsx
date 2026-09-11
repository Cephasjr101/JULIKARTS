import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getConsent, setConsent } from "@/lib/consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(getConsent() === null);
  }, []);

  if (!visible) return null;

  const choose = (value: "accepted" | "rejected") => {
    setConsent(value);
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie and privacy consent"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-cream/95 backdrop-blur supports-[backdrop-filter]:bg-cream/85"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-foreground">
          We use a small amount of privacy-friendly, first-party analytics to understand which pages
          are useful — no advertising trackers, no cross-site cookies. Read our{" "}
          <Link to="/privacy" className="font-semibold text-rust underline underline-offset-2">
            privacy policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => choose("rejected")}
            className="rounded-full border border-ink/25 px-6 py-2.5 text-sm font-semibold uppercase tracking-wider text-ink transition-colors hover:border-ink hover:bg-ink hover:text-cream"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={() => choose("accepted")}
            className="rounded-full bg-rust px-6 py-2.5 text-sm font-semibold uppercase tracking-wider text-cream transition-colors hover:bg-terracotta"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
