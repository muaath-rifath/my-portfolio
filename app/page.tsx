import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { HeroSection } from "@/components/hero-section";
import { HomeStory } from "@/components/home-story";
import "./home.css";

export const metadata: Metadata = {
  title: "Mohamed Muaath Rifath | Full-Stack Developer",
  description: "Meet Mohamed Muaath Rifath, a software engineer in Chennai focused on backend services, APIs, and AI voice systems. Explore his experience and projects.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Mohamed Muaath Rifath | Full-Stack Developer",
    description: "Software engineer in Chennai focused on backend services, APIs, and AI voice systems. Explore my experience and projects.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohamed Muaath Rifath | Full-Stack Developer",
    description: "Software engineer in Chennai focused on backend services, APIs, and AI voice systems. Explore my experience and projects.",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: "Mohamed Muaath Rifath",
      url: "https://muaathrifath.me",
      jobTitle: "Full-Stack Developer",
      sameAs: [
        "https://github.com/muaath-rifath",
        "https://linkedin.com/in/muaath-rifath",
        "https://x.com/MuaathRifath",
      ],
      knowsAbout: ["Next.js", "TypeScript", "React", "AI", "WebRTC", "MQTT", "Embedded Systems"],
    },
    {
      "@type": "WebSite",
      name: "Muaath Rifath",
      url: "https://muaathrifath.me",
    },
  ],
};

export default function Home() {
  return (
    <div className="home-enhancements w-full min-w-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <HeroSection />
      <HomeStory />
      <section className="home-contact" aria-labelledby="home-contact-title">
        <div className="home-contact-cta">
          <div className="home-contact-copy">
            <p className="home-kicker">Your next product starts here</p>
            <h2 id="home-contact-title">Have something in mind?<br /><em>Let’s build it together.</em></h2>
            <p className="home-contact-description">Turn your idea into an MVP, take your product to launch, or scale for what’s next. Tell me where you want to go, and let’s work out how to get there.</p>
          </div>
          <Link href="/contact" className="lab-button">
            Discuss your project <ArrowUpRight size={20} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
