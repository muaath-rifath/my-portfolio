import { pageMetadata, personId, siteUrl } from "@/lib/seo";
import { StructuredData } from "@/components/structured-data";
import Link from "next/link";
import { erlanglabsPost as post, readingMinutes, sectionId } from "@/lib/blogs/erlanglabs";

const url = `${siteUrl}/blogs/${post.slug}`;

export const metadata = {
  ...pageMetadata(post.title, post.description, url, "article"),
  authors: [{ name: post.author, url: siteUrl }],
};

const blocks = post.content.split("\n\n");
const headings = blocks.filter((block) => block.startsWith("## ")).map((block) => block.slice(3));

function inlineContent(text: string) {
  return text.split(/(\[[^\]]+\]\(https:\/\/[^)]+\))/g).map((part, index) => {
    const link = part.match(/^\[([^\]]+)\]\((https:\/\/[^)]+)\)$/);
    return link ? <a key={index} href={link[2]} className="rounded-sm underline underline-offset-4 hover:decoration-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">{link[1]}</a> : part;
  });
}

export default function ErlanglabsArticlePage() {
  return <article className="mx-auto w-full min-w-0 max-w-3xl px-6 pb-24 pt-28 sm:px-8 sm:pt-36">
    <StructuredData data={{ "@context": "https://schema.org", "@type": "BlogPosting", headline: post.title, description: post.description, mainEntityOfPage: url, image: url + "/opengraph-image", author: { "@type": "Person", "@id": personId, name: post.author, url: siteUrl } }} />
    <Link href="/blogs" className="inline-flex min-h-11 items-center rounded-sm text-sm text-muted-foreground underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">← All articles</Link>
    <header className="mb-10 mt-8 border-b border-border pb-10"><p className="text-sm text-muted-foreground">ErlangLabs · Engineering</p><h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">{post.title}</h1><p className="mt-6 text-xl leading-8 text-muted-foreground">{post.description}</p><p className="mt-6 text-sm leading-6 text-muted-foreground">{post.author} · {readingMinutes} min read</p></header>
    <nav aria-label="Article contents" className="mb-12 border-b border-border pb-8"><h2 className="mb-3 text-sm font-semibold">In this article</h2><ol className="list-inside list-decimal text-sm text-muted-foreground dark:text-foreground/90">{headings.map((heading) => <li key={heading}><a href={"#" + sectionId(heading)} className="inline-block rounded-sm py-3 underline decoration-border underline-offset-4 hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">{heading}</a></li>)}</ol></nav>
    <div className="text-lg leading-8 text-foreground [overflow-wrap:anywhere]">{blocks.map((block, index) => { if (block.startsWith("## ")) { const heading = block.slice(3); return <h2 key={index} id={sectionId(heading)} className="mb-6 mt-14 scroll-mt-24 text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">{heading}</h2>; } if (block.startsWith("- ")) return <ul key={index} className="mb-6 list-disc space-y-3 pl-6">{block.split("\n").map((line) => <li key={line}>{inlineContent(line.slice(2))}</li>)}</ul>; return <p key={index} className="mb-6">{inlineContent(block)}</p>; })}</div>
    <aside className="mt-12 border-t border-border pt-8"><h2 className="text-2xl font-semibold">Building a product of your own?</h2><p className="mt-4 leading-8 text-muted-foreground">I offer MVP development and custom software engineering, from your first working prototype to backend integrations.</p><Link href="/services" className="inline-flex min-h-11 items-center underline underline-offset-4">Explore freelance development services →</Link></aside>
    <footer className="mt-12 border-t border-border pt-8"><Link href="/blogs" className="inline-flex min-h-11 items-center rounded-sm underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">← Back to all articles</Link></footer>
  </article>;
}
