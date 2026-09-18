import type { Metadata } from "next";
import Link from "next/link";
import { erlanglabsPost, readingMinutes } from "@/lib/blogs/erlanglabs";

export const metadata: Metadata = {
  title: "Blog | Muaath Rifath",
  description: "Engineering stories about the systems I build, from voice AI to distributed backends.",
  alternates: { canonical: "https://muaathrifath.me/blogs" },
  openGraph: { title: "Blog | Muaath Rifath", description: "Engineering stories about the systems I build.", url: "/blogs", type: "website" },
};

export default function BlogsPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 pb-24 pt-32 sm:px-8 sm:pt-40">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Blog</h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">Engineering stories from the systems I build. The decisions, the boundaries, and what connects them.</p>
      </header>
      <article className="mt-16 border-y border-border py-10">
        <p className="text-sm text-muted-foreground">ErlangLabs · Engineering · {readingMinutes} min read</p>
        <h2 className="mt-4 max-w-3xl text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
          <Link href={"/blogs/" + erlanglabsPost.slug} className="rounded-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">{erlanglabsPost.title}</Link>
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">{erlanglabsPost.description}</p>
        <Link href={"/blogs/" + erlanglabsPost.slug} className="mt-6 inline-flex min-h-11 items-center rounded-sm font-medium underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">Read the article <span aria-hidden="true" className="ml-2">→</span></Link>
      </article>
    </div>
  );
}
