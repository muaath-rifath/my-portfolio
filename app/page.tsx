import { pageMetadata, personId, siteUrl } from "@/lib/seo";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { HeroSection } from "@/components/hero-section";
import { HomeStory } from "@/components/home-story";
import "./home.css";

export const metadata = pageMetadata(
  "Freelance Web & MVP Developer in Chennai",
  "Hire Muaath Rifath for MVP development, business websites, ecommerce stores, and custom software. Based in Chennai and available for remote freelance projects.",
  "/",
);

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": personId,
      alternateName: "Muaath Rifath",
      image: `${siteUrl}/assets/profile.png`,
      address: { "@type": "PostalAddress", addressLocality: "Chennai", addressCountry: "IN" },
      name: "Mohamed Muaath Rifath",
      url: siteUrl,
      jobTitle: "Freelance Full-Stack Developer",
      sameAs: [
        "https://github.com/muaath-rifath",
        "https://linkedin.com/in/muaath-rifath",
        "https://x.com/MuaathRifath",
      ],
      knowsAbout: ["MVP development", "Website development", "Ecommerce development", "Custom software development", "Next.js", "TypeScript", "React", "AI", "WebRTC", "MQTT", "Embedded Systems"],
    },
    {
      "@type": "WebSite",
      name: "Muaath Rifath",
      url: siteUrl,
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
            <p className="home-contact-description">Need a website, an MVP, or help with an existing application? Tell me what you’re working on.</p>
          </div>
          <Link href="/contact" className="lab-button">
            Discuss your project <ArrowUpRight size={20} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
