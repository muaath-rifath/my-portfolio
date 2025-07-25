"use client";

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from "next/navigation"
import { sidebarLinks } from "@/constants";
import { ModeToggle } from './mode-toggle';
import MenuBar from "@/components/menu";
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

export default function Topbar() {
  const pathname = usePathname();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  
  return (
    <nav className="fixed inset-x-0 top-0 z-50 backdrop-blur-sm bg-background/80">
      <div className="relative overflow-hidden">
        {/* Circuit trace decorations */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="h-[1px] w-full dark:bg-[#8fffaa]/30 bg-[#006b42]/30 absolute bottom-0"></div>
          <div className="hidden dark:block">
            <div className="absolute right-12 top-1/2 h-2 w-2 rounded-full dark:bg-[#8fffaa]/60 bg-[#006b42]/60"></div>
            <div className="absolute right-28 top-1/2 h-1 w-1 rounded-full dark:bg-[#8fffaa]/40 bg-[#006b42]/40"></div>
            <div className="absolute left-20 top-1/2 h-1.5 w-1.5 rounded-full dark:bg-[#8fffaa]/50 bg-[#006b42]/50"></div>
          </div>
          
          {/* Additional circuit patterns for enhanced tech aesthetic */}
          <div className="absolute top-1/4 left-1/3 h-0.5 w-8 dark:bg-[#8fffaa]/10 bg-[#006b42]/10"></div>
          <div className="absolute top-3/4 right-1/4 h-0.5 w-12 dark:bg-[#8fffaa]/10 bg-[#006b42]/10"></div>
          <div className="absolute top-1/2 right-1/2 h-1.5 w-1.5 rounded-full dark:bg-[#8fffaa]/10 bg-[#006b42]/10"></div>
        </div>
        
        <div className="container px-4 md:px-6">
          <div className="flex h-16 items-center justify-between">
            {/* Logo with circuit-inspired styling */}
            <Link href="/" className="flex items-center gap-2 font-mono relative group">
              <div className="relative">
                <Image 
                  src="/assets/logo-portfolio.svg" 
                  height={26} 
                  width={26} 
                  className="w-6 h-6 dark:hidden transition-transform group-hover:scale-110 duration-300" 
                  alt="Portfolio Logo" 
                />
                <Image 
                  src="/assets/logo-portfolio-light.svg" 
                  height={26} 
                  width={26} 
                  className="w-6 h-6 hidden dark:block transition-transform group-hover:scale-110 duration-300" 
                  alt="Portfolio Logo" 
                />
                <div className="absolute -inset-1 rounded-full dark:bg-[#8fffaa]/20 bg-[#006b42]/10 z-[-1] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <span className="text-lg font-semibold tracking-tight relative">
                <span className="dark:text-white text-[#006b42]">Muaath</span>
                <span className="text-muted-foreground">Rifath</span>
                <span className="absolute -bottom-1 left-0 w-full h-[1px] dark:bg-[#8fffaa]/50 bg-[#006b42]/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </span>
            </Link>
            
            {/* Navigation links with LED indicators like mobile menu */}
            <nav className="hidden md:flex items-center space-x-3">
              {sidebarLinks.map((link) => {
                const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;
                return (
                  <Link 
                    href={link.route} 
                    key={link.label} 
                    className={cn(
                      "relative px-4 py-2 text-sm transition-colors font-mono group flex items-center gap-2",
                      isActive ? 
                        "text-[#006b42] dark:text-[#8fffaa] font-semibold" : 
                        "text-gray-700 dark:text-gray-300"
                    )}
                  >
                    {/* LED indicator like in mobile menu */}
                    <div className={cn(
                      "h-2 w-2 rounded-full",
                      isActive 
                        ? "bg-[#006b42] dark:bg-[#8fffaa]" 
                        : "bg-gray-400/40 dark:bg-gray-600/40"
                    )}>
                      {isActive && (
                        <div className="absolute inset-0 h-2 w-2 rounded-full dark:bg-[#8fffaa]/50 bg-[#006b42]/50 animate-pulse"></div>
                      )}
                    </div>
                    
                    <span className="relative z-10">{link.label}</span>
                    
                    {/* Circuit trace effect for active items */}
                    {isActive && (
                      <div className="absolute inset-x-0 bottom-0 h-[1px] dark:bg-[#8fffaa]/30 bg-[#006b42]/30"></div>
                    )}
                    
                    {/* Hover effect - circuit node appearance */}
                    <span className="absolute inset-0 rounded-md dark:bg-[#8fffaa]/10 bg-[#006b42]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </Link>
                );
              })}
              
              {/* Theme toggle with circuit-inspired styling */}
              <div className="ml-2 relative">
                <ModeToggle />
                {/* Circuit connector decoration */}
                <div className="absolute -left-2 top-1/2 w-2 h-[1px] dark:bg-[#8fffaa]/30 bg-[#006b42]/30 -translate-y-1/2"></div>
              </div>
            </nav>
            
            {/* Mobile menu button with circuit-inspired styling */}
            <div className="md:hidden">
              <MenuBar />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}