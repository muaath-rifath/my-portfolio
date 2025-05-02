"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TypewriterText } from "@/components/typewriter-text";
import dynamic from 'next/dynamic';

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
                <svg viewBox="0 0 24 24" className="h-5 w-5">
                  <path fill="currentColor" d="M12 0a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.5-1.4-1.3-1.8-1.3-1.8-1.2-.7 0-.7 0-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.1-.4-.6-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.6.2 2.9.1 3.2.8.8 1.3 1.9 1.3 3.2 0 4.6-2.9 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 0z" />
                </svg>
              </Button>
            </Link>
            <Link href="https://linkedin.com/in/muaath-rifath" target="_blank" rel="me">
              <Button variant="outline" size="icon" className="rounded-full dark:border-white dark:text-white border-[#006b42] text-[#006b42]">
                <svg viewBox="0 0 24 24" className="h-5 w-5">
                  <path fill="currentColor" d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
                </svg>
              </Button>
            </Link>
            <Link href="https://x.com/MuaathRifath" target="_blank" rel="me">
              <Button variant="outline" size="icon" className="rounded-full dark:border-white dark:text-white border-[#006b42] text-[#006b42]">
                <svg viewBox="0 0 24 24" className="h-5 w-5">
                  <path fill="currentColor" d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
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

            <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer">
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