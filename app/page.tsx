import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <HeroSection />
      <AboutSection />
    </main>
  );
}
