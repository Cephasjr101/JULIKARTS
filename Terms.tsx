import { BUSINESS } from "@contracts/catalog";

export default function Terms() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-16 sm:py-20">
      <h1 className="font-display text-4xl font-semibold sm:text-5xl">Terms &amp; Conditions</h1>
      <p className="mt-3 text-sm text-muted-foreground">Last updated: September 2026</p>

      <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-foreground/90">
        <section>
          <h2 className="font-display text-2xl font-semibold">1. About these terms</h2>
          <p className="mt-3">
            These terms govern your use of the Julikart website and the orders and reservations you
            place through it. Julikart operates at {BUSINESS.address}. By placing an order or
            reservation, you accept these terms.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold">2. Orders (restaurant &amp; mart)</h2>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>All prices are in Ghana cedis (GH₵) and include applicable taxes.</li>
            <li>
              An order is confirmed only when we call you to confirm it. If an item is unavailable,
              we will offer a substitute or remove it and adjust your total.
            </li>
            <li>Payment is made on pickup or on delivery, in cash or by mobile money.</li>
            <li>
              Delivery is available within Gbawe, Mallam and surrounding areas; we will confirm the
              delivery fee (if any) when we call.
            </li>
            <li>Opening hours: {BUSINESS.hours[0].days} {BUSINESS.hours[0].time}; {BUSINESS.hours[1].days} {BUSINESS.hours[1].time}.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold">3. Reservations (hotel &amp; tables)</h2>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>Reservations are held once confirmed by our team by phone.</li>
            <li>Hotel check-in is from 2:00 PM and check-out is by 12:00 PM.</li>
            <li>
              Rooms are payable at the hotel. If you need to cancel, please call us at least 24 hours
              before check-in.
            </li>
            <li>Restaurant tables are held for 30 minutes past the reserved time.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold">4. Acceptable use</h2>
          <p className="mt-3">
            Do not misuse this website — including attempting to disrupt the service, submit false
            or fraudulent orders, or access data that is not yours. We may refuse service where we
            reasonably suspect abuse.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold">5. Liability</h2>
          <p className="mt-3">
            We work hard to keep menu, product and pricing information accurate, but errors can
            happen; the price confirmed by phone prevails. To the extent permitted by law, Julikart
            is not liable for indirect losses arising from use of this website.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold">6. Contact</h2>
          <p className="mt-3">
            Questions about these terms? Call {BUSINESS.phones[0]} or visit us at {BUSINESS.address}.
          </p>
        </section>
      </div>
    </article>
  );
}
