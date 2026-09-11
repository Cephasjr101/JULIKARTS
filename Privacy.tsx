import { BUSINESS } from "@contracts/catalog";

export default function Privacy() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-16 sm:py-20">
      <h1 className="font-display text-4xl font-semibold sm:text-5xl">Privacy Policy</h1>
      <p className="mt-3 text-sm text-muted-foreground">Last updated: September 2026</p>

      <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-foreground/90">
        <section>
          <h2 className="font-display text-2xl font-semibold">Who we are</h2>
          <p className="mt-3">
            Julikart is a restaurant, hotel and shopping mart located at {BUSINESS.address}. You can
            reach us on {BUSINESS.phones[0]} about anything in this policy.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold">What we collect</h2>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>
              <strong>Orders:</strong> your name, phone number, delivery address (for delivery
              orders), notes, and the items you ordered — used only to prepare and deliver your
              order and to contact you about it.
            </li>
            <li>
              <strong>Reservations:</strong> your name, phone number, optional email, dates, and
              guest count — used only to hold and confirm your table or room.
            </li>
            <li>
              <strong>Analytics (only with your consent):</strong> if you tap “Accept” on the
              consent banner, we record which pages are visited and the referring site. This is
              first-party and cookieless — we do not store your IP address and we do not use
              advertising or cross-site trackers.
            </li>
            <li>
              <strong>Consent preference:</strong> your accept/reject choice is stored in your
              browser’s local storage so we don’t ask on every visit. It never leaves your device.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold">What we never do</h2>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>We never sell or rent your personal information.</li>
            <li>We never share your details with advertisers or data brokers.</li>
            <li>We never send marketing messages without your permission.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold">How long we keep it</h2>
          <p className="mt-3">
            Order and reservation records are kept for up to 24 months for accounting and customer
            service, then deleted. Analytics page-view records are kept for up to 12 months.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold">Security</h2>
          <p className="mt-3">
            This site is served over HTTPS only, and your submissions are protected in transit.
            Access to order and reservation data is restricted to the Julikart team members who need
            it to serve you.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold">Your rights</h2>
          <p className="mt-3">
            Under the Ghana Data Protection Act, 2012 (Act 843), you may ask us what personal data
            we hold about you, request a correction, or ask us to delete it. To exercise any of
            these rights, call {BUSINESS.phones[0]} or visit us at the address above.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold">Changes</h2>
          <p className="mt-3">
            If we update this policy, we will post the new version on this page with a new “last
            updated” date.
          </p>
        </section>
      </div>
    </article>
  );
}
