import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { useCart } from "@/cart/CartContext";
import { BUSINESS } from "@contracts/catalog";

const links = [
  { to: "/restaurant", label: "Restaurant" },
  { to: "/hotel", label: "Hotel" },
  { to: "/mart", label: "Mart" },
];

export function Navbar() {
  const { count, openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-xs font-semibold uppercase tracking-[0.14em] transition-colors hover:text-rust ${
      isActive ? "text-rust" : "text-ink"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-cream/90 backdrop-blur supports-[backdrop-filter]:bg-cream/75">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link to="/" className="font-display text-2xl font-semibold tracking-tight text-ink" aria-label="Julikart home">
          Julikart<span className="text-terracotta">.</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={openCart}
            className="relative rounded-full border border-ink/25 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-ink transition-colors hover:border-ink"
            aria-label={`Open your order basket, ${count} item${count === 1 ? "" : "s"}`}
          >
            Basket
            {count > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-rust px-1 text-[11px] font-bold text-cream">
                {count}
              </span>
            )}
          </button>
          <Link
            to="/restaurant"
            className="hidden rounded-full bg-rust px-5 py-2 text-xs font-semibold uppercase tracking-wider text-cream transition-colors hover:bg-terracotta sm:inline-block"
          >
            Order Now
          </Link>
          <button
            type="button"
            className="md:hidden"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Menu
            </span>
            <span className="mt-0.5 block space-y-1">
              <span className="block h-0.5 w-6 bg-ink" />
              <span className="block h-0.5 w-6 bg-ink" />
            </span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-ink/10 bg-cream md:hidden" aria-label="Mobile navigation">
          <ul className="space-y-1 px-5 py-4">
            {[{ to: "/", label: "Home" }, ...links].map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  onClick={() => setMenuOpen(false)}
                  className={`block py-2 text-sm font-semibold uppercase tracking-wider ${
                    location.pathname === l.to ? "text-rust" : "text-ink"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={`tel:${BUSINESS.phones[0].replace(/\s/g, "")}`}
                className="block py-2 text-sm font-semibold uppercase tracking-wider text-rust"
              >
                Call {BUSINESS.phones[0]}
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
