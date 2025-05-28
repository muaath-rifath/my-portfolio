"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { usePathname } from "next/navigation";
import { IconBrandX, IconBrandGithub, IconBrandLinkedin, IconMail } from '@tabler/icons-react';
import styles from './ui/animated-border.module.css';

export default function Footer() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  
  return (
    <footer className="relative overflow-hidden z-10 mt-auto border-t dark:border-[#8fffaa]/10 border-[#006b42]/10">
      {/* Enhanced background with gradient */}
      <div className="absolute inset-0 z-0 dark:bg-gradient-to-b dark:from-black/80 dark:to-black/60 bg-gradient-to-b from-white/90 to-white/70 backdrop-blur-md"></div>
      
      {/* Circuit trace decorations - enhanced */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="h-[1px] w-full dark:bg-[#8fffaa]/30 bg-[#006b42]/30 absolute top-0 dark:shadow-[0_0_10px_1px_rgba(143,255,170,0.3)] shadow-[0_0_10px_1px_rgba(0,107,66,0.15)]"></div>
        <div className="hidden dark:block">
          <div className="absolute left-12 top-1/2 h-2 w-2 rounded-full dark:bg-[#8fffaa]/60 bg-[#006b42]/60 animate-pulse dark:shadow-[0_0_8px_2px_rgba(143,255,170,0.4)]"></div>
          <div className="absolute left-28 top-1/2 h-1 w-1 rounded-full dark:bg-[#8fffaa]/40 bg-[#006b42]/40 animate-pulse animation-delay-500 dark:shadow-[0_0_5px_1px_rgba(143,255,170,0.3)]"></div>
          <div className="absolute right-20 top-1/2 h-1.5 w-1.5 rounded-full dark:bg-[#8fffaa]/50 bg-[#006b42]/50 animate-pulse animation-delay-700 dark:shadow-[0_0_7px_1px_rgba(143,255,170,0.3)]"></div>
        </div>
        
        {/* Additional circuit patterns for enhanced tech aesthetic - with glow */}
        <div className="absolute top-1/4 right-1/3 h-0.5 w-8 dark:bg-[#8fffaa]/20 bg-[#006b42]/15 dark:shadow-[0_0_5px_1px_rgba(143,255,170,0.2)]"></div>
        <div className="absolute top-3/4 left-1/4 h-0.5 w-12 dark:bg-[#8fffaa]/20 bg-[#006b42]/15 dark:shadow-[0_0_5px_1px_rgba(143,255,170,0.2)]"></div>
        <div className="absolute top-1/2 left-1/2 h-1.5 w-1.5 rounded-full dark:bg-[#8fffaa]/20 bg-[#006b42]/15 animate-ping animation-delay-300 dark:shadow-[0_0_10px_2px_rgba(143,255,170,0.3)]"></div>
      </div>
      
      {/* Animated circuit traces that move across the footer */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none overflow-hidden">
        <div className="h-[2px] w-20 dark:bg-[#8fffaa]/40 bg-[#006b42]/40 absolute -left-20 top-1/3 animate-circuit-trace dark:shadow-[0_0_8px_2px_rgba(143,255,170,0.4)] shadow-[0_0_8px_2px_rgba(0,107,66,0.25)]"></div>
        <div className="h-[2px] w-32 dark:bg-[#8fffaa]/40 bg-[#006b42]/40 absolute -right-32 top-2/3 animate-circuit-trace animation-delay-1000 dark:shadow-[0_0_8px_2px_rgba(143,255,170,0.4)] shadow-[0_0_8px_2px_rgba(0,107,66,0.25)]"></div>
      </div>
      
      {/* Additional animated circuit elements */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
        <div className="absolute left-1/4 top-10 w-[1px] h-10 dark:bg-gradient-to-b dark:from-[#8fffaa]/0 dark:via-[#8fffaa]/50 dark:to-[#8fffaa]/0 bg-gradient-to-b from-[#006b42]/0 via-[#006b42]/30 to-[#006b42]/0 animate-pulse animation-delay-300"></div>
        <div className="absolute right-1/4 top-6 w-[1px] h-16 dark:bg-gradient-to-b dark:from-[#8fffaa]/0 dark:via-[#8fffaa]/40 dark:to-[#8fffaa]/0 bg-gradient-to-b from-[#006b42]/0 via-[#006b42]/20 to-[#006b42]/0 animate-pulse animation-delay-700"></div>
      </div>
      
      <div className="container px-4 md:px-6 py-8 md:py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Logo and short bio - Enhanced with gradient */}
          <div className="space-y-4 rounded-lg p-5 dark:bg-gradient-to-br dark:from-black/60 dark:to-black/40 bg-gradient-to-br from-white/60 to-white/40 backdrop-blur-sm border dark:border-[#8fffaa]/10 border-[#006b42]/10 shadow-sm transition-all duration-300 hover:dark:shadow-[0_4px_15px_-2px_rgba(143,255,170,0.15)] hover:shadow-[0_4px_15px_-2px_rgba(0,107,66,0.1)] dark:hover:border-[#8fffaa]/20 hover:border-[#006b42]/20 group relative overflow-hidden">
            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 w-16 h-16 dark:bg-gradient-to-bl dark:from-[#8fffaa]/5 dark:to-transparent bg-gradient-to-bl from-[#006b42]/3 to-transparent rounded-bl-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <Link href="/" className="inline-flex items-center gap-2 font-mono relative group">
              <span className="text-lg font-semibold tracking-tight relative">
                <span className="dark:text-white text-[#006b42]">Muaath</span>
                <span className="text-muted-foreground">Rifath</span>
                <span className="absolute -bottom-1 left-0 w-full h-[1px] dark:bg-gradient-to-r dark:from-[#8fffaa]/70 dark:via-[#8fffaa]/50 dark:to-[#8fffaa]/70 bg-gradient-to-r from-[#006b42]/70 via-[#006b42]/50 to-[#006b42]/70 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Engineering student bridging hardware and software through IoT innovation.
              Specialized in embedded systems, real-time applications, and modern web development.
            </p>
          </div>
          
          {/* Column 2: Quick Links - Without background */}
          <div className="space-y-4 p-5 rounded-lg relative group">
            <h3 className="text-sm font-semibold uppercase tracking-wider font-mono dark:text-[#8fffaa] text-[#006b42] mb-5">
              <span className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full dark:bg-[#8fffaa] bg-[#006b42] animate-pulse dark:shadow-[0_0_5px_2px_rgba(143,255,170,0.3)]"></div>
                Quick Links
              </span>
            </h3>
            
            {/* Vertical connecting line decoration */}
            <div className="absolute left-1.5 top-1 bottom-1 w-[1px] dark:bg-gradient-to-b dark:from-[#8fffaa]/0 dark:via-[#8fffaa]/20 dark:to-[#8fffaa]/0 bg-gradient-to-b from-[#006b42]/0 via-[#006b42]/10 to-[#006b42]/0 transition-all duration-300 group-hover:dark:via-[#8fffaa]/60 group-hover:via-[#006b42]/40 group-hover:dark:shadow-[0_0_8px_2px_rgba(143,255,170,0.3)] group-hover:shadow-[0_0_8px_2px_rgba(0,107,66,0.2)]"></div>
            
            <ul className="space-y-3 pl-4 relative">
              
              <li>
                {(() => {
                  const isActive = pathname === '/';
                  return (
                    <Link 
                      href="/" 
                      className={`
                        text-sm transition-colors relative group/link inline-flex items-center
                        ${isActive 
                          ? 'dark:text-[#8fffaa] text-[#006b42] font-semibold' 
                          : 'hover:dark:text-[#8fffaa] hover:text-[#006b42]'
                        }
                      `}
                    >
                      {/* Dot decorator with active state */}
                      <span className={`
                        w-1 h-1 rounded-full absolute -left-4 transition-colors duration-300
                        ${isActive 
                          ? 'dark:bg-[#8fffaa] bg-[#006b42] dark:shadow-[0_0_5px_2px_rgba(143,255,170,0.3)]' 
                          : 'dark:bg-[#8fffaa]/30 bg-[#006b42]/30 group-hover/link:dark:bg-[#8fffaa] group-hover/link:bg-[#006b42]'
                        }
                      `}></span>
                      
                      <span>Home</span>
                      
                      {/* Permanent underline for active state, hover underline for inactive */}
                      <span className={`
                        absolute -bottom-0.5 left-0 w-full h-[1px] 
                        dark:bg-gradient-to-r dark:from-[#8fffaa]/0 dark:via-[#8fffaa]/70 dark:to-[#8fffaa]/0 
                        bg-gradient-to-r from-[#006b42]/0 via-[#006b42]/70 to-[#006b42]/0 
                        transition-transform duration-300 origin-left
                        ${isActive 
                          ? 'scale-x-100' 
                          : 'scale-x-0 group-hover/link:scale-x-100'
                        }
                      `}></span>
                    </Link>
                  );
                })()}
              </li>
              <li>
                {(() => {
                  const isActive = pathname === '/expertise';
                  return (
                    <Link 
                      href="/expertise" 
                      className={`
                        text-sm transition-colors relative group/link inline-flex items-center
                        ${isActive 
                          ? 'dark:text-[#8fffaa] text-[#006b42] font-semibold' 
                          : 'hover:dark:text-[#8fffaa] hover:text-[#006b42]'
                        }
                      `}
                    >
                      {/* Dot decorator with active state */}
                      <span className={`
                        w-1 h-1 rounded-full absolute -left-4 transition-colors duration-300
                        ${isActive 
                          ? 'dark:bg-[#8fffaa] bg-[#006b42] dark:shadow-[0_0_5px_2px_rgba(143,255,170,0.3)]' 
                          : 'dark:bg-[#8fffaa]/30 bg-[#006b42]/30 group-hover/link:dark:bg-[#8fffaa] group-hover/link:bg-[#006b42]'
                        }
                      `}></span>
                      
                      <span>Expertise</span>
                      
                      {/* Permanent underline for active state, hover underline for inactive */}
                      <span className={`
                        absolute -bottom-0.5 left-0 w-full h-[1px] 
                        dark:bg-gradient-to-r dark:from-[#8fffaa]/0 dark:via-[#8fffaa]/70 dark:to-[#8fffaa]/0 
                        bg-gradient-to-r from-[#006b42]/0 via-[#006b42]/70 to-[#006b42]/0 
                        transition-transform duration-300 origin-left
                        ${isActive 
                          ? 'scale-x-100' 
                          : 'scale-x-0 group-hover/link:scale-x-100'
                        }
                      `}></span>
                    </Link>
                  );
                })()}
              </li>
              <li>
                {(() => {
                  const isActive = pathname === '/blog';
                  return (
                    <Link 
                      href="/blog" 
                      className={`
                        text-sm transition-colors relative group/link inline-flex items-center
                        ${isActive 
                          ? 'dark:text-[#8fffaa] text-[#006b42] font-semibold' 
                          : 'hover:dark:text-[#8fffaa] hover:text-[#006b42]'
                        }
                      `}
                    >
                      {/* Dot decorator with active state */}
                      <span className={`
                        w-1 h-1 rounded-full absolute -left-4 transition-colors duration-300
                        ${isActive 
                          ? 'dark:bg-[#8fffaa] bg-[#006b42] dark:shadow-[0_0_5px_2px_rgba(143,255,170,0.3)]' 
                          : 'dark:bg-[#8fffaa]/30 bg-[#006b42]/30 group-hover/link:dark:bg-[#8fffaa] group-hover/link:bg-[#006b42]'
                        }
                      `}></span>
                      
                      <span>Blog</span>
                      
                      {/* Permanent underline for active state, hover underline for inactive */}
                      <span className={`
                        absolute -bottom-0.5 left-0 w-full h-[1px] 
                        dark:bg-gradient-to-r dark:from-[#8fffaa]/0 dark:via-[#8fffaa]/70 dark:to-[#8fffaa]/0 
                        bg-gradient-to-r from-[#006b42]/0 via-[#006b42]/70 to-[#006b42]/0 
                        transition-transform duration-300 origin-left
                        ${isActive 
                          ? 'scale-x-100' 
                          : 'scale-x-0 group-hover/link:scale-x-100'
                        }
                      `}></span>
                    </Link>
                  );
                })()}
              </li>
              <li>
                {(() => {
                  const isActive = pathname === '/contact';
                  return (
                    <Link 
                      href="/contact" 
                      className={`
                        text-sm transition-colors relative group/link inline-flex items-center
                        ${isActive 
                          ? 'dark:text-[#8fffaa] text-[#006b42] font-semibold' 
                          : 'hover:dark:text-[#8fffaa] hover:text-[#006b42]'
                        }
                      `}
                    >
                      {/* Dot decorator with active state */}
                      <span className={`
                        w-1 h-1 rounded-full absolute -left-4 transition-colors duration-300
                        ${isActive 
                          ? 'dark:bg-[#8fffaa] bg-[#006b42] dark:shadow-[0_0_5px_2px_rgba(143,255,170,0.3)]' 
                          : 'dark:bg-[#8fffaa]/30 bg-[#006b42]/30 group-hover/link:dark:bg-[#8fffaa] group-hover/link:bg-[#006b42]'
                        }
                      `}></span>
                      
                      <span>Contact</span>
                      
                      {/* Permanent underline for active state, hover underline for inactive */}
                      <span className={`
                        absolute -bottom-0.5 left-0 w-full h-[1px] 
                        dark:bg-gradient-to-r dark:from-[#8fffaa]/0 dark:via-[#8fffaa]/70 dark:to-[#8fffaa]/0 
                        bg-gradient-to-r from-[#006b42]/0 via-[#006b42]/70 to-[#006b42]/0 
                        transition-transform duration-300 origin-left
                        ${isActive 
                          ? 'scale-x-100' 
                          : 'scale-x-0 group-hover/link:scale-x-100'
                        }
                      `}></span>
                    </Link>
                  );
                })()}
              </li>
            </ul>
          </div>
          
          {/* Column 3: Resources - Without background */}
          <div className="space-y-4 p-5 rounded-lg relative group">
            <h3 className="text-sm font-semibold uppercase tracking-wider font-mono dark:text-[#8fffaa] text-[#006b42] mb-5">
              <span className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full dark:bg-[#8fffaa] bg-[#006b42] animate-pulse animation-delay-300 dark:shadow-[0_0_5px_2px_rgba(143,255,170,0.3)]"></div>
                Resources
              </span>
            </h3>
            
            {/* Vertical connecting line decoration */}
            <div className="absolute left-1.5 top-1 bottom-1 w-[1px] dark:bg-gradient-to-b dark:from-[#8fffaa]/0 dark:via-[#8fffaa]/20 dark:to-[#8fffaa]/0 bg-gradient-to-b from-[#006b42]/0 via-[#006b42]/10 to-[#006b42]/0 transition-all duration-300 group-hover:dark:via-[#8fffaa]/60 group-hover:via-[#006b42]/40 group-hover:dark:shadow-[0_0_8px_2px_rgba(143,255,170,0.3)] group-hover:shadow-[0_0_8px_2px_rgba(0,107,66,0.2)]"></div>
            
            <ul className="space-y-3 pl-4 relative">
              
              <li>
                {(() => {
                  const isActive = pathname.includes('/blog/tag/embedded');
                  return (
                    <Link 
                      href="/blog/tag/embedded" 
                      className={`
                        text-sm transition-colors relative group/link inline-flex items-center
                        ${isActive 
                          ? 'dark:text-[#8fffaa] text-[#006b42] font-semibold' 
                          : 'hover:dark:text-[#8fffaa] hover:text-[#006b42]'
                        }
                      `}
                    >
                      {/* Dot decorator with active state */}
                      <span className={`
                        w-1 h-1 rounded-full absolute -left-4 transition-colors duration-300
                        ${isActive 
                          ? 'dark:bg-[#8fffaa] bg-[#006b42] dark:shadow-[0_0_5px_2px_rgba(143,255,170,0.3)]' 
                          : 'dark:bg-[#8fffaa]/30 bg-[#006b42]/30 group-hover/link:dark:bg-[#8fffaa] group-hover/link:bg-[#006b42]'
                        }
                      `}></span>
                      
                      <span>Embedded Systems</span>
                      
                      {/* Permanent underline for active state, hover underline for inactive */}
                      <span className={`
                        absolute -bottom-0.5 left-0 w-full h-[1px] 
                        dark:bg-gradient-to-r dark:from-[#8fffaa]/0 dark:via-[#8fffaa]/70 dark:to-[#8fffaa]/0 
                        bg-gradient-to-r from-[#006b42]/0 via-[#006b42]/70 to-[#006b42]/0 
                        transition-transform duration-300 origin-left
                        ${isActive 
                          ? 'scale-x-100' 
                          : 'scale-x-0 group-hover/link:scale-x-100'
                        }
                      `}></span>
                    </Link>
                  );
                })()}
              </li>
              <li>
                {(() => {
                  const isActive = pathname.includes('/blog/tag/iot');
                  return (
                    <Link 
                      href="/blog/tag/iot" 
                      className={`
                        text-sm transition-colors relative group/link inline-flex items-center
                        ${isActive 
                          ? 'dark:text-[#8fffaa] text-[#006b42] font-semibold' 
                          : 'hover:dark:text-[#8fffaa] hover:text-[#006b42]'
                        }
                      `}
                    >
                      {/* Dot decorator with active state */}
                      <span className={`
                        w-1 h-1 rounded-full absolute -left-4 transition-colors duration-300
                        ${isActive 
                          ? 'dark:bg-[#8fffaa] bg-[#006b42] dark:shadow-[0_0_5px_2px_rgba(143,255,170,0.3)]' 
                          : 'dark:bg-[#8fffaa]/30 bg-[#006b42]/30 group-hover/link:dark:bg-[#8fffaa] group-hover/link:bg-[#006b42]'
                        }
                      `}></span>
                      
                      <span>IoT Projects</span>
                      
                      {/* Permanent underline for active state, hover underline for inactive */}
                      <span className={`
                        absolute -bottom-0.5 left-0 w-full h-[1px] 
                        dark:bg-gradient-to-r dark:from-[#8fffaa]/0 dark:via-[#8fffaa]/70 dark:to-[#8fffaa]/0 
                        bg-gradient-to-r from-[#006b42]/0 via-[#006b42]/70 to-[#006b42]/0 
                        transition-transform duration-300 origin-left
                        ${isActive 
                          ? 'scale-x-100' 
                          : 'scale-x-0 group-hover/link:scale-x-100'
                        }
                      `}></span>
                    </Link>
                  );
                })()}
              </li>
              <li>
                {(() => {
                  const isActive = pathname.includes('/blog/tag/web');
                  return (
                    <Link 
                      href="/blog/tag/web" 
                      className={`
                        text-sm transition-colors relative group/link inline-flex items-center
                        ${isActive 
                          ? 'dark:text-[#8fffaa] text-[#006b42] font-semibold' 
                          : 'hover:dark:text-[#8fffaa] hover:text-[#006b42]'
                        }
                      `}
                    >
                      {/* Dot decorator with active state */}
                      <span className={`
                        w-1 h-1 rounded-full absolute -left-4 transition-colors duration-300
                        ${isActive 
                          ? 'dark:bg-[#8fffaa] bg-[#006b42] dark:shadow-[0_0_5px_2px_rgba(143,255,170,0.3)]' 
                          : 'dark:bg-[#8fffaa]/30 bg-[#006b42]/30 group-hover/link:dark:bg-[#8fffaa] group-hover/link:bg-[#006b42]'
                        }
                      `}></span>
                      
                      <span>Web Development</span>
                      
                      {/* Permanent underline for active state, hover underline for inactive */}
                      <span className={`
                        absolute -bottom-0.5 left-0 w-full h-[1px] 
                        dark:bg-gradient-to-r dark:from-[#8fffaa]/0 dark:via-[#8fffaa]/70 dark:to-[#8fffaa]/0 
                        bg-gradient-to-r from-[#006b42]/0 via-[#006b42]/70 to-[#006b42]/0 
                        transition-transform duration-300 origin-left
                        ${isActive 
                          ? 'scale-x-100' 
                          : 'scale-x-0 group-hover/link:scale-x-100'
                        }
                      `}></span>
                    </Link>
                  );
                })()}
              </li>
              <li>
                {(() => {
                  const isActive = pathname.includes('/blog/tag/tutorials');
                  return (
                    <Link 
                      href="/blog/tag/tutorials" 
                      className={`
                        text-sm transition-colors relative group/link inline-flex items-center
                        ${isActive 
                          ? 'dark:text-[#8fffaa] text-[#006b42] font-semibold' 
                          : 'hover:dark:text-[#8fffaa] hover:text-[#006b42]'
                        }
                      `}
                    >
                      {/* Dot decorator with active state */}
                      <span className={`
                        w-1 h-1 rounded-full absolute -left-4 transition-colors duration-300
                        ${isActive 
                          ? 'dark:bg-[#8fffaa] bg-[#006b42] dark:shadow-[0_0_5px_2px_rgba(143,255,170,0.3)]' 
                          : 'dark:bg-[#8fffaa]/30 bg-[#006b42]/30 group-hover/link:dark:bg-[#8fffaa] group-hover/link:bg-[#006b42]'
                        }
                      `}></span>
                      
                      <span>Tutorials</span>
                      
                      {/* Permanent underline for active state, hover underline for inactive */}
                      <span className={`
                        absolute -bottom-0.5 left-0 w-full h-[1px] 
                        dark:bg-gradient-to-r dark:from-[#8fffaa]/0 dark:via-[#8fffaa]/70 dark:to-[#8fffaa]/0 
                        bg-gradient-to-r from-[#006b42]/0 via-[#006b42]/70 to-[#006b42]/0 
                        transition-transform duration-300 origin-left
                        ${isActive 
                          ? 'scale-x-100' 
                          : 'scale-x-0 group-hover/link:scale-x-100'
                        }
                      `}></span>
                    </Link>
                  );
                })()}
              </li>
            </ul>
          </div>
          
          {/* Column 4: Connect */}
          <div className="space-y-4 rounded-lg p-4 dark:bg-black/40 bg-white/40 backdrop-blur-sm border dark:border-[#8fffaa]/5 border-[#006b42]/5 shadow-sm transition-all duration-300 hover:dark:shadow-[0_4px_12px_-2px_rgba(143,255,170,0.25)] hover:shadow-[0_4px_12px_-2px_rgba(0,107,66,0.2)] dark:hover:border-[#8fffaa]/20 hover:border-[#006b42]/20 group relative overflow-hidden">
            {/* Decorative corner accent - same as first column */}
            <div className="absolute top-0 right-0 w-12 h-12 dark:bg-gradient-to-bl dark:from-[#8fffaa]/5 dark:to-transparent bg-gradient-to-bl from-[#006b42]/3 to-transparent rounded-bl-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <h3 className="text-sm font-semibold uppercase tracking-wider font-mono dark:text-[#8fffaa] text-[#006b42]">
              <span className="flex items-center gap-2 relative group">
                <div className="h-1.5 w-1.5 rounded-full dark:bg-[#8fffaa] bg-[#006b42] animate-pulse animation-delay-600"></div>
                <span className="relative">
                  Connect
                  <span className="absolute -bottom-1 left-0 w-full h-[1px] dark:bg-gradient-to-r dark:from-[#8fffaa]/70 dark:via-[#8fffaa]/50 dark:to-[#8fffaa]/70 bg-gradient-to-r from-[#006b42]/70 via-[#006b42]/50 to-[#006b42]/70 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </span>
              </span>
            </h3>
            <div className="flex space-x-4">
              <Link 
                href="https://github.com/muaathrifath" 
                target="_blank" 
                rel="me"
                className="p-2 rounded-full transition-colors dark:hover:bg-[#8fffaa]/10 hover:bg-[#006b42]/10 group"
                aria-label="GitHub"
              >
                <IconBrandGithub className="h-5 w-5 text-muted-foreground group-hover:dark:text-[#8fffaa] group-hover:text-[#006b42]" stroke={1.5} />
              </Link>
              <Link
                href="https://linkedin.com/in/muaathrifath"
                target="_blank" 
                rel="me"
                className="p-2 rounded-full transition-colors dark:hover:bg-[#8fffaa]/10 hover:bg-[#006b42]/10 group"
                aria-label="LinkedIn"
              >
                <IconBrandLinkedin className="h-5 w-5 text-muted-foreground group-hover:dark:text-[#8fffaa] group-hover:text-[#006b42]" stroke={1.5} />
              </Link>
              <Link
                href="https://twitter.com/MuaathRifath"
                target="_blank"
                rel="me"
                className="p-2 rounded-full transition-colors dark:hover:bg-[#8fffaa]/10 hover:bg-[#006b42]/10 group"
                aria-label="Twitter"
              >
                <IconBrandX className="h-5 w-5 text-muted-foreground group-hover:dark:text-[#8fffaa] group-hover:text-[#006b42]" stroke={1.5} />
              </Link>
              <Link
                href="mailto:contact@muaathrifath.tech"
                className="p-2 rounded-full transition-colors dark:hover:bg-[#8fffaa]/10 hover:bg-[#006b42]/10 group"
                aria-label="Email"
              >
                <IconMail className="h-5 w-5 text-muted-foreground group-hover:dark:text-[#8fffaa] group-hover:text-[#006b42]" stroke={1.5} />
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              Feel free to reach out for collaborations, questions, or just to say hello!
            </p>
          </div>
        </div>
        
        {/* Bottom copyright and tech stack mention */}
        <div className="mt-10 pt-6 border-t dark:border-[#8fffaa]/10 border-[#006b42]/10 flex flex-col md:flex-row justify-between items-center rounded-lg p-6 dark:bg-gradient-to-r dark:from-black/50 dark:via-black/60 dark:to-black/50 bg-gradient-to-r from-white/50 via-white/60 to-white/50 backdrop-blur-sm shadow-sm relative overflow-hidden border-2 transition-all duration-300 hover:dark:border-[#8fffaa]/20 hover:border-[#006b42]/20 hover:dark:shadow-[0_4px_12px_-2px_rgba(143,255,170,0.2)] hover:shadow-[0_4px_12px_-2px_rgba(0,107,66,0.15)]">
          {/* Decorative circuit element */}
          <div className="absolute top-0 left-1/3 right-1/3 h-[1px] dark:bg-gradient-to-r dark:from-transparent dark:via-[#8fffaa]/30 dark:to-transparent bg-gradient-to-r from-transparent via-[#006b42]/20 to-transparent"></div>
          <div className="absolute bottom-0 left-1/4 right-1/4 h-[1px] dark:bg-gradient-to-r dark:from-transparent dark:via-[#8fffaa]/20 dark:to-transparent bg-gradient-to-r from-transparent via-[#006b42]/10 to-transparent"></div>
          <div className="absolute left-0 top-1/3 bottom-1/3 w-[1px] dark:bg-gradient-to-b dark:from-transparent dark:via-[#8fffaa]/20 dark:to-transparent bg-gradient-to-b from-transparent via-[#006b42]/10 to-transparent"></div>
          <div className="absolute right-0 top-1/4 bottom-1/4 w-[1px] dark:bg-gradient-to-b dark:from-transparent dark:via-[#8fffaa]/20 dark:to-transparent bg-gradient-to-b from-transparent via-[#006b42]/10 to-transparent"></div>
          
          <p className="text-xs text-muted-foreground font-mono relative group flex items-center">
            <span className="absolute -left-2 top-1/2 h-1 w-1 rounded-full dark:bg-[#8fffaa]/40 bg-[#006b42]/40 animate-pulse hidden md:block dark:shadow-[0_0_3px_rgba(143,255,170,0.4)]"></span>
            &copy; {currentYear} Muaath Rifath. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 text-xs text-muted-foreground font-mono flex items-center gap-2 relative">
            <span className="absolute -right-2 top-1/2 h-1 w-1 rounded-full dark:bg-[#8fffaa]/40 bg-[#006b42]/40 animate-pulse hidden md:block dark:shadow-[0_0_3px_rgba(143,255,170,0.4)]"></span>
            <span>Built with</span>
            <span className="relative group hover:dark:text-[#8fffaa] hover:text-[#006b42] transition-colors duration-300">
              Next.js
              <span className="absolute -bottom-0.5 left-0 w-full h-[0.5px] dark:bg-gradient-to-r dark:from-[#8fffaa]/0 dark:via-[#8fffaa]/70 dark:to-[#8fffaa]/0 bg-gradient-to-r from-[#006b42]/0 via-[#006b42]/70 to-[#006b42]/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </span>
            <span>&</span>
            <span className="relative group hover:dark:text-[#8fffaa] hover:text-[#006b42] transition-colors duration-300">
              Tailwind CSS
              <span className="absolute -bottom-0.5 left-0 w-full h-[0.5px] dark:bg-gradient-to-r dark:from-[#8fffaa]/0 dark:via-[#8fffaa]/70 dark:to-[#8fffaa]/0 bg-gradient-to-r from-[#006b42]/0 via-[#006b42]/70 to-[#006b42]/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
