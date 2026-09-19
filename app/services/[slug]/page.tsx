import Link from "next/link";
import { notFound } from "next/navigation";
import { services } from "@/lib/services";
import { pageMetadata, personId, siteUrl } from "@/lib/seo";
import { StructuredData } from "@/components/structured-data";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return services.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = services.find((entry) => entry.slug === slug);
  if (!service) notFound();
  return pageMetadata(service.title, service.description, `/services/${slug}`);
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((entry) => entry.slug === slug);
  if (!service) notFound();
  const url = `${siteUrl}/services/${slug}`;
  return <div className="mx-auto w-full min-w-0 max-w-4xl px-6 pb-24 pt-28 sm:px-8 sm:pt-36">
    <StructuredData data={{ "@context": "https://schema.org", "@graph": [
      { "@type": "Service", "@id": `${url}#service`, name: service.name, description: service.intro, url, serviceType: service.name, provider: { "@type": "Person", "@id": personId, name: "Mohamed Muaath Rifath", url: siteUrl } },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteUrl }, { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/services` }, { "@type": "ListItem", position: 3, name: service.name, item: url }] },
    ] }} />
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-x-3 text-sm text-muted-foreground"><Link href="/" className="inline-flex min-h-11 items-center hover:underline">Home</Link><span aria-hidden="true">/</span><Link href="/services" className="inline-flex min-h-11 items-center hover:underline">Services</Link><span aria-hidden="true">/</span><span aria-current="page">{service.name}</span></nav>
    <header className="mt-8 border-b border-border pb-10"><h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{service.title}</h1><p className="mt-6 text-xl leading-8 text-muted-foreground">{service.intro}</p><Link href="/contact" className="mt-6 inline-flex min-h-11 items-center rounded-sm font-semibold underline underline-offset-4">Discuss your project →</Link></header>
    <section className="mt-10"><h2 className="text-2xl font-semibold">Is this right for your project?</h2><p className="mt-4 leading-8 text-muted-foreground">{service.fit}</p></section>
    <section className="mt-10"><h2 className="text-2xl font-semibold">What we can build</h2><ul className="mt-4 list-disc space-y-3 pl-6 leading-7 text-muted-foreground">{service.deliverables.map((item) => <li key={item}>{item}</li>)}</ul></section>
    <section className="mt-10"><h2 className="text-2xl font-semibold">How we’ll work together</h2><p className="mt-4 leading-8 text-muted-foreground">{service.approach}</p></section>
    <p className="mt-10"><Link href="/experience" className="inline-flex min-h-11 items-center underline underline-offset-4">See my work →</Link></p>
    <section className="mt-10"><h2 className="text-2xl font-semibold">{service.question}</h2><p className="mt-4 leading-8 text-muted-foreground">{service.answer}</p></section>
    <section className="mt-12 border-t border-border pt-8"><h2 className="text-2xl font-semibold">Tell me what you need.</h2><p className="mt-4 leading-8 text-muted-foreground">Send a short description of the project, your budget, and any deadline.</p><Link href="/contact" className="mt-4 inline-flex min-h-11 items-center font-semibold underline underline-offset-4">Discuss your project →</Link></section>
    <nav aria-label="Other development services" className="mt-12 border-t border-border pt-8"><h2 className="text-xl font-semibold">Other services</h2><ul className="mt-4">{services.filter((entry) => entry.slug !== slug).map((entry) => <li key={entry.slug}><Link href={`/services/${entry.slug}`} className="inline-flex min-h-11 items-center underline underline-offset-4">{entry.name} →</Link></li>)}</ul></nav>
  </div>;
}
