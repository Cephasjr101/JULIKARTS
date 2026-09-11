import { Reveal } from "@/components/Reveal";
import { useCart } from "@/cart/CartContext";
import { PRODUCTS, formatGhs, BUSINESS } from "@contracts/catalog";

export default function Mart() {
  const { add, openCart } = useCart();
  const categories = [...new Set(PRODUCTS.map((p) => p.category))];

  return (
    <>
      <section className="relative flex min-h-[55vh] items-end overflow-hidden bg-charcoal">
        <img
          src="/images/mart-hero.webp"
          alt="Bright, neatly stocked supermarket aisle at Julikart Mart in Gbawe"
          className="absolute inset-0 h-full w-full object-cover opacity-70"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
        <div className="relative mx-auto w-full max-w-6xl px-5 pb-16 pt-32">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">The Mart</p>
            <h1 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-tight text-cream sm:text-6xl">
              Everyday essentials, <span className="italic text-terracotta">stocked daily.</span>
            </h1>
            <p className="mt-5 max-w-xl leading-relaxed text-cream/85">
              Order online for pickup or delivery around Gbawe and Mallam, or browse the shelves in
              person — {BUSINESS.hours[0].days}, {BUSINESS.hours[0].time}.
            </p>
          </Reveal>
        </div>
      </section>

      {categories.map((cat) => (
        <section
          key={cat}
          className="mx-auto max-w-6xl px-5 py-12 first:pt-16"
          aria-labelledby={`cat-${cat.replace(/\W+/g, "-").toLowerCase()}`}
        >
          <Reveal>
            <h2
              id={`cat-${cat.replace(/\W+/g, "-").toLowerCase()}`}
              className="font-display text-2xl font-semibold sm:text-3xl"
            >
              {cat}
            </h2>
          </Reveal>
          <div className="mt-8 grid grid-cols-2 gap-5 lg:grid-cols-3">
            {PRODUCTS.filter((p) => p.category === cat).map((p, i) => (
              <Reveal key={p.id} delay={i * 100} as="article">
                <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-ink/10 bg-card">
                  <div className="aspect-square overflow-hidden bg-secondary">
                    <img
                      src={p.image}
                      alt={p.alt}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-lg font-semibold leading-snug">{p.name}</h3>
                    <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {p.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <p className="font-display text-lg font-semibold text-rust">
                        {formatGhs(p.pricePesewas)}
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          add(p.id);
                          openCart();
                        }}
                        className="rounded-full border border-rust px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-rust transition-colors hover:bg-rust hover:text-cream"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      ))}

      <section className="mx-auto max-w-6xl px-5 pb-20 text-center">
        <Reveal>
          <p className="mx-auto max-w-lg text-sm leading-relaxed text-muted-foreground">
            Looking for something specific? Call us on{" "}
            <a
              href={`tel:${BUSINESS.phones[0].replace(/\s/g, "")}`}
              className="font-semibold text-rust underline underline-offset-2"
            >
              {BUSINESS.phones[0]}
            </a>{" "}
            — if it is on our shelves, we will set it aside for you.
          </p>
        </Reveal>
      </section>
    </>
  );
}
