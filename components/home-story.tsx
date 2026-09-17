import Image from "next/image";
import Link from "next/link";
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
        <p className="home-lead">I’m Muaath, a full-stack developer focused on backend and AI engineering. I turn ideas into working prototypes quickly, validate them with real users, and take them through to production.</p>
        <p>I build scalable backends, asynchronous workflows, and secure infrastructure, from databases and queues to access control, deployments, and monitoring.</p>
        <p>My AI work connects models to knowledge, tools, and APIs to complete real tasks. I start with the engineering problem and choose the architecture that fits.</p>
        <Link href="/experience" className="home-text-link">See what I’ve built <ArrowUpRight size={18} /></Link>
      </div>
    </section>

    <section className="home-chapter home-services" aria-labelledby="services-title">
      <div><p className="home-kicker">How I can help</p><h2 id="services-title">Wherever you are,<br /><em>let’s move forward.</em></h2></div>
      <div className="home-service-options">
        <article><p className="home-service-stage">You have an idea</p><h3>Start with an MVP.</h3><p>Build the core experience your first users need, test your assumptions, and learn what’s worth building next.</p></article>
        <article><p className="home-service-stage">You’re ready to launch</p><h3>Turn it into a product.</h3><p>Bring the interface, backend, and integrations together into a product you can put in your customers’ hands.</p></article>
        <article><p className="home-service-stage">Your product is growing</p><h3>Make room to scale.</h3><p>Resolve performance bottlenecks, strengthen reliability, and add the capabilities your next stage needs.</p></article>
      </div>
      <Link href="/contact" className="home-text-link">Find the right next step <ArrowUpRight size={18} aria-hidden="true" /></Link>
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
      <div><p className="home-kicker">My toolkit</p><h2 id="toolkit-title">The right tools<br /><em>for the job.</em></h2><p>React and TypeScript for interfaces, Go and Python for services, and MQTT for connected devices. These are tools I’ve used in real projects, chosen around what each product needs.</p><p>My everyday workspace runs Arch Linux and Hyprland. I like understanding the tools I depend on, right down to my desktop.</p></div>
      <dl className="home-tool-rows"><div><dt>Web & mobile</dt><dd>TypeScript / React / Next.js / Kotlin</dd></div><div><dt>Backend & data</dt><dd>Go / Python / PostgreSQL / Redis</dd></div><div><dt>AI, live communication & devices</dt><dd>LiveKit / WebRTC / MQTT / C</dd></div><div><dt>Build & deploy</dt><dd>Docker / GitHub Actions / Linux</dd></div></dl>
    </section>
  </div>;
}
