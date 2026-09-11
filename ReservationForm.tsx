import { useRef, useState } from "react";
import { trpc } from "@/providers/trpc";
import { ROOMS, formatGhs, BUSINESS } from "@contracts/catalog";

const GH_PHONE = /^(\+233|0)\d{9}$/;

type Props = { type: "room" | "table"; defaultRoomId?: string };

type Errors = Partial<Record<string, string>>;

export function ReservationForm({ type, defaultRoomId }: Props) {
  const openedAt = useRef(Date.now());
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [guests, setGuests] = useState(2);
  const [roomId, setRoomId] = useState(defaultRoomId ?? ROOMS[0].id);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("19:00");
  const [notes, setNotes] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [errors, setErrors] = useState<Errors>({});
  const [reference, setReference] = useState<string | null>(null);
  const [total, setTotal] = useState<number | null>(null);

  const create = trpc.reservation.create.useMutation({
    onSuccess: (data) => {
      setReference(data.reference);
      setTotal(data.totalPesewas);
    },
    onError: (err) => setErrors({ form: err.message }),
  });

  const today = new Date().toLocaleDateString("en-CA", { timeZone: "Africa/Accra" });

  const validate = (): boolean => {
    const next: Errors = {};
    if (name.trim().length < 2) next.name = "Please enter your name.";
    if (!GH_PHONE.test(phone.trim())) next.phone = "Enter a valid Ghanaian number, e.g. 0267495057.";
    if (email && !/^\S+@\S+\.\S+$/.test(email.trim())) next.email = "Enter a valid email address.";
    if (type === "room") {
      if (!checkIn) next.checkIn = "Choose a check-in date.";
      if (!checkOut) next.checkOut = "Choose a check-out date.";
      if (checkIn && checkIn < today) next.checkIn = "Check-in cannot be in the past.";
      if (checkIn && checkOut && checkOut <= checkIn) next.checkOut = "Check-out must be after check-in.";
    } else {
      if (!date) next.date = "Choose a date.";
      else if (date < today) next.date = "Please choose a future date.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const basePayload = {
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      guests,
      notes: notes.trim() || undefined,
      website,
      elapsedMs: Date.now() - openedAt.current,
    };
    if (type === "room") {
      create.mutate({ type: "room", roomId, checkIn, checkOut, ...basePayload });
    } else {
      create.mutate({ type: "table", date, time, ...basePayload });
    }
  };

  if (reference) {
    return (
      <div className="rounded-3xl border border-ink/10 bg-card p-8 text-center">
        <p className="font-display text-3xl font-semibold text-rust">Reservation received</p>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Reference <span className="font-bold text-ink">{reference}</span>. We will call{" "}
          <span className="font-semibold text-ink">{phone}</span> to confirm your{" "}
          {type === "room" ? "room" : "table"}.
          {total != null && (
            <>
              {" "}
              Estimated total: <span className="font-semibold text-ink">{formatGhs(total)}</span>{" "}
              (payable at the hotel).
            </>
          )}{" "}
          Questions? Call {BUSINESS.phones[0]}.
        </p>
      </div>
    );
  }

  const inputCls =
    "mt-1.5 w-full rounded-lg border border-input bg-white px-3 py-2.5 text-sm focus:border-rust";
  const labelCls = "text-xs font-semibold uppercase tracking-wider";
  const errCls = "mt-1 text-xs font-semibold text-destructive";

  return (
    <form
      onSubmit={submit}
      noValidate
      className="relative rounded-3xl border border-ink/10 bg-card p-6 sm:p-8"
    >
      {/* Honeypot — invisible to humans */}
      <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden">
        <label>
          Website
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {type === "room" && (
          <div className="sm:col-span-2">
            <label htmlFor="res-room" className={labelCls}>
              Room type
            </label>
            <select
              id="res-room"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className={inputCls}
            >
              {ROOMS.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name} — {formatGhs(r.pricePerNightPesewas)}/night, sleeps {r.capacity}
                </option>
              ))}
            </select>
          </div>
        )}

        {type === "room" ? (
          <>
            <div>
              <label htmlFor="res-in" className={labelCls}>
                Check-in
              </label>
              <input
                id="res-in"
                type="date"
                min={today}
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                aria-invalid={!!errors.checkIn}
                className={inputCls}
              />
              {errors.checkIn && (
                <p role="alert" className={errCls}>
                  {errors.checkIn}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="res-out" className={labelCls}>
                Check-out
              </label>
              <input
                id="res-out"
                type="date"
                min={checkIn || today}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                aria-invalid={!!errors.checkOut}
                className={inputCls}
              />
              {errors.checkOut && (
                <p role="alert" className={errCls}>
                  {errors.checkOut}
                </p>
              )}
            </div>
          </>
        ) : (
          <>
            <div>
              <label htmlFor="res-date" className={labelCls}>
                Date
              </label>
              <input
                id="res-date"
                type="date"
                min={today}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                aria-invalid={!!errors.date}
                className={inputCls}
              />
              {errors.date && (
                <p role="alert" className={errCls}>
                  {errors.date}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="res-time" className={labelCls}>
                Time
              </label>
              <input
                id="res-time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className={inputCls}
              />
            </div>
          </>
        )}

        <div>
          <label htmlFor="res-guests" className={labelCls}>
            Guests
          </label>
          <input
            id="res-guests"
            type="number"
            min={1}
            max={type === "room" ? 4 : 12}
            value={guests}
            onChange={(e) => setGuests(Math.max(1, Math.min(20, Number(e.target.value) || 1)))}
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="res-name" className={labelCls}>
            Your name
          </label>
          <input
            id="res-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={!!errors.name}
            autoComplete="name"
            className={inputCls}
          />
          {errors.name && (
            <p role="alert" className={errCls}>
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="res-phone" className={labelCls}>
            Phone number
          </label>
          <input
            id="res-phone"
            type="tel"
            inputMode="tel"
            placeholder="0267495057"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            aria-invalid={!!errors.phone}
            autoComplete="tel"
            className={inputCls}
          />
          {errors.phone && (
            <p role="alert" className={errCls}>
              {errors.phone}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="res-email" className={labelCls}>
            Email <span className="font-normal normal-case text-muted-foreground">(optional)</span>
          </label>
          <input
            id="res-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={!!errors.email}
            autoComplete="email"
            className={inputCls}
          />
          {errors.email && (
            <p role="alert" className={errCls}>
              {errors.email}
            </p>
          )}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="res-notes" className={labelCls}>
            Notes <span className="font-normal normal-case text-muted-foreground">(optional)</span>
          </label>
          <textarea
            id="res-notes"
            rows={2}
            maxLength={500}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className={inputCls}
          />
        </div>
      </div>

      {errors.form && (
        <p role="alert" className="mt-4 rounded-lg bg-destructive/10 px-3 py-2 text-xs font-semibold text-destructive">
          {errors.form}
        </p>
      )}

      <button
        type="submit"
        disabled={create.isPending}
        className="mt-6 w-full rounded-full bg-rust py-3.5 text-xs font-semibold uppercase tracking-wider text-cream transition-colors hover:bg-terracotta disabled:opacity-60"
      >
        {create.isPending
          ? "Sending…"
          : type === "room"
            ? "Reserve a room"
            : "Reserve a table"}
      </button>
      <p className="mt-3 text-center text-[11px] text-muted-foreground">
        No prepayment — we confirm every reservation by phone.
      </p>
    </form>
  );
}
