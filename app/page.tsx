import { Metadata } from "next";
import { HeroSection } from "@/components/hero-section";

export const metadata: Metadata = {
  title: "Muaath Rifath",
  description: "Welcome to the personal portfolio of Mohamed Muaath Rifath, an ECE student specializing in IoT and Embedded Systems.",
  keywords: ["Mohamed Muaath Rifath", "IoT", "embedded systems", "Electronics and Communication Engineering", "ECE", "intelligent automation", "edge computing", "Docker", "Kubernetes", "Machine Learning", "Python", "C", "Node.js", "Next.js", "TypeScript", "networking"],
  openGraph: {
    title: "Muaath Rifath",
    description: "Welcome to the personal portfolio of Mohamed Muaath Rifath, an ECE student specializing in IoT and Embedded Systems.",
    images: ["/assets/home.png"],
    url: "https://muaathrifath.tech",
    type: "website"
  }
};

export default function Home() {
  return <HeroSection />;
}
