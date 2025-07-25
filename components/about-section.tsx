"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./about-section.module.css";
import { cn } from "@/lib/utils";

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  
  // Set animation when component is mounted
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section 
      className={cn(
        "container mx-auto px-4 py-16 md:py-24 transition-opacity duration-1000 relative z-20",
        isVisible ? "opacity-100" : "opacity-0"
      )}
      id="about"
    >
      {/* Mobile view layout */}
      <div className="md:hidden">
        <div className="relative mb-12 mt-6">
          {/* Section heading for mobile */}
          <h2 className="text-3xl font-bold font-mono tracking-tighter relative inline-flex flex-col mb-8">
            <span className="relative inline-block">
              <span className="inline-block dark:text-white text-[#006b42] pr-2 relative z-10">
                About Me
              </span>
              <span className="absolute left-0 bottom-0 h-[2px] w-full dark:bg-white bg-[#006b42]"></span>
            </span>
            <span className="text-sm font-light tracking-wider text-muted-foreground mt-2 font-sans">
              <span className="inline-block w-8 h-[1px] dark:bg-white/40 bg-[#006b42]/40 mr-2 align-middle"></span>
              IoT & Embedded Systems
            </span>
          </h2>
          
          {/* Split mobile layout into a flex layout with image "floating" on the side */}
          <div className="relative">
            {/* Profile Image - Positioned to the right side, floating above text with increased z-index */}
            <div className={`relative w-[160px] h-[160px] float-right ml-4 mb-4 ${styles.zHighest}`}>
              <div className="absolute inset-0 rounded-xl shadow-xl overflow-hidden bg-white">
                {/* Gradient background for the image - BEHIND the image */}
                <div className="absolute inset-0 bg-gradient-to-br dark:from-[#0a1f30] dark:via-[#0e3320] dark:to-[#1a1a2e] from-[#e6f0eb] via-[#d0e0d8] to-[#c0c0d0] z-0"></div>
                
                {/* Circuit overlay BEHIND the image */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#00000020] z-1 pointer-events-none"></div>
                <div className="absolute inset-0 bg-[url('/assets/circuit-overlay.svg')] bg-no-repeat bg-cover opacity-30 mix-blend-overlay z-2 pointer-events-none"></div>
                
                {/* Image with highest z-index */}
                <div className="absolute inset-0 z-10">
                  <Image 
                    src="/assets/profile.png" 
                    alt="Muaath Rifath" 
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
            
            {/* About content that wraps around the image */}
            <div className="space-y-4 text-muted-foreground">
              <p className="leading-relaxed">
                <span className="font-semibold dark:text-white text-[#006b42]">ECE Student</span> specializing in IoT and Embedded Systems, with a foundation in intelligent automation and edge computing solutions.
              </p>
              
              <p className="leading-relaxed">
                <span className="font-semibold dark:text-white text-[#006b42]">Core Focus:</span> Developing IoT architectures, hardware-software integration, and real-time embedded systems. Currently experimenting with edge computing and AI integration in IoT projects.
              </p>
              
              <p className="leading-relaxed">
                <span className="font-semibold dark:text-white text-[#006b42]">Technical Journey:</span> Primary expertise in IoT solutions and embedded systems development. Experienced Linux user (Arch Linux) with system optimization skills, while building proficiency in modern web development.
              </p>
              
              <div className="clear-right"></div> {/* Clear the float after content wraps */}
              
              <p className="leading-relaxed">
                <span className="font-semibold dark:text-white text-[#006b42]">What I Do:</span> Building experimental IoT solutions bridging hardware and AI, implementing embedded systems with focus on efficiency, and exploring full-stack development opportunities.
              </p>
            </div>
          </div>
          
          {/* Decorative circuit elements for mobile */}
          <div className="absolute top-[40%] -left-2 w-6 h-6 border-2 dark:border-[#1a1a2e]/60 border-[#c0c0d0]/60 opacity-40 rotate-45 z-0"></div>
          <div className="absolute bottom-[20%] -right-3 w-10 h-5 border-2 dark:border-[#1a1a2e]/60 border-[#c0c0d0]/60 opacity-40 z-0"></div>
        </div>
        
        {/* Tech expertise tags */}
        <div className="flex flex-wrap gap-2 mt-6">
          {["IoT", "Embedded Systems", "Edge Computing", "Linux", "MCU Programming", 
            "System Architecture", "Hardware Integration", "AI/ML", "Web Development"].map((tag, i) => (
            <span 
              key={i} 
              className="px-3 py-1 text-sm rounded-full dark:bg-[#1a1a2e]/60 bg-[#f0f0f8]/60 
                       dark:text-gray-200 text-gray-700 border dark:border-[#2a2a4e]/50 border-[#d0d0e0]/70
                       hover:dark:bg-[#1a1a2e]/80 hover:bg-[#e6e6f0]/80 transition-colors duration-200"
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* Button for mobile */}
        <div className="mt-8 pt-2">
          <Link href="/experience" className="w-full block">
            <Button 
              variant="outline"
              className="relative w-full px-6 py-3 font-mono border-2 overflow-hidden group dark:border-white/80 dark:text-white border-[#006b42] text-[#006b42]"
            >
              <span className="relative z-10">EXPLORE MY EXPERIENCE</span>
              <span className="absolute inset-0 dark:bg-white/10 bg-[#006b42]/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Desktop view (side by side) */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
        {/* Profile image with circuit board overlay and gradient effect - INCREASED SIZE and Z-INDEX */}
        <div className={`relative h-[450px] lg:h-[550px] flex items-center justify-center ${styles.zHigh}`}>
          <div className="absolute top-[15%] left-[10%] w-12 h-12 border-2 dark:border-[#1a1a2e]/60 border-[#c0c0d0]/60 opacity-40 rotate-45 z-10"></div>
          <div className="absolute bottom-[15%] right-[10%] w-16 h-8 border-2 dark:border-[#1a1a2e]/60 border-[#c0c0d0]/60 opacity-40 z-10"></div>
          <div className="absolute top-[80%] left-[15%] w-6 h-6 rounded-full border-2 dark:border-[#1a4a1f]/60 border-[#7e9c83]/60 opacity-60 z-10"></div>
          
          {/* This pattern mimics the circuit aesthetic */}
          <div className="absolute inset-0 w-full h-full flex items-center justify-center z-10">
            <div className="w-[85%] h-[85%] border-dashed border-2 dark:border-[#1a1a2e]/30 border-[#d0d0e0]/30 rounded-xl"></div>
          </div>
          
          {/* Main image container with gradient background - LARGER SIZE */}
          <div className="relative w-[360px] h-[360px] lg:w-[420px] lg:h-[420px] rounded-2xl overflow-hidden shadow-xl transform hover:scale-[1.02] transition-all duration-500 z-50 bg-white">
            {/* Gradient background for the image - BEHIND the image */}
            <div className="absolute inset-0 bg-gradient-to-br dark:from-[#0a1f30] dark:via-[#0e3320] dark:to-[#1a1a2e] from-[#e6f0eb] via-[#d0e0d8] to-[#c0c0d0] z-0"></div>
            
            {/* Circuit overlay BEHIND the image */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#00000020] z-1 pointer-events-none"></div>
            <div className="absolute inset-0 bg-[url('/assets/circuit-overlay.svg')] bg-no-repeat bg-cover opacity-30 mix-blend-overlay z-2 pointer-events-none"></div>
            
            {/* Connection lines with animation - BEHIND the image */}
            <div className="absolute -right-4 top-1/4 w-8 h-[2px] dark:bg-white/70 bg-[#006b42]/70 z-2"></div>
            <div className="absolute -bottom-4 right-1/4 h-8 w-[2px] dark:bg-white/70 bg-[#006b42]/70 z-2"></div>
            
            {/* Connection points with pulse effect - BEHIND the image */}
            <div className="absolute -right-2 top-1/4 w-4 h-4 rounded-full border-2 dark:border-white/70 border-[#006b42]/70 z-2 flex items-center justify-center">
              <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full dark:bg-white bg-[#006b42] opacity-75"></span>
            </div>
            <div className="absolute -bottom-2 right-1/4 w-4 h-4 rounded-full border-2 dark:border-white/70 border-[#006b42]/70 z-2 flex items-center justify-center">
              <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full dark:bg-white bg-[#006b42] opacity-75"></span>
            </div>
            
            {/* Image with highest z-index */}
            <div className="absolute inset-0 z-10">
              <Image 
                src="/assets/profile.png" 
                alt="Muaath Rifath" 
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
        
        {/* About content */}
        <div className="space-y-6">
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
                IoT & Embedded Systems
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
          
          {/* Tech expertise tags with improved spacing */}
          <div className="flex flex-wrap gap-2 mt-6">
            {["IoT", "Embedded Systems", "Edge Computing", "Linux", "MCU Programming", 
              "System Architecture", "Hardware Integration", "AI/ML", "Web Development"].map((tag, i) => (
              <span 
                key={i} 
                className="px-3 py-1 text-sm rounded-full dark:bg-[#1a1a2e]/60 bg-[#f0f0f8]/60 
                          dark:text-gray-200 text-gray-700 border dark:border-[#2a2a4e]/50 border-[#d0d0e0]/70
                          hover:dark:bg-[#1a1a2e]/80 hover:bg-[#e6e6f0]/80 transition-colors duration-200"
              >
                {tag}
              </span>
            ))}
          </div>
          
          {/* Learn More button */}
          <div className="mt-8 pt-4">
            <Link href="/experience">
              <Button 
                variant="outline"
                className="relative px-6 py-3 font-mono border-2 overflow-hidden group dark:border-white/80 dark:text-white border-[#006b42] text-[#006b42] hover:shadow-md transition-all duration-300"
              >
                <span className="relative z-10">EXPLORE MY EXPERIENCE</span>
                <span className="absolute inset-0 dark:bg-white/10 bg-[#006b42]/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Decorative circuit elements at the bottom - desktop only */}
      <div className="w-full mt-16 relative hidden md:block">
        <div className="absolute left-0 w-24 h-[1px] dark:bg-white/20 bg-[#006b42]/20"></div>
        <div className="absolute right-0 w-24 h-[1px] dark:bg-white/20 bg-[#006b42]/20"></div>
        <div className="absolute left-1/4 w-8 h-8 border rounded-full border-dashed dark:border-[#1a1a2e]/40 border-[#d0d0e0]/40 -translate-y-1/2"></div>
        <div className="absolute right-1/4 w-6 h-6 border-2 dark:border-[#1a1a2e]/40 border-[#d0d0e0]/40 -translate-y-1/2 rotate-45"></div>
      </div>
    </section>
  );
}