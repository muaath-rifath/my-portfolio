"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function AboutSection() {
  const { theme } = useTheme();

  return (
    <section className="container mx-auto px-4 py-24" id="about">
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        {/* Profile image with circuit board overlay effect */}
        <div className="relative h-[400px] order-last lg:order-first flex justify-center">
          <div className="relative w-[320px] h-[320px] rounded-2xl overflow-hidden">
            <Image 
              src="/assets/profile-1.png" 
              alt="Muaath Rifath" 
              fill
              className="object-cover"
              priority
            />
            {/* Circuit overlay on the image */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#00000050] pointer-events-none"></div>
            <div className="absolute inset-0 bg-[url('/assets/circuit-overlay.svg')] bg-no-repeat bg-cover opacity-30 mix-blend-overlay pointer-events-none"></div>
            
            {/* Connector lines */}
            <div className="absolute -right-4 top-1/4 w-8 h-[2px] dark:bg-white bg-[#006b42]"></div>
            <div className="absolute -bottom-4 right-1/4 h-8 w-[2px] dark:bg-white bg-[#006b42]"></div>
            
            {/* Connection points */}
            <div className="absolute -right-2 top-1/4 w-4 h-4 rounded-full border-2 dark:border-white border-[#006b42]"></div>
            <div className="absolute -bottom-2 right-1/4 w-4 h-4 rounded-full border-2 dark:border-white border-[#006b42]"></div>
          </div>
          
          {/* Tech-inspired decorative elements */}
          <div className="absolute top-[15%] left-[10%] w-12 h-12 border-2 dark:border-[#1a1a2e] border-[#c0c0d0] opacity-40 rotate-45"></div>
          <div className="absolute bottom-[15%] right-[10%] w-16 h-8 border-2 dark:border-[#1a1a2e] border-[#c0c0d0] opacity-40"></div>
          <div className="absolute top-[80%] left-[15%] w-6 h-6 rounded-full border-2 dark:border-[#1a4a1f] border-[#7e9c83] opacity-60"></div>
        </div>
        
        {/* About content */}
        <div className="space-y-6">
          <div className="mb-6">
            <h2 className="text-3xl md:text-4xl font-bold font-mono tracking-tighter relative">
              <span className="relative inline-block">
                <span className="inline-block dark:text-white text-[#006b42] pr-2 relative z-10">
                  About Me
                </span>
                <span className="absolute left-0 bottom-0 h-[2px] w-full dark:bg-white bg-[#006b42]"></span>
              </span>
            </h2>
            
            <div className="mt-8 space-y-4 text-muted-foreground">
              <p className="leading-relaxed">
                <span className="font-semibold dark:text-white text-[#006b42]">ECE Student</span> specializing in IoT and Embedded Systems, with a foundation in intelligent automation and edge computing solutions.
              </p>
              
              <p className="leading-relaxed">
                <span className="font-semibold dark:text-white text-[#006b42]">Core Focus:</span> Developing IoT architectures, hardware-software integration, and real-time embedded systems. Currently experimenting with edge computing and AI integration in IoT projects.
              </p>
              
              <p className="leading-relaxed">
                <span className="font-semibold dark:text-white text-[#006b42]">Technical Journey:</span> Primary expertise in IoT solutions and embedded systems development. Experienced Linux user (Arch Linux) with system optimization skills, while building proficiency in modern web development.
              </p>
              
              <p className="leading-relaxed">
                <span className="font-semibold dark:text-white text-[#006b42]">What I Do:</span> Building experimental IoT solutions bridging hardware and AI, implementing embedded systems with focus on efficiency, and exploring full-stack development opportunities.
              </p>
            </div>
          </div>
          
          {/* Tech expertise tags */}
          <div className="flex flex-wrap gap-2">
            {["IoT", "Embedded Systems", "Edge Computing", "Linux", "MCU Programming", 
              "System Architecture", "Hardware Integration", "AI/ML", "Web Development"].map((tag, i) => (
              <span 
                key={i} 
                className="px-3 py-1 text-sm rounded-full dark:bg-[#1a1a2e] bg-[#e6e6f0] 
                          dark:text-gray-300 text-gray-700 border dark:border-[#2a2a4e] border-[#d0d0e0]"
              >
                {tag}
              </span>
            ))}
          </div>
          
          {/* Learn More button */}
          <div className="mt-8">
            <Link href="/expertise">
              <Button 
                variant="outline"
                className="relative px-6 py-3 font-mono border-2 overflow-hidden group dark:border-white dark:text-white border-[#006b42] text-[#006b42]"
              >
                <span>EXPLORE MY EXPERTISE</span>
                <span className="absolute inset-0 dark:bg-white/10 bg-[#006b42]/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}