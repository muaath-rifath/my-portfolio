import Image from "next/image";
import Link from "next/link";
import { services } from "@/lib/services";
import { ArrowUpRight } from "lucide-react";

export function HomeStory() {
  return <div className="home-story">
    <section id="about" className="home-chapter home-introduction" aria-labelledby="intro-title">
      <div className="home-portrait">
        <div className="home-portrait-decoration" aria-hidden="true">
          <i className="home-portrait-diamond" />
          <i className="home-portrait-rectangle" />
          <i className="home-portrait-circle" />
        </div>
        <div className="home-portrait-photo">
          <div className="home-portrait-nodes" aria-hidden="true">
          <i className="home-portrait-node home-portrait-node-right"><span /></i>
          <i className="home-portrait-node home-portrait-node-bottom"><span /></i>
          </div>
          <Image src="/assets/profile.png" alt="Muaath Rifath" fill sizes="(max-width: 767px) 200px, 280px" />
        </div>
      </div>
      <div className="home-intro-copy">
        <p className="home-kicker">About me</p>
        <h2 id="intro-title">From first prototype<br /><em>to production.</em></h2>
        <p className="home-lead">I’m Muaath, a full-stack developer based in Chennai. I work on websites, applications, and the backend services behind them.</p>
        <p>My work includes APIs, databases, background jobs, and deployment.</p>
        <p>I also build AI features, including voice agents and document search.</p>
        <Link href="/experience" className="home-text-link">See what I’ve built <ArrowUpRight size={18} /></Link>
      </div>
    </section>

    <section className="home-chapter home-services" aria-labelledby="services-title">
      <div><p className="home-kicker">How I can help</p><h2 id="services-title">Wherever you are,<br /><em>let’s move forward.</em></h2></div>
      <div className="home-service-options">
        {services.map((service) => <article key={service.slug}><h3><Link href={`/services/${service.slug}`} className="underline-offset-4 hover:underline">{service.name}</Link></h3><p>{service.intro}</p><Link href={`/services/${service.slug}`} className="home-text-link">Explore service <ArrowUpRight size={16} aria-hidden="true" /></Link></article>)}
      </div>
      <Link href="/services" className="home-text-link">View all freelance services <ArrowUpRight size={18} aria-hidden="true" /></Link>
    </section>

    <section className="home-chapter home-principles" aria-labelledby="approach-title">
      <div><p className="home-kicker">Working together</p><h2 id="approach-title">A clear plan.<br /><em>Progress you can see.</em></h2><p className="home-approach-note">You’ll know what we’re building, why it matters, and what comes next. We’ll make decisions together, with working demos along the way.</p></div>
      <ol className="home-principle-list">
        <li><span aria-hidden="true">01</span><div><h3>Talk through the goal.</h3><p>We’ll discuss your users, the problem you’re solving, and where things stand today.</p></div></li>
        <li><span aria-hidden="true">02</span><div><h3>Agree on the scope.</h3><p>We’ll define priorities, deliverables, budget, and milestones before development starts.</p></div></li>
        <li><span aria-hidden="true">03</span><div><h3>Build, demo, refine.</h3><p>You’ll see working progress regularly, share feedback, and help shape the product as it comes together.</p></div></li>
        <li><span aria-hidden="true">04</span><div><h3>Launch with a next step.</h3><p>I’ll help with deployment and handover, then we’ll agree on the support and improvements your product needs.</p></div></li>
      </ol>
    </section>

    <section className="home-chapter home-toolkit" aria-labelledby="toolkit-title">
      <div><p className="home-kicker">My toolkit</p><h2 id="toolkit-title">The right tools<br /><em>for the job.</em></h2><p>I use React and TypeScript for interfaces, Go and Python for services, and MQTT for connected devices.</p><p>My everyday workspace runs Arch Linux and Hyprland. I like understanding the tools I depend on, right down to my desktop.</p></div>
      <dl className="home-tool-rows"><div><dt>Web & mobile</dt><dd>TypeScript / React / Next.js / Kotlin</dd></div><div><dt>Backend & data</dt><dd>Go / Python / PostgreSQL / Redis</dd></div><div><dt>AI, live communication & devices</dt><dd>LiveKit / WebRTC / MQTT / C</dd></div><div><dt>Build & deploy</dt><dd>Docker / GitHub Actions / Linux</dd></div></dl>
    </section>
  </div>;
}
