import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { ReservationForm } from "@/components/ReservationForm";
import { ROOMS, formatGhs } from "@contracts/catalog";

export default function Hotel() {
  const [selectedRoom, setSelectedRoom] = useState(ROOMS[0].id);

  return (
    <>
      <section className="relative flex min-h-[60vh] items-end overflow-hidden bg-charcoal">
        <img
          src="/images/hotel-hero.webp"
          alt="Julikart hotel exterior at dusk with warm glowing windows and palm trees"
          className="absolute inset-0 h-full w-full object-cover opacity-70"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
        <div className="relative mx-auto w-full max-w-6xl px-5 pb-16 pt-32">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">The Hotel</p>
            <h1 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-tight text-cream sm:text-6xl">
              Rest well on the <span className="italic text-terracotta">Mallam–Gbawe Road.</span>
            </h1>
            <p className="mt-5 max-w-xl leading-relaxed text-cream/85">
              Clean, air-conditioned rooms a step away from the restaurant and mart — ideal for
              family visits, business trips and weekend stays in Accra.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Rooms */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:py-20" aria-labelledby="rooms-heading">
        <Reveal>
          <h2 id="rooms-heading" className="font-display text-3xl font-semibold sm:text-4xl">
            Rooms &amp; suites
          </h2>
        </Reveal>
        <div className="mt-10 space-y-8">
          {ROOMS.map((room, i) => (
            <Reveal key={room.id} delay={80} as="article">
              <div
                className={`grid overflow-hidden rounded-3xl border border-ink/10 bg-card md:grid-cols-2 ${
                  i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="aspect-[4/3] md:aspect-auto">
                  <img
                    src={room.image}
                    alt={room.alt}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col p-7 sm:p-10">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h3 className="font-display text-3xl font-semibold">{room.name}</h3>
                    <p className="font-display text-2xl font-semibold text-rust">
                      {formatGhs(room.pricePerNightPesewas)}
                      <span className="ml-1 text-sm font-normal text-muted-foreground">/ night</span>
                    </p>
                  </div>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{room.description}</p>
                  <ul className="mt-5 flex flex-wrap gap-2" aria-label="Amenities">
                    {room.amenities.map((a) => (
                      <li
                        key={a}
                        className="rounded-full bg-secondary px-3.5 py-1.5 text-xs font-semibold text-secondary-foreground"
                      >
                        {a}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-7">
                    <a
                      href="#book"
                      onClick={() => setSelectedRoom(room.id)}
                      className="inline-block rounded-full bg-rust px-8 py-3 text-xs font-semibold uppercase tracking-wider text-cream transition-colors hover:bg-terracotta"
                    >
                      Book this room
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Booking */}
      <section id="book" className="bg-charcoal px-5 py-20 text-cream sm:py-24" aria-labelledby="book-heading">
        <div className="mx-auto grid max-w-6xl items-start gap-10 md:grid-cols-2">
          <Reveal>
            <h2 id="book-heading" className="font-display text-3xl font-semibold sm:text-4xl">
              Make a <span className="italic text-terracotta">reservation</span>
            </h2>
            <p className="mt-4 leading-relaxed text-cream/80">
              Choose your dates and room — we call you back to confirm and arrange payment at the
              hotel. Check-in from 2:00 PM, check-out by 12:00 PM.
            </p>
            <p className="mt-6 text-sm text-cream/70">
              Restaurant downstairs serves breakfast, lunch and dinner until midnight.
            </p>
          </Reveal>
          <Reveal delay={160}>
            <div className="text-ink">
              <ReservationForm type="room" defaultRoomId={selectedRoom} key={selectedRoom} />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
