import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Muaath Rifath",
  description: "Welcome to the personal portfolio of Mohamed Muaath Rifath, an ECE student specializing in IoT and Embedded Systems.",
  keywords: ["Mohamed Muaath Rifath", "IoT", "embedded systems", "Electronics and Communication Engineering", "ECE", "intelligent automation", "edge computing", "Docker", "Kubernetes", "Machine Learning", "Python", "C", "Node.js", "Next.js", "TypeScript", "networking"],
  openGraph: {
    title: "Muaath Rifath",
    description: "Welcome to the personal portfolio of Mohamed Muaath Rifath, an ECE student specializing in IoT and Embedded Systems.",
    images: ["/assets/home-page.png"],
  },
  alternates: {
    canonical: 'https://muaathrifath.tech',
  },
};

export default function Home() {
  return (
    <div className="relative w-full overflow-hidden">
      <main className="relative z-10">
        {/* Hero Section */}
        <HeroSection />
        
        {/* About Section */}
        <AboutSection />
      </main>
    </div>
  );
}
