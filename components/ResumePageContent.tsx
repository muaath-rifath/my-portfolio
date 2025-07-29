'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { PageEntryWrapper } from '@/components/animated/PageEntryWrapper';
import { AnimatedSectionTitle } from '@/components/animated/AnimatedSectionTitle';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { fadeInUp, fadeInLeft, fadeInRight } from '@/lib/animations';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download, FileText, Loader2, Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

export default function ResumePageContent() {
  const [isLoading, setIsLoading] = useState(true);

  const headerAnimation = useScrollAnimation({ threshold: 0.1 });
  const contentAnimation = useScrollAnimation({ threshold: 0.1 });
  const downloadAnimation = useScrollAnimation({ threshold: 0.1 });

  useEffect(() => {
    // Simulate loading time for animations
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleDownloadPDF = () => {
    const link = document.createElement('a');
    link.href = '/resume/resume.pdf';
    link.download = 'Muaath_Rifath_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const ResumeContent = () => (
    <div className="resume-content max-w-none">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-border">
        <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 dark:text-white text-[#006b42]">
          Mohamed Muaath Rifath L M
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground mb-3 sm:mb-4">Full-Stack Developer</p>
        
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
          <a href="mailto:me@muaathrifath.tech" className="flex items-center gap-1 hover:text-primary transition-colors">
            <Mail className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="break-all">me@muaathrifath.tech</span>
          </a>
          <a href="tel:+918883735079" className="flex items-center gap-1 hover:text-primary transition-colors">
            <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
            +91 88837 35079
          </a>
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
            Chennai, India
          </span>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground mt-2">
          <Link href="/" className="flex items-center gap-1 hover:text-primary transition-colors">
            <Globe className="h-3 w-3 sm:h-4 sm:w-4" />
            muaathrifath.tech
          </Link>
          <Link href="https://linkedin.com/in/muaath-rifath" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary transition-colors">
            <Linkedin className="h-3 w-3 sm:h-4 sm:w-4" />
            linkedin.com/in/muaath-rifath
          </Link>
          <Link href="https://github.com/muaath-rifath" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary transition-colors">
            <Github className="h-3 w-3 sm:h-4 sm:w-4" />
            github.com/muaath-rifath
          </Link>
        </div>
      </div>

      {/* Summary */}
      <section className="mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 dark:text-[#8fffaa] text-[#006b42] border-b border-border pb-1 sm:pb-2">
          Summary
        </h2>
        <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
          Full-Stack Developer specializing in the Next.js ecosystem. Proficient in building responsive, 
          scalable web applications using TypeScript, Next.js/React, and Tailwind CSS. Experienced in 
          developing robust backends with Next.js/Node.js, Prisma, and PostgreSQL.
        </p>
      </section>

      {/* Projects */}
      <section className="mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 dark:text-[#8fffaa] text-[#006b42] border-b border-border pb-1 sm:pb-2">
          Projects
        </h2>
        
        <div className="space-y-4 sm:space-y-6">
          {/* Portfolio */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 dark:text-white text-[#004d30]">Portfolio</h3>
            <ul className="space-y-1 text-muted-foreground ml-3 sm:ml-4 text-sm sm:text-base">
              <li className="flex"><span className="mr-1 sm:mr-2 mt-0.5 text-xs">•</span><span><strong className="dark:text-[#8fffaa] text-[#006b42]">Tech Stack:</strong> Next.js, Three.js, React Three Fiber, Framer Motion, Firestore, Tailwind CSS.</span></li>
              <li className="flex"><span className="mr-1 sm:mr-2 mt-0.5 text-xs">•</span><span><strong className="dark:text-[#8fffaa] text-[#006b42]">3D Experience:</strong> Interactive 3D models using Three.js/React Three Fiber.</span></li>
              <li className="flex"><span className="mr-1 sm:mr-2 mt-0.5 text-xs">•</span><span><strong className="dark:text-[#8fffaa] text-[#006b42]">Animations:</strong> Fluid page transitions with Framer Motion for enhanced UX.</span></li>
              <li className="flex"><span className="mr-1 sm:mr-2 mt-0.5 text-xs">•</span><span><strong className="dark:text-[#8fffaa] text-[#006b42]">CMS:</strong> Firestore integration for contact submissions with dashboard.</span></li>
            </ul>
          </div>

          {/* Sol - Smart Home Assistant */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 dark:text-white text-[#004d30]">Sol - Smart Home Assistant</h3>
            <ul className="space-y-1 text-muted-foreground ml-3 sm:ml-4 text-sm sm:text-base">
              <li className="flex"><span className="mr-1 sm:mr-2 mt-0.5 text-xs">•</span><span><strong className="dark:text-[#8fffaa] text-[#006b42]">Tech Stack:</strong> Next.js, NextAuth, Prisma, PostgreSQL, Gemini 2.0 Flash, MQTT, MCP.</span></li>
              <li className="flex"><span className="mr-1 sm:mr-2 mt-0.5 text-xs">•</span><span><strong className="dark:text-[#8fffaa] text-[#006b42]">AI Control:</strong> Natural language commands using Google's Gemini 2.0 Flash model.</span></li>
              <li className="flex"><span className="mr-1 sm:mr-2 mt-0.5 text-xs">•</span><span><strong className="dark:text-[#8fffaa] text-[#006b42]">Backend:</strong> Secure authentication with NextAuth and device management with Prisma.</span></li>
              <li className="flex"><span className="mr-1 sm:mr-2 mt-0.5 text-xs">•</span><span><strong className="dark:text-[#8fffaa] text-[#006b42]">Real-Time:</strong> MQTT and WebSockets for low-latency IoT device communication.</span></li>
              <li className="flex"><span className="mr-1 sm:mr-2 mt-0.5 text-xs">•</span><span><strong className="dark:text-[#8fffaa] text-[#006b42]">AI Integration:</strong> Model Context Protocol (MCP) for system-level AI connections.</span></li>
            </ul>
          </div>

          {/* Threble - Social Media Platform */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 dark:text-white text-[#004d30]">Threble - Social Media Platform</h3>
            <ul className="space-y-1 text-muted-foreground ml-3 sm:ml-4 text-sm sm:text-base">
              <li className="flex"><span className="mr-1 sm:mr-2 mt-0.5 text-xs">•</span><span><strong className="dark:text-[#8fffaa] text-[#006b42]">Tech Stack:</strong> Next.js, TypeScript, NextAuth, Prisma, PostgreSQL, Azure Blob Storage.</span></li>
              <li className="flex"><span className="mr-1 sm:mr-2 mt-0.5 text-xs">•</span><span><strong className="dark:text-[#8fffaa] text-[#006b42]">Backend:</strong> Robust architecture for user data, posts, and social graphs.</span></li>
              <li className="flex"><span className="mr-1 sm:mr-2 mt-0.5 text-xs">•</span><span><strong className="dark:text-[#8fffaa] text-[#006b42]">Authentication:</strong> Secure credential-based user management with NextAuth.</span></li>
              <li className="flex"><span className="mr-1 sm:mr-2 mt-0.5 text-xs">•</span><span><strong className="dark:text-[#8fffaa] text-[#006b42]">Storage:</strong> Azure Blob Storage for scalable media handling.</span></li>
              <li className="flex"><span className="mr-1 sm:mr-2 mt-0.5 text-xs">•</span><span><strong className="dark:text-[#8fffaa] text-[#006b42]">UI/UX:</strong> Responsive interface with Tailwind CSS across all devices.</span></li>
            </ul>
          </div>

          {/* HR Dashboard */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 dark:text-white text-[#004d30]">HR Dashboard - Employee Management System</h3>
            <ul className="space-y-1 text-muted-foreground ml-3 sm:ml-4 text-sm sm:text-base">
              <li className="flex"><span className="mr-1 sm:mr-2 mt-0.5 text-xs">•</span><span><strong className="dark:text-[#8fffaa] text-[#006b42]">Tech Stack:</strong> Next.js 15, TypeScript, Zustand, Chart.js, Tailwind CSS, Radix UI.</span></li>
              <li className="flex"><span className="mr-1 sm:mr-2 mt-0.5 text-xs">•</span><span><strong className="dark:text-[#8fffaa] text-[#006b42]">Frontend Architecture:</strong> Custom hooks pattern for reusable logic, modular component structure with TypeScript integration.</span></li>
              <li className="flex"><span className="mr-1 sm:mr-2 mt-0.5 text-xs">•</span><span><strong className="dark:text-[#8fffaa] text-[#006b42]">Data Visualization:</strong> Interactive charts and analytics displaying department distribution, performance ratings, and HR metrics.</span></li>
              <li className="flex"><span className="mr-1 sm:mr-2 mt-0.5 text-xs">•</span><span><strong className="dark:text-[#8fffaa] text-[#006b42]">UI/UX:</strong> Responsive design with dark/light theme support, advanced search/filtering, and bookmark functionality.</span></li>
              <li className="flex"><span className="mr-1 sm:mr-2 mt-0.5 text-xs">•</span><span><strong className="dark:text-[#8fffaa] text-[#006b42]">State Management:</strong> Zustand for global state with local storage persistence and optimized re-rendering.</span></li>
            </ul>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 dark:text-[#8fffaa] text-[#006b42] border-b border-border pb-1 sm:pb-2">
          Certifications
        </h2>
        <ul className="space-y-1 sm:space-y-2 text-muted-foreground ml-3 sm:ml-4 text-sm sm:text-base">
          <li className="flex"><span className="mr-1 sm:mr-2 mt-0.5 text-xs">•</span><span>Career Essentials in GitHub Professional Certificate – <em>GitHub & LinkedIn</em></span></li>
          <li className="flex"><span className="mr-1 sm:mr-2 mt-0.5 text-xs">•</span><span>Career Essentials in Software Development – <em>Microsoft & LinkedIn</em></span></li>
          <li className="flex"><span className="mr-1 sm:mr-2 mt-0.5 text-xs">•</span><span>MCP: Build Rich-Context AI Apps – <em>DeepLearning.AI</em></span></li>
        </ul>
      </section>

      {/* Skills */}
      <section className="mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 dark:text-[#8fffaa] text-[#006b42] border-b border-border pb-1 sm:pb-2">
          Skills
        </h2>
        <div className="space-y-2 sm:space-y-3 text-muted-foreground text-sm sm:text-base">
          <div>
            <span className="font-semibold dark:text-[#8fffaa] text-[#006b42]">Programming Languages:</span> JavaScript/TypeScript, HTML/CSS, C/C++, Arduino, SQL, Python, MicroPython
          </div>
          <div>
            <span className="font-semibold dark:text-[#8fffaa] text-[#006b42]">Frontend:</span> Next.js/React.js, Three.js/React Three Fiber, Tailwind CSS, Redux, Zustand
          </div>
          <div>
            <span className="font-semibold dark:text-[#8fffaa] text-[#006b42]">Backend:</span> Next.js, Node.js, Prisma, PostgreSQL, NextAuth
          </div>
          <div>
            <span className="font-semibold dark:text-[#8fffaa] text-[#006b42]">Tools & Platforms:</span> Git, GitHub, VSCode, Linux, Vercel, Azure, Firebase, Firestore
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 dark:text-[#8fffaa] text-[#006b42] border-b border-border pb-1 sm:pb-2">
          Education
        </h2>
        <div className="text-muted-foreground text-sm sm:text-base">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1">
            <span className="font-semibold dark:text-white text-[#004d30]">Aalim Muhammed Salegh College of Engineering</span>
            <span className="text-xs sm:text-sm italic mt-1 sm:mt-0">2022 – 2026</span>
          </div>
          <div className="text-xs sm:text-sm italic mb-1">Chennai, India</div>
          <div>B.E. in Electronics & Communication.</div>
        </div>
      </section>

      {/* Achievements */}
      <section className="mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 dark:text-[#8fffaa] text-[#006b42] border-b border-border pb-1 sm:pb-2">
          Achievements
        </h2>
        <ul className="space-y-1 sm:space-y-2 text-muted-foreground ml-3 sm:ml-4 text-sm sm:text-base">
          <li className="flex"><span className="mr-1 sm:mr-2 mt-0.5 text-xs">•</span><span><strong className="dark:text-[#8fffaa] text-[#006b42]">1st Prize</strong> - Project Expo at T.J.S. Engineering College for Smart Home Assistant.</span></li>
          <li className="flex"><span className="mr-1 sm:mr-2 mt-0.5 text-xs">•</span><span><strong className="dark:text-[#8fffaa] text-[#006b42]">1st Prize</strong> - Project Expo at GRT Institute for DTMF-controlled RoboCar.</span></li>
        </ul>
      </section>
    </div>
  );

  return (
    <PageEntryWrapper>
      <section className="relative container mx-auto pt-16 sm:pt-20 lg:pt-16 min-h-screen px-4 sm:px-6 lg:px-8">
        {/* Circuit trace decorations - hide on mobile for cleaner look */}
        <div className="absolute inset-0 z-0 pointer-events-none hidden sm:block">
          <div className="absolute top-40 left-12 h-[1px] w-16 dark:bg-[#8fffaa]/20 bg-[#006b42]/20"></div>
          <div className="absolute bottom-1/4 right-10 h-[1px] w-24 dark:bg-[#8fffaa]/20 bg-[#006b42]/20"></div>
          <div className="absolute top-1/3 right-1/4 h-2 w-2 rounded-full dark:bg-[#8fffaa]/30 bg-[#006b42]/30"></div>
          <div className="absolute bottom-1/3 left-1/4 h-1.5 w-1.5 rounded-full dark:bg-[#8fffaa]/20 bg-[#006b42]/20"></div>
          <div className="absolute top-1/2 left-1/3 h-[1px] w-12 dark:bg-[#8fffaa]/15 bg-[#006b42]/15 rotate-45"></div>
          <div className="absolute bottom-1/2 right-1/3 h-[1px] w-8 dark:bg-[#8fffaa]/15 bg-[#006b42]/15 -rotate-45"></div>
        </div>
        
        {/* Circuit overlay for enhanced tech aesthetic */}
        <div className="absolute inset-0 bg-[url('/assets/circuit-overlay.svg')] bg-no-repeat bg-cover opacity-10 mix-blend-overlay z-0 pointer-events-none hidden sm:block"></div>

        {/* Header with circuit-inspired styling */}
        <div 
          className="relative z-10 mb-4 sm:mb-6 lg:mb-8"
          ref={headerAnimation.ref as React.RefObject<HTMLDivElement>}
          style={fadeInUp(headerAnimation.isVisible, 0)}
        >
          <AnimatedSectionTitle>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-mono tracking-tighter relative inline-block">
              <span className="dark:text-white text-[#006b42]">Resume</span>
              <span className="absolute left-0 bottom-0 h-[2px] w-full dark:bg-[#8fffaa]/50 bg-[#006b42]/50"></span>
            </h1>
            <p className="mt-2 sm:mt-4 text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl">
              View my professional background, skills, and experience. Download the PDF version for your records.
            </p>
          </AnimatedSectionTitle>
        </div>

        {/* Download section */}
        <div 
          className="relative z-10 mb-4 sm:mb-6 lg:mb-8"
          ref={downloadAnimation.ref as React.RefObject<HTMLDivElement>}
          style={fadeInRight(downloadAnimation.isVisible, 200)}
        >
          <Card className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center justify-between p-4 sm:p-6 backdrop-blur-sm bg-background/90 border-border">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-sm sm:text-base">Download Resume</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">Get the latest PDF version</p>
              </div>
            </div>
            <Button 
              onClick={handleDownloadPDF}
              className="dark:border-[#8fffaa]/30 border-[#006b42]/30 dark:bg-[#111]/80 bg-white/80 dark:text-[#8fffaa] text-[#006b42] dark:hover:bg-[#8fffaa]/10 hover:bg-[#006b42]/10 transition-all duration-300 transform hover:scale-105 shadow-lg border text-xs sm:text-sm"
            >
              <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              Download PDF
            </Button>
          </Card>
        </div>

        {/* Resume content */}
        <div 
          className="relative z-10 mb-8 sm:mb-12 lg:mb-16"
          ref={contentAnimation.ref as React.RefObject<HTMLDivElement>}
          style={fadeInLeft(contentAnimation.isVisible, 400)}
        >
          <Card className="p-3 sm:p-4 md:p-6 lg:p-8 backdrop-blur-sm bg-background/90 border-border">
            {isLoading ? (
              <div className="flex items-center justify-center h-64 sm:h-96">
                <div className="text-center">
                  <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 animate-spin text-primary mx-auto mb-4" />
                  <p className="text-muted-foreground text-sm sm:text-base">Loading resume...</p>
                </div>
              </div>
            ) : (
              <ResumeContent />
            )}
          </Card>
        </div>

        {/* Bottom circuit decoration */}
        <div className="relative z-10 w-full mt-8 mb-8 hidden md:block">
          <div className="absolute left-1/4 bottom-0 w-16 h-[1px] dark:bg-[#8fffaa]/20 bg-[#006b42]/20"></div>
          <div className="absolute right-1/4 bottom-0 w-16 h-[1px] dark:bg-[#8fffaa]/20 bg-[#006b42]/20"></div>
          <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 w-2 h-2 rounded-full dark:bg-[#8fffaa]/30 bg-[#006b42]/30"></div>
        </div>
      </section>
    </PageEntryWrapper>
  );
}
