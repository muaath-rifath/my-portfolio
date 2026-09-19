import Link from "next/link";
import { pageMetadata, personId, siteUrl } from "@/lib/seo";
import { services } from "@/lib/services";
import { StructuredData } from "@/components/structured-data";

export const metadata = pageMetadata("Freelance Development Services", "MVPs, business websites, ecommerce stores, and custom software by Muaath Rifath. Explore freelance development services and discuss your project.", "/services");

export default function ServicesPage() {
  return <div className="mx-auto w-full min-w-0 max-w-5xl px-6 pb-24 pt-32 sm:px-8 sm:pt-40">
    <StructuredData data={{ "@context": "https://schema.org", "@type": "ItemList", name: "Freelance development services", itemListElement: services.map((service, index) => ({ "@type": "ListItem", position: index + 1, item: { "@type": "Service", name: service.name, url: `${siteUrl}/services/${service.slug}`, provider: { "@type": "Person", "@id": personId, name: "Mohamed Muaath Rifath", url: siteUrl } } })) }} />
    <header className="max-w-3xl">
      <p className="font-mono text-sm uppercase tracking-wider text-muted-foreground">Work directly with your developer</p>
      <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">Websites, MVPs, and custom software.</h1>
      <p className="mt-6 text-lg leading-8 text-muted-foreground">I’m Muaath, a freelance developer based in Chennai. I work with founders and businesses on new projects and existing software, remotely or locally.</p>
      <Link href="/contact" className="mt-6 inline-flex min-h-11 items-center rounded-sm font-semibold underline underline-offset-4">Discuss your project →</Link>
    </header>
    <div className="mt-12 divide-y divide-border border-y border-border">
      {services.map((service, index) => <section key={service.slug} className="grid gap-4 py-10 md:grid-cols-[1fr_1.4fr] md:gap-12">
        <div><p className="font-mono text-sm text-muted-foreground">0{index + 1}</p><h2 className="mt-3 text-2xl font-semibold"><Link href={`/services/${service.slug}`} className="underline-offset-4 hover:underline">{service.name}</Link></h2></div>
        <div><p className="leading-8 text-muted-foreground">{service.intro}</p><Link href={`/services/${service.slug}`} className="mt-4 inline-flex min-h-11 items-center underline underline-offset-4">{service.name} →</Link></div>
      </section>)}
    </div>
    <section className="mt-16 max-w-3xl"><h2 className="text-2xl font-semibold">A clear scope before we start.</h2><p className="mt-5 leading-8 text-muted-foreground">Tell me the problem you want to solve, your audience, budget, and timeline. We’ll agree on priorities and milestones, review working demos, and plan deployment and handover. We can also discuss support after launch.</p><div className="mt-5 flex flex-wrap gap-x-8 gap-y-2"><Link href="/experience" className="inline-flex min-h-11 items-center underline underline-offset-4">See my work →</Link><Link href="/contact" className="inline-flex min-h-11 items-center underline underline-offset-4">Tell me about your project →</Link></div></section>
  </div>;
}
