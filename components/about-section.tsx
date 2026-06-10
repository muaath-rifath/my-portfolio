"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./about-section.module.css";
import { cn } from "@/lib/utils";

const AboutContent = () => (
  <div className="space-y-6 text-muted-foreground text-sm md:text-base leading-relaxed">
    <p>
      I am a <span className="font-semibold dark:text-white text-[#006b42]">Software Engineer</span> who thrives at the boundaries of systems. My work rarely stays in one layer - I build across backend APIs, real-time communications, AI pipelines, and embedded firmware. To me, the most interesting engineering challenges happen where these different domains intersect.
    </p>

    <p>
      My core philosophy is that <span className="font-semibold dark:text-white text-[#006b42]">AI is most interesting when it leaves the chat window</span>. Instead of just wrapping LLMs, I focus on the hard infrastructure underneath: semantic grounding, multimodal interfaces, and safely giving agents capability-scoped access to the physical world.
    </p>

    <p>
      I care deeply about the parts of a product that don&apos;t show up in screenshots. Whether I&apos;m architecting a resilient telemedicine platform, designing distributed databases, or writing OTA update systems for custom hardware, my focus is always on building <span className="font-semibold dark:text-white text-[#006b42]">reliable, secure, and highly functional infrastructure</span>.
    </p>

    <p>
      Locally, I run <span className="font-semibold dark:text-white text-[#006b42]">Arch Linux + Hyprland</span>. I appreciate software that does exactly what it needs to do and then gets out of the way, and I bring that same minimalist, no-nonsense philosophy to the systems I engineer.
    </p>
  </div>
);

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const tags = ["Go", "Python", "TypeScript", "Kotlin", "C", "SQL", "Shell", "FastAPI", "Next.js", "Docker", "TimescaleDB", "Redis", "MQTT", "WebRTC"];

  return (
    <section 
      className={cn(
        "container mx-auto px-4 py-16 md:py-0 transition-opacity duration-500 relative z-20",
        isVisible ? "opacity-100" : "opacity-0"
      )}
      id="about"
    >
      {/* Mobile view layout */}
      <div className="md:hidden">
        <div className="relative mb-12 mt-6">
          <h2 className="text-3xl font-bold font-mono tracking-tighter relative inline-flex flex-col mb-8">
            <span className="relative inline-block">
              <span className="inline-block dark:text-white text-[#006b42] pr-2 relative z-10">
                About Me
              </span>
              <span className="absolute left-0 bottom-0 h-[2px] w-full dark:bg-white bg-[#006b42]"></span>
            </span>
            <span className="text-sm font-light tracking-wider text-muted-foreground mt-2 font-sans">
              <span className="inline-block w-8 h-[1px] dark:bg-white/40 bg-[#006b42]/40 mr-2 align-middle"></span>
              Software Engineer
            </span>
          </h2>
          
          <div className="relative flex flex-col items-center">
            <div className={`relative w-[200px] h-[200px] mb-8 ${styles.zHighest}`}>
              <div className="absolute inset-0 rounded-xl shadow-xl overflow-hidden bg-white">
                <div className="absolute inset-0 bg-gradient-to-br dark:from-[#0a1f30] dark:via-[#0e3320] dark:to-[#1a1a2e] from-[#e6f0eb] via-[#d0e0d8] to-[#c0c0d0] z-0"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#00000020] z-1 pointer-events-none"></div>
                <div className="absolute inset-0 bg-[url('/assets/circuit-overlay.svg')] bg-no-repeat bg-cover opacity-30 mix-blend-overlay z-2 pointer-events-none"></div>
                <div className="absolute inset-0 z-10">
                  <Image src="/assets/profile.png" alt="Muaath Rifath" fill className="object-contain" priority />
                </div>
              </div>
            </div>
            
            <div className="w-full text-left">
              <AboutContent />
            </div>
          </div>
          
          <div className="absolute top-[40%] -left-2 w-6 h-6 border-2 dark:border-[#1a1a2e]/60 border-[#c0c0d0]/60 opacity-40 rotate-45 z-0"></div>
          <div className="absolute bottom-[20%] -right-3 w-10 h-5 border-2 dark:border-[#1a1a2e]/60 border-[#c0c0d0]/60 opacity-40 z-0"></div>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-6">
          {tags.map((tag, i) => (
            <span key={i} className="px-3 py-1 text-sm rounded-full dark:bg-[#1a1a2e]/60 bg-[#f0f0f8]/60 dark:text-gray-200 text-gray-700 border dark:border-[#2a2a4e]/50 border-[#d0d0e0]/70 hover:dark:bg-[#1a1a2e]/80 hover:bg-[#e6e6f0]/80 transition-colors duration-200">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="mt-8 pt-2">
          <Link href="/experience" className="w-full block">
            <Button variant="outline" className="relative w-full px-6 py-3 font-mono border-2 overflow-hidden group dark:border-white/80 dark:text-white border-[#006b42] text-[#006b42]">
              <span className="relative z-10">EXPLORE MY EXPERIENCE</span>
              <span className="absolute inset-0 dark:bg-white/10 bg-[#006b42]/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Desktop view */}
      <div className="hidden md:grid md:grid-cols-12 gap-12 items-center max-w-7xl mx-auto py-12">
        {/* Left column: Image */}
        <div className="col-span-5 lg:col-span-5 relative flex flex-col justify-center h-full">
          <div className={`w-full flex justify-center ${styles.zHigh}`}>
            <div className="relative w-[360px] h-[360px] lg:w-[420px] lg:h-[420px]">
              <div className="absolute top-[15%] -left-[5%] w-12 h-12 border-2 dark:border-[#1a1a2e]/60 border-[#c0c0d0]/60 opacity-40 rotate-45 z-10"></div>
              <div className="absolute bottom-[15%] -right-[5%] w-16 h-8 border-2 dark:border-[#1a1a2e]/60 border-[#c0c0d0]/60 opacity-40 z-10"></div>
              <div className="absolute top-[80%] -left-[10%] w-6 h-6 rounded-full border-2 dark:border-[#1a4a1f]/60 border-[#7e9c83]/60 opacity-60 z-10"></div>
              
              <div className="absolute inset-0 w-full h-full flex items-center justify-center z-10 pointer-events-none">
                <div className="w-[105%] h-[105%] border-dashed border-2 dark:border-[#1a1a2e]/30 border-[#d0d0e0]/30 rounded-xl"></div>
              </div>
              
              <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-xl transform hover:scale-[1.02] transition-all duration-500 z-50 bg-white">
                <div className="absolute inset-0 bg-gradient-to-br dark:from-[#0a1f30] dark:via-[#0e3320] dark:to-[#1a1a2e] from-[#e6f0eb] via-[#d0e0d8] to-[#c0c0d0] z-0"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#00000020] z-1 pointer-events-none"></div>
                <div className="absolute inset-0 bg-[url('/assets/circuit-overlay.svg')] bg-no-repeat bg-cover opacity-30 mix-blend-overlay z-2 pointer-events-none"></div>
                
                <div className="absolute -right-4 top-1/4 w-8 h-[2px] dark:bg-white/70 bg-[#006b42]/70 z-2"></div>
                <div className="absolute -bottom-4 right-1/4 h-8 w-[2px] dark:bg-white/70 bg-[#006b42]/70 z-2"></div>
                
                <div className="absolute -right-2 top-1/4 w-4 h-4 rounded-full border-2 dark:border-white/70 border-[#006b42]/70 z-2 flex items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full dark:bg-white bg-[#006b42] opacity-75"></span>
                </div>
                <div className="absolute -bottom-2 right-1/4 w-4 h-4 rounded-full border-2 dark:border-white/70 border-[#006b42]/70 z-2 flex items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full dark:bg-white bg-[#006b42] opacity-75"></span>
                </div>
                
                <div className="absolute inset-0 z-10">
                  <Image src="/assets/profile.png" alt="Muaath Rifath" fill className="object-contain" priority />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right column: Content */}
        <div className="col-span-7 lg:col-span-7 space-y-6">
          <div className="mb-6">
            <h2 className="text-3xl md:text-4xl font-bold font-mono tracking-tighter relative inline-flex flex-col">
              <span className="relative inline-block">
                <span className="inline-block dark:text-white text-[#006b42] pr-2 relative z-10">
                  About Me
                </span>
                <span className="absolute left-0 bottom-0 h-[2px] w-full dark:bg-white bg-[#006b42]"></span>
              </span>
              <span className="text-sm font-light tracking-wider text-muted-foreground mt-2 font-sans">
                <span className="inline-block w-8 h-[1px] dark:bg-white/40 bg-[#006b42]/40 mr-2 align-middle"></span>
                Software Engineer
              </span>
            </h2>
            
            <div className="mt-8">
              <AboutContent />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-8">
            {tags.map((tag, i) => (
              <span key={i} className="px-3 py-1 text-sm rounded-full dark:bg-[#1a1a2e]/60 bg-[#f0f0f8]/60 dark:text-gray-200 text-gray-700 border dark:border-[#2a2a4e]/50 border-[#d0d0e0]/70 hover:dark:bg-[#1a1a2e]/80 hover:bg-[#e6e6f0]/80 transition-colors duration-200">
                {tag}
              </span>
            ))}
          </div>
          
          <div className="mt-8 pt-4">
            <Link href="/experience">
              <Button variant="outline" className="relative px-6 py-3 font-mono border-2 overflow-hidden group dark:border-white/80 dark:text-white border-[#006b42] text-[#006b42] hover:shadow-md transition-all duration-300">
                <span className="relative z-10">EXPLORE MY EXPERIENCE</span>
                <span className="absolute inset-0 dark:bg-white/10 bg-[#006b42]/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="w-full mt-16 relative hidden md:block">
        <div className="absolute left-0 w-24 h-[1px] dark:bg-white/20 bg-[#006b42]/20"></div>
        <div className="absolute right-0 w-24 h-[1px] dark:bg-white/20 bg-[#006b42]/20"></div>
        <div className="absolute left-1/4 w-8 h-8 border rounded-full border-dashed dark:border-[#1a1a2e]/40 border-[#d0d0e0]/40 -translate-y-1/2"></div>
        <div className="absolute right-1/4 w-6 h-6 border-2 dark:border-[#1a1a2e]/40 border-[#d0d0e0]/40 -translate-y-1/2 rotate-45"></div>
      </div>
    </section>
  );
}
