import { Link } from "react-router";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center px-5 py-28 text-center sm:py-36">
      <p className="font-display text-8xl font-semibold text-terracotta sm:text-9xl">404</p>
      <h1 className="mt-6 font-display text-3xl font-semibold sm:text-4xl">
        This page took the wrong trotro.
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
        The page you are looking for does not exist or has moved. Let us get you back to the
        Mallam–Gbawe Road.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <Link
          to="/"
          className="rounded-full bg-rust px-8 py-3 text-xs font-semibold uppercase tracking-wider text-cream transition-colors hover:bg-terracotta"
        >
          Back home
        </Link>
        <Link
          to="/restaurant"
          className="rounded-full border border-ink/25 px-8 py-3 text-xs font-semibold uppercase tracking-wider text-ink transition-colors hover:border-ink"
        >
          See the menu
        </Link>
      </div>
    </section>
  );
}
