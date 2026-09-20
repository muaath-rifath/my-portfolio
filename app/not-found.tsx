import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found | Muaath Rifath",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-5xl items-center px-6 pb-24 pt-32 sm:px-8 sm:pt-40">
      <div className="w-full max-w-3xl border-y border-border py-10 sm:py-14">
        <p className="font-mono text-sm uppercase tracking-wider text-primary">404 · Page not found</p>
        <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">This route isn&apos;t on the map.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
          The page may have moved, or the address may be incorrect. Head back home or explore the work and services here.
        </p>
        <nav aria-label="Helpful links" className="mt-8 flex flex-wrap gap-x-8 gap-y-2">
          <Link href="/" className="inline-flex min-h-11 items-center font-semibold underline underline-offset-4 hover:text-primary">
            Return home →
          </Link>
          <Link href="/services" className="inline-flex min-h-11 items-center underline underline-offset-4 hover:text-primary">
            Explore services →
          </Link>
          <Link href="/experience" className="inline-flex min-h-11 items-center underline underline-offset-4 hover:text-primary">
            See experience →
          </Link>
        </nav>
      </div>
    </section>
  );
}
