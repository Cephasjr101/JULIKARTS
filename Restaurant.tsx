import { Reveal } from "@/components/Reveal";
import { ReservationForm } from "@/components/ReservationForm";
import { useCart } from "@/cart/CartContext";
import { MENU, formatGhs, BUSINESS } from "@contracts/catalog";

export default function Restaurant() {
  const { add, openCart } = useCart();

  return (
    <>
      <section className="bg-charcoal px-5 py-20 text-cream sm:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">The Restaurant</p>
            <h1 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-tight sm:text-6xl">
              Ghanaian favourites, <span className="italic text-terracotta">hot off the fire.</span>
            </h1>
            <p className="mt-5 max-w-xl leading-relaxed text-cream/80">
              Dine in our warm dining room, pick up on your way home, or get delivery around Gbawe
              and Mallam. Kitchen open {BUSINESS.hours[0].days}, {BUSINESS.hours[0].time}.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Menu */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:py-20" aria-labelledby="menu-heading">
        <Reveal>
          <h2 id="menu-heading" className="font-display text-3xl font-semibold sm:text-4xl">
            The menu
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Add dishes to your basket, then place your order — we confirm by phone. Payment on
            pickup or delivery.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MENU.map((item, i) => (
            <Reveal key={item.id} delay={(i % 3) * 120} as="article">
              <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-ink/10 bg-card">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.alt}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  {item.tag && (
                    <span className="absolute left-4 top-4 rounded-full bg-charcoal/85 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-gold">
                      {item.tag}
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-xl font-semibold leading-snug">{item.name}</h3>
                    <p className="shrink-0 font-display text-lg font-semibold text-rust">
                      {formatGhs(item.pricePesewas)}
                    </p>
                  </div>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      add(item.id);
                      openCart();
                    }}
                    className="mt-5 rounded-full border border-rust px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-rust transition-colors hover:bg-rust hover:text-cream"
                  >
                    Add to basket
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Table reservation */}
      <section className="bg-charcoal px-5 py-20 text-cream sm:py-24" aria-labelledby="table-heading">
        <div className="mx-auto grid max-w-6xl items-start gap-10 md:grid-cols-2">
          <Reveal>
            <h2 id="table-heading" className="font-display text-3xl font-semibold sm:text-4xl">
              Reserve a <span className="italic text-terracotta">table</span>
            </h2>
            <p className="mt-4 leading-relaxed text-cream/80">
              Birthday dinner, family lunch or an evening with friends — tell us when and we will
              have your table ready. We confirm every reservation by phone.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-cream/70">
              {BUSINESS.hours.map((h) => (
                <li key={h.days} className="flex gap-3">
                  <span className="font-semibold text-cream">{h.days}:</span> {h.time}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={160}>
            <div className="text-ink">
              <ReservationForm type="table" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
