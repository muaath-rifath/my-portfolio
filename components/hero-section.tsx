"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TypewriterText } from "@/components/typewriter-text";
import dynamic from 'next/dynamic';
import { IconBrandX, IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-react';

// Correctly typed dynamic import for Model3D with SSR disabled
const Model3D = dynamic(
  () => import('@/components/model-3d').then(mod => mod.Model3D), // Corrected path
  {
    ssr: false,
    loading: () => <div className="w-full h-64 flex items-center justify-center"><p>Loading 3D model...</p></div> // Correct loading state syntax
  }
);

export function HeroSection() {
  const isDarkMode = true; // Determine if dark mode is active

  return (
    <section className="container mx-auto px-4 pt-24 lg:pt-0 lg:min-h-screen lg:flex lg:flex-col lg:justify-center">
      <div className="grid lg:grid-cols-2 gap-8 items-center mt-16 lg:mt-0">
        <div className="space-y-8">
          {/* PCB-inspired name treatment */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-bold mb-2 font-mono tracking-tighter relative">
              <span className="block text-2xl text-muted-foreground dark:text-gray-300 mb-2">
                Hi, I'm
              </span>
              <span className="relative inline-block">
                <span className="inline-block dark:text-white text-[#006b42] pr-2 relative z-10">
                  Mohamed Muaath Rifath
                </span>
                <span className="absolute left-0 bottom-0 h-[2px] w-full dark:bg-white bg-[#006b42]"></span>
              </span>
            </h1>

            {/* Replace static text with TypewriterText component */}
            <div className="mt-4">
              <TypewriterText />
            </div>
          </div>

          {/* Social links */}
          <div className="flex flex-wrap items-center gap-3">
            <Link href="https://github.com/muaath-rifath" target="_blank" rel="me">
              <Button variant="outline" size="icon" className="rounded-full dark:border-white dark:text-white border-[#006b42] text-[#006b42]">
                <IconBrandGithub className="h-5 w-5" stroke={1.5} />
              </Button>
            </Link>
            <Link href="https://linkedin.com/in/muaath-rifath" target="_blank" rel="me">
              <Button variant="outline" size="icon" className="rounded-full dark:border-white dark:text-white border-[#006b42] text-[#006b42]">
                <IconBrandLinkedin className="h-5 w-5" stroke={1.5} />
              </Button>
            </Link>
            <Link href="https://x.com/MuaathRifath" target="_blank" rel="me">
              <Button variant="outline" size="icon" className="rounded-full dark:border-white dark:text-white border-[#006b42] text-[#006b42]">
                <IconBrandX className="h-5 w-5" stroke={1.5} />
              </Button>
            </Link>
          </div>

          {/* Contact and Resume buttons on the same row */}
          <div className="flex flex-wrap items-center gap-4 mt-6">
            <Link href="/contact">
              <Button className="dark:bg-white dark:text-[#111] dark:hover:bg-white/90 bg-[#006b42] hover:bg-[#006b42]/90 text-white">
                Contact Me
              </Button>
            </Link>

            <Link href="/resume.pdf" target="_blank" rel="me">
              <Button
                variant="outline"
                className="relative px-6 py-3 font-mono border-2 overflow-hidden group dark:border-white dark:text-white border-[#006b42] text-[#006b42]"
              >
                <span>VIEW RESUME</span>
                <span className="absolute inset-0 dark:bg-white/10 bg-[#006b42]/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              </Button>
            </Link>
          </div>
        </div>

        {/* 3D Model Column - Pass isDarkMode prop */}
        <div className="relative h-64 lg:h-[500px] flex items-center justify-center">
          <Model3D isDarkMode={isDarkMode} scale={0.7} />
        </div>
      </div>
    </section>
  );
}