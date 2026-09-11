import { useRef, useState } from "react";
import { useCart } from "@/cart/CartContext";
import { findCatalogItem, formatGhs, BUSINESS } from "@contracts/catalog";
import { trpc } from "@/providers/trpc";

type Errors = Partial<Record<"name" | "phone" | "address" | "form", string>>;

const GH_PHONE = /^(\+233|0)\d{9}$/;

export function CartDrawer() {
  const { lines, isOpen, closeCart, setQuantity, remove, clear, totalPesewas } = useCart();
  const [step, setStep] = useState<"cart" | "checkout" | "done">("cart");
  const [errors, setErrors] = useState<Errors>({});
  const [orderNumber, setOrderNumber] = useState("");
  const openedAt = useRef(Date.now());

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [fulfillment, setFulfillment] = useState<"pickup" | "delivery">("pickup");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [website, setWebsite] = useState(""); // honeypot

  const createOrder = trpc.order.create.useMutation({
    onSuccess: (data) => {
      setOrderNumber(data.orderNumber);
      setStep("done");
      clear();
    },
    onError: (err) => setErrors({ form: err.message }),
  });

  if (!isOpen) return null;

  const validate = (): boolean => {
    const next: Errors = {};
    if (name.trim().length < 2) next.name = "Please enter your name.";
    if (!GH_PHONE.test(phone.trim())) next.phone = "Enter a valid Ghanaian number, e.g. 0267495057.";
    if (fulfillment === "delivery" && address.trim().length < 5)
      next.address = "Please enter your delivery address.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    createOrder.mutate({
      items: lines.map((l) => ({ catalogId: l.catalogId, quantity: l.quantity })),
      customerName: name.trim(),
      phone: phone.trim(),
      fulfillment,
      address: fulfillment === "delivery" ? address.trim() : undefined,
      notes: notes.trim() || undefined,
      website,
      elapsedMs: Date.now() - openedAt.current,
    });
  };

  const close = () => {
    closeCart();
    if (step === "done") {
      setStep("cart");
      setName("");
      setPhone("");
      setAddress("");
      setNotes("");
    }
  };

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Your order basket">
      <button
        type="button"
        aria-label="Close basket"
        className="absolute inset-0 h-full w-full cursor-default bg-ink/60"
        onClick={close}
      />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream shadow-2xl">
        <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
          <h2 className="font-display text-2xl font-semibold">
            {step === "cart" ? "Your basket" : step === "checkout" ? "Checkout" : "Order placed"}
          </h2>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="rounded-full border border-ink/25 px-3 py-1 text-sm font-semibold hover:border-ink"
          >
            ✕
          </button>
        </div>

        {step === "done" ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <p className="font-display text-4xl font-semibold text-rust">Thank you!</p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Your order <span className="font-bold text-ink">{orderNumber}</span> has been received.
              We will call <span className="font-semibold text-ink">{phone}</span> shortly to confirm.
              You can also reach us on {BUSINESS.phones[0]}.
            </p>
            <button
              type="button"
              onClick={close}
              className="mt-8 rounded-full bg-rust px-8 py-3 text-xs font-semibold uppercase tracking-wider text-cream transition-colors hover:bg-terracotta"
            >
              Continue
            </button>
          </div>
        ) : step === "cart" ? (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {lines.length === 0 ? (
                <p className="py-16 text-center text-sm text-muted-foreground">
                  Your basket is empty. Add something delicious from the restaurant or the mart.
                </p>
              ) : (
                <ul className="divide-y divide-ink/10">
                  {lines.map((l) => {
                    const item = findCatalogItem(l.catalogId);
                    if (!item) return null;
                    return (
                      <li key={l.catalogId} className="flex items-center gap-4 py-4">
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{formatGhs(item.pricePesewas)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            aria-label={`Decrease quantity of ${item.name}`}
                            className="h-7 w-7 rounded-full border border-ink/25 text-sm font-bold hover:border-ink"
                            onClick={() => setQuantity(l.catalogId, l.quantity - 1)}
                          >
                            −
                          </button>
                          <span className="w-6 text-center text-sm font-semibold">{l.quantity}</span>
                          <button
                            type="button"
                            aria-label={`Increase quantity of ${item.name}`}
                            className="h-7 w-7 rounded-full border border-ink/25 text-sm font-bold hover:border-ink"
                            onClick={() => setQuantity(l.catalogId, l.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                        <p className="w-20 text-right text-sm font-semibold">
                          {formatGhs(item.pricePesewas * l.quantity)}
                        </p>
                        <button
                          type="button"
                          aria-label={`Remove ${item.name} from basket`}
                          className="text-xs text-muted-foreground underline underline-offset-2 hover:text-rust"
                          onClick={() => remove(l.catalogId)}
                        >
                          Remove
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
            <div className="border-t border-ink/10 px-5 py-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Total
                </span>
                <span className="font-display text-2xl font-semibold">{formatGhs(totalPesewas)}</span>
              </div>
              <button
                type="button"
                disabled={lines.length === 0}
                onClick={() => {
                  openedAt.current = Date.now();
                  setStep("checkout");
                }}
                className="mt-4 w-full rounded-full bg-rust py-3.5 text-xs font-semibold uppercase tracking-wider text-cream transition-colors hover:bg-terracotta disabled:cursor-not-allowed disabled:opacity-40"
              >
                Place order
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={submit} className="flex flex-1 flex-col overflow-y-auto px-5 py-4" noValidate>
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

            <div className="space-y-4">
              <div>
                <label htmlFor="co-name" className="text-xs font-semibold uppercase tracking-wider">
                  Your name
                </label>
                <input
                  id="co-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "co-name-err" : undefined}
                  className="mt-1.5 w-full rounded-lg border border-input bg-white px-3 py-2.5 text-sm focus:border-rust"
                  autoComplete="name"
                />
                {errors.name && (
                  <p id="co-name-err" role="alert" className="mt-1 text-xs font-semibold text-destructive">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="co-phone" className="text-xs font-semibold uppercase tracking-wider">
                  Phone number
                </label>
                <input
                  id="co-phone"
                  type="tel"
                  inputMode="tel"
                  placeholder="0267495057"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "co-phone-err" : undefined}
                  className="mt-1.5 w-full rounded-lg border border-input bg-white px-3 py-2.5 text-sm focus:border-rust"
                  autoComplete="tel"
                />
                {errors.phone && (
                  <p id="co-phone-err" role="alert" className="mt-1 text-xs font-semibold text-destructive">
                    {errors.phone}
                  </p>
                )}
              </div>

              <fieldset>
                <legend className="text-xs font-semibold uppercase tracking-wider">
                  Pickup or delivery?
                </legend>
                <div className="mt-1.5 grid grid-cols-2 gap-2">
                  {(["pickup", "delivery"] as const).map((f) => (
                    <label
                      key={f}
                      className={`cursor-pointer rounded-lg border px-3 py-2.5 text-center text-sm font-semibold capitalize transition-colors ${
                        fulfillment === f
                          ? "border-rust bg-rust text-cream"
                          : "border-input bg-white hover:border-rust"
                      }`}
                    >
                      <input
                        type="radio"
                        name="fulfillment"
                        value={f}
                        checked={fulfillment === f}
                        onChange={() => setFulfillment(f)}
                        className="sr-only"
                      />
                      {f}
                    </label>
                  ))}
                </div>
              </fieldset>

              {fulfillment === "delivery" && (
                <div>
                  <label htmlFor="co-address" className="text-xs font-semibold uppercase tracking-wider">
                    Delivery address
                  </label>
                  <input
                    id="co-address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    aria-invalid={!!errors.address}
                    aria-describedby={errors.address ? "co-address-err" : undefined}
                    className="mt-1.5 w-full rounded-lg border border-input bg-white px-3 py-2.5 text-sm focus:border-rust"
                    autoComplete="street-address"
                  />
                  {errors.address && (
                    <p id="co-address-err" role="alert" className="mt-1 text-xs font-semibold text-destructive">
                      {errors.address}
                    </p>
                  )}
                </div>
              )}

              <div>
                <label htmlFor="co-notes" className="text-xs font-semibold uppercase tracking-wider">
                  Notes <span className="font-normal text-muted-foreground">(optional)</span>
                </label>
                <textarea
                  id="co-notes"
                  rows={2}
                  maxLength={500}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-input bg-white px-3 py-2.5 text-sm focus:border-rust"
                />
              </div>
            </div>

            {errors.form && (
              <p role="alert" className="mt-4 rounded-lg bg-destructive/10 px-3 py-2 text-xs font-semibold text-destructive">
                {errors.form}
              </p>
            )}

            <div className="mt-auto border-t border-ink/10 pt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Total
                </span>
                <span className="font-display text-2xl font-semibold">{formatGhs(totalPesewas)}</span>
              </div>
              <button
                type="submit"
                disabled={createOrder.isPending}
                className="mt-4 w-full rounded-full bg-rust py-3.5 text-xs font-semibold uppercase tracking-wider text-cream transition-colors hover:bg-terracotta disabled:opacity-60"
              >
                {createOrder.isPending ? "Placing your order…" : "Confirm order"}
              </button>
              <p className="mt-3 text-center text-[11px] leading-relaxed text-muted-foreground">
                Payment on pickup or delivery. By ordering you agree to our{" "}
                <a href="/terms" className="underline underline-offset-2">
                  terms
                </a>
                .
              </p>
            </div>
          </form>
        )}
      </aside>
    </div>
  );
}
