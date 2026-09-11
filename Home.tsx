import { Link } from "react-router";
import { Reveal } from "@/components/Reveal";
import { BUSINESS } from "@contracts/catalog";

const services = [
  {
    to: "/restaurant",
    kicker: "Eat",
    title: "The Restaurant",
    text: "Smoky party jollof, banku with grilled tilapia, kelewele hot off the fire. Dine in, pick up, or order delivery.",
    image: "/images/menu-jollof.webp",
    alt: "Bowl of Ghanaian party jollof rice with grilled chicken and fried plantain",
  },
  {
    to: "/hotel",
    kicker: "Stay",
    title: "The Hotel",
    text: "Calm, air-conditioned rooms with breakfast options — your comfortable base on the Mallam–Gbawe Road.",
    image: "/images/room-deluxe.webp",
    alt: "Deluxe double hotel room with king bed in warm cream and terracotta tones",
  },
  {
    to: "/mart",
    kicker: "Shop",
    title: "The Mart",
    text: "Groceries, fresh bread, beverages and home essentials — stocked daily, ready for pickup or delivery.",
    image: "/images/mart-hero.webp",
    alt: "Bright supermarket aisle with neatly stocked shelves at Julikart Mart",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[88vh] items-end overflow-hidden bg-charcoal">
        <img
          src="/images/hero.webp"
          alt="Overhead spread of a Ghanaian feast at Julikart: smoky jollof rice, charcoal-grilled chicken, kelewele, assorted fried rice and grilled tilapia with banku"
          className="absolute inset-0 h-full w-full object-cover opacity-75"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
        <div className="relative mx-auto w-full max-w-6xl px-5 pb-20 pt-40">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">
              {BUSINESS.area}
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-4 max-w-3xl font-display text-5xl font-semibold leading-[1.05] text-cream sm:text-7xl">
              Eat. Stay. Shop. <span className="italic text-terracotta">One address.</span>
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/85 sm:text-lg">
              {BUSINESS.description}
            </p>
          </Reveal>
          <Reveal delay={360}>
            <div className="mt-9">
              <Link
                to="/restaurant"
                className="inline-block rounded-full bg-rust px-10 py-4 text-sm font-semibold uppercase tracking-wider text-cream transition-all hover:scale-[1.03] hover:bg-terracotta"
              >
                Order Now
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:py-28" aria-labelledby="services-heading">
        <Reveal>
          <h2 id="services-heading" className="font-display text-4xl font-semibold sm:text-5xl">
            Three ways to <span className="italic text-rust">Julikart</span>
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.to} delay={i * 140} as="article">
              <Link
                to={s.to}
                className="group block overflow-hidden rounded-3xl border border-ink/10 bg-card transition-shadow hover:shadow-xl"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-terracotta">{s.kicker}</p>
                  <h3 className="mt-2 font-display text-2xl font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-rust">
                    Explore →
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="bg-charcoal py-20 text-cream sm:py-28" aria-labelledby="story-heading">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-2">
          <Reveal as="figure" className="overflow-hidden rounded-3xl">
            <img
              src="/images/interior.webp"
              alt="Warm dining room at the Julikart restaurant with wooden tables, woven pendant lamps and terracotta walls"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </Reveal>
          <div>
            <Reveal>
              <h2 id="story-heading" className="font-display text-4xl font-semibold sm:text-5xl">
                A Gbawe <span className="italic text-terracotta">landmark</span>
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-6 leading-relaxed text-cream/80">
                Right by the Julikart bus stop at 300 Gbawe Road, we have grown from a neighbourhood
                fast-food counter into a full destination — a kitchen serving the Ghanaian dishes
                this community loves, rooms for travellers and family visits, and a mart stocked
                with daily essentials.
              </p>
            </Reveal>
            <Reveal delay={280}>
              <dl className="mt-8 grid grid-cols-2 gap-6">
                <div>
                  <dt className="text-xs font-bold uppercase tracking-[0.18em] text-gold">Kitchen open</dt>
                  <dd className="mt-1 font-display text-xl">Mon–Sat 6 AM – 12 AM</dd>
                  <dd className="font-display text-xl">Sun 4 PM – 12 AM</dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-[0.18em] text-gold">Find us</dt>
                  <dd className="mt-1 font-display text-xl">300 Gbawe Road</dd>
                  <dd className="font-display text-xl">McCarthy Hill, Accra</dd>
                </div>
              </dl>
            </Reveal>
            <Reveal delay={420}>
              <a
                href={BUSINESS.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-block rounded-full border border-cream/40 px-8 py-3 text-xs font-semibold uppercase tracking-wider text-cream transition-colors hover:border-gold hover:text-gold"
              >
                Get directions
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-6xl px-5 py-20 text-center sm:py-28" aria-labelledby="cta-heading">
        <Reveal>
          <h2 id="cta-heading" className="mx-auto max-w-2xl font-display text-4xl font-semibold sm:text-5xl">
            Hungry right now? <span className="italic text-rust">We are cooking.</span>
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <Link
            to="/restaurant"
            className="mt-9 inline-block rounded-full bg-rust px-10 py-4 text-sm font-semibold uppercase tracking-wider text-cream transition-all hover:scale-[1.03] hover:bg-terracotta"
          >
            Order Now
          </Link>
        </Reveal>
      </section>
    </>
  );
}
