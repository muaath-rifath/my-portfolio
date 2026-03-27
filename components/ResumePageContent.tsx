'use client';

import React from 'react';
import Link from 'next/link';
import { PageEntryWrapper } from '@/components/animated/PageEntryWrapper';
import { AnimatedSectionTitle } from '@/components/animated/AnimatedSectionTitle';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { fadeInUp, fadeInLeft, fadeInRight } from '@/lib/animations';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download, FileText, Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

export default function ResumePageContent() {
  const headerAnimation = useScrollAnimation({ threshold: 0.1 });
  const contentAnimation = useScrollAnimation({ threshold: 0.1 });
  const downloadAnimation = useScrollAnimation({ threshold: 0.1 });

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
        <p className="text-base sm:text-lg text-zinc-700 dark:text-zinc-100 mb-3 sm:mb-4">Full-Stack Developer</p>
        
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 text-xs sm:text-sm text-zinc-700 dark:text-zinc-100">
          <a href="mailto:me@muaathrifath.me" className="flex items-center gap-1 hover:text-[#006b42] dark:hover:text-[#8fffaa] transition-colors">
            <Mail className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="break-all">me@muaathrifath.me</span>
          </a>
          <a href="tel:+918883735079" className="flex items-center gap-1 hover:text-[#006b42] dark:hover:text-[#8fffaa] transition-colors">
            <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
            +91 88837 35079
          </a>
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
            Chennai, India
          </span>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 text-xs sm:text-sm text-zinc-700 dark:text-zinc-100 mt-2">
          <Link href="/" className="flex items-center gap-1 hover:text-[#006b42] dark:hover:text-[#8fffaa] transition-colors">
            <Globe className="h-3 w-3 sm:h-4 sm:w-4" />
            muaathrifath.me
          </Link>
          <Link href="https://linkedin.com/in/muaath-rifath" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-[#006b42] dark:hover:text-[#8fffaa] transition-colors">
            <Linkedin className="h-3 w-3 sm:h-4 sm:w-4" />
            linkedin.com/in/muaath-rifath
          </Link>
          <Link href="https://github.com/muaath-rifath" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-[#006b42] dark:hover:text-[#8fffaa] transition-colors">
            <Github className="h-3 w-3 sm:h-4 sm:w-4" />
            github.com/muaath-rifath
          </Link>
        </div>
      </div>

      {/* Summary */}
      <section className="mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 dark:text-[#8fffaa] text-[#006b42] border-b border-border pb-1 sm:pb-2">
          Professional Summary
        </h2>
        <p className="text-zinc-700 dark:text-zinc-100 leading-relaxed text-sm sm:text-base">
          Fullstack developer with production experience building and shipping an AI-powered wellness platform
          end to end – from database design and FastAPI backend to a complete Next.js 15 frontend. Delivered
          authentication, real-time video sessions, payment processing, and async AI pipelines. Strong
          fundamentals in system design, security, and cloud deployment.
        </p>
      </section>

      {/* Experience */}
      <section className="mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 dark:text-[#8fffaa] text-[#006b42] border-b border-border pb-1 sm:pb-2">
          Experience
        </h2>
        <div className="space-y-4 sm:space-y-6">
          <div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1">
              <h3 className="text-base sm:text-lg font-semibold dark:text-white text-[#004d30]">Introspect Labs</h3>
              <span className="text-xs sm:text-sm italic mt-1 sm:mt-0">Oct 2025 – Present</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
              <span className="text-sm italic text-zinc-700 dark:text-zinc-100">Full Stack Developer</span>
              <span className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-100">Remote – Bengaluru, India</span>
            </div>
            <ul className="space-y-1 text-zinc-700 dark:text-zinc-100 ml-3 sm:ml-4 text-sm sm:text-base">
              <li className="flex"><span className="mr-1 sm:mr-2 mt-0.5 text-xs">•</span><span>Architected therapist consultation platform from scratch – professional profiles, session booking with server-side pricing breakdown, LiveKit video sessions, and webhook-driven attendance tracking with 75% threshold missed-session refund logic (1,336 lines across 11 files).</span></li>
              <li className="flex"><span className="mr-1 sm:mr-2 mt-0.5 text-xs">•</span><span>Built AI journaling pipeline – rant-to-journal articulation via LLM, AES-256-GCM encryption at rest, cursor-style inline editing with custom Tiptap diff marks, crisis detection, and AI visualization via RunwayML/Kling.</span></li>
              <li className="flex"><span className="mr-1 sm:mr-2 mt-0.5 text-xs">•</span><span>Developed complete Next.js 15 frontend (185 commits) with Zustand state management, Server/Client component architecture for SEO, draggable picture-in-picture video UI, and presigned S3 upload flows.</span></li>
              <li className="flex"><span className="mr-1 sm:mr-2 mt-0.5 text-xs">•</span><span>Integrated Razorpay for Autopay subscriptions and per-session payments with idempotent webhook handling, HMAC-SHA256 signature verification, and airline-model slot locking to prevent phantom bookings.</span></li>
              <li className="flex"><span className="mr-1 sm:mr-2 mt-0.5 text-xs">•</span><span>Replaced OTP-based authentication with Zitadel OIDC across the full stack; implemented automatic JWT token refresh with pre-expiry buffer, federated logout, and per-request user sync.</span></li>
              <li className="flex"><span className="mr-1 sm:mr-2 mt-0.5 text-xs">•</span><span>Set up CI/CD with GitHub Actions (self-hosted runner), Docker, Nginx reverse proxy, Let&apos;s Encrypt SSL; authored 30+ Alembic database migrations.</span></li>
            </ul>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 dark:text-[#8fffaa] text-[#006b42] border-b border-border pb-1 sm:pb-2">
          Projects
        </h2>
        
        <div className="space-y-4 sm:space-y-6">
          {/* Zylert */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 dark:text-white text-[#004d30]">Zylert – AI Notification Manager <span className="text-sm font-normal italic text-zinc-700 dark:text-zinc-100">(In Progress)</span> <span className="text-sm font-normal text-zinc-600 dark:text-zinc-100">– Kotlin, Android SDK 36, Room, Node.js, Express.js, OpenAI SDK</span></h3>
            <ul className="space-y-1 text-zinc-700 dark:text-zinc-100 ml-3 sm:ml-4 text-sm sm:text-base">
              <li className="flex"><span className="mr-1 sm:mr-2 mt-0.5 text-xs">•</span><span>AI-powered notification triaging system that classifies smartphone notifications into priority tiers using GPT-4, generates summaries, and provides a chat interface; expected to reduce notification fatigue by filtering low-priority alerts.</span></li>
              <li className="flex"><span className="mr-1 sm:mr-2 mt-0.5 text-xs">•</span><span>Three-tier classification (Priority / Moderate / Unwanted) via Azure OpenAI (gpt-4.1-mini) with prompt-engineered rules, batch processing, and Zod-validated I/O; Android client uses Room + Kotlin Coroutines; Express 5 backend with clean service/route separation.</span></li>
            </ul>
          </div>

          {/* Sol - Smart Home Assistant */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 dark:text-white text-[#004d30]">Sol – Smart Home Assistant <span className="text-sm font-normal text-zinc-600 dark:text-zinc-100">– Next.js, Prisma, PostgreSQL, Gemini 2.0 Flash, MQTT, MCP</span></h3>
            <ul className="space-y-1 text-zinc-700 dark:text-zinc-100 ml-3 sm:ml-4 text-sm sm:text-base">
              <li className="flex"><span className="mr-1 sm:mr-2 mt-0.5 text-xs">•</span><span>Natural-language smart home control with real-time device updates via MQTT/WebSockets and secure authentication; PWA with offline-first service worker and WebSocket device sync (1st Prize, T.J.S. Engineering College Project Expo).</span></li>
            </ul>
          </div>

          {/* Threble - Social Media Platform */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 dark:text-white text-[#004d30]">Threble – Social Media Platform <span className="text-sm font-normal text-zinc-600 dark:text-zinc-100">– Next.js, TypeScript, NextAuth, Prisma, PostgreSQL, Azure Blob Storage</span></h3>
            <ul className="space-y-1 text-zinc-700 dark:text-zinc-100 ml-3 sm:ml-4 text-sm sm:text-base">
              <li className="flex"><span className="mr-1 sm:mr-2 mt-0.5 text-xs">•</span><span>Open-source social platform for the tech community with scalable media handling and robust social graph (GPL v3).</span></li>
              <li className="flex"><span className="mr-1 sm:mr-2 mt-0.5 text-xs">•</span><span>LinkedIn-style connection graph with 4-state tracking; community roles (USER/MODERATOR/ADMIN) with RSVP events, join-request approval, 20+ notification types with real-time badge counts, and 20+ Prisma models with compound indexes.</span></li>
            </ul>
          </div>

          {/* Portfolio */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 dark:text-white text-[#004d30]">Portfolio <span className="text-sm font-normal text-zinc-600 dark:text-zinc-100">– Next.js, Three.js, React Three Fiber, Framer Motion, Firestore, Tailwind CSS</span></h3>
            <ul className="space-y-1 text-zinc-700 dark:text-zinc-100 ml-3 sm:ml-4 text-sm sm:text-base">
              <li className="flex"><span className="mr-1 sm:mr-2 mt-0.5 text-xs">•</span><span>Interactive 3D portfolio with Three.js scene rendering, smooth page transitions, Firestore-backed contact form secured with reCAPTCHA v3, and SSR-safe dark/light mode via next-themes.</span></li>
            </ul>
          </div>

          {/* HR Dashboard */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 dark:text-white text-[#004d30]">HR Dashboard – Employee Management <span className="text-sm font-normal text-zinc-600 dark:text-zinc-100">– Next.js 15, TypeScript, Zustand, Chart.js, Tailwind CSS, Radix UI</span></h3>
            <ul className="space-y-1 text-zinc-700 dark:text-zinc-100 ml-3 sm:ml-4 text-sm sm:text-base">
              <li className="flex"><span className="mr-1 sm:mr-2 mt-0.5 text-xs">•</span><span>Employee management dashboard with attendance tracking, leave approval, performance reviews, Chart.js analytics, dual navigation (desktop/mobile), themeable UI, and persisted global state; live on Vercel.</span></li>
            </ul>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 dark:text-[#8fffaa] text-[#006b42] border-b border-border pb-1 sm:pb-2">
          Certifications
        </h2>
        <ul className="space-y-1 sm:space-y-2 text-zinc-700 dark:text-zinc-100 ml-3 sm:ml-4 text-sm sm:text-base">
          <li className="flex"><span className="mr-1 sm:mr-2 mt-0.5 text-xs">•</span><span>Docker Foundations Professional Certificate – <em>Docker</em></span></li>
          <li className="flex"><span className="mr-1 sm:mr-2 mt-0.5 text-xs">•</span><span>Career Essentials in GitHub – <em>GitHub</em></span></li>
          <li className="flex"><span className="mr-1 sm:mr-2 mt-0.5 text-xs">•</span><span>MCP: Build Rich-Context AI Apps – <em>DeepLearning.AI</em></span></li>
          <li className="flex"><span className="mr-1 sm:mr-2 mt-0.5 text-xs">•</span><span>Career Essentials in Software Development – <em>Microsoft</em></span></li>
        </ul>
      </section>

      {/* Skills */}
      <section className="mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 dark:text-[#8fffaa] text-[#006b42] border-b border-border pb-1 sm:pb-2">
          Skills
        </h2>
        <div className="space-y-2 sm:space-y-3 text-zinc-700 dark:text-zinc-100 text-sm sm:text-base">
          <div>
            <span className="font-semibold dark:text-[#8fffaa] text-[#006b42]">Languages:</span> TypeScript, JavaScript, Python, SQL, Kotlin, HTML/CSS, C/C++
          </div>
          <div>
            <span className="font-semibold dark:text-[#8fffaa] text-[#006b42]">Frontend:</span> React, Next.js, Tailwind CSS, Zustand, Three.js, Tiptap, Framer Motion
          </div>
          <div>
            <span className="font-semibold dark:text-[#8fffaa] text-[#006b42]">Backend:</span> FastAPI, Node.js, Express.js, PostgreSQL, MongoDB, Prisma, Celery, Redis, Alembic
          </div>
          <div>
            <span className="font-semibold dark:text-[#8fffaa] text-[#006b42]">DevOps & Tools:</span> Docker, Git, GitHub Actions, Nginx, Linux, AWS (S3, SES), Azure, LiveKit, Razorpay
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 dark:text-[#8fffaa] text-[#006b42] border-b border-border pb-1 sm:pb-2">
          Education
        </h2>
        <div className="text-zinc-700 dark:text-zinc-100 text-sm sm:text-base">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1">
            <span className="font-semibold dark:text-white text-[#004d30]">Aalim Muhammed Salegh College of Engineering</span>
            <span className="text-xs sm:text-sm italic mt-1 sm:mt-0">2022 – 2026</span>
          </div>
          <div className="text-xs sm:text-sm italic mb-1">Chennai, India</div>
          <div>B.E. in Electronics & Communication Engineering</div>
        </div>
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
            <p className="mt-2 sm:mt-4 text-sm sm:text-base lg:text-lg text-zinc-700 dark:text-zinc-100 max-w-2xl">
              View my professional background, skills, and experience. Download the PDF version for your records.
            </p>
          </AnimatedSectionTitle>
        </div>

        {/* Download section */}
        <div 
          className="relative z-10 mb-4 sm:mb-6 lg:mb-8"
          ref={downloadAnimation.ref as React.RefObject<HTMLDivElement>}
          style={fadeInRight(downloadAnimation.isVisible, 0)}
        >
          <Card className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center justify-between p-4 sm:p-6 backdrop-blur-sm bg-background/90 border-border">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-sm sm:text-base">Download Resume</h3>
                <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-100">Get the latest PDF version</p>
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
          style={fadeInLeft(contentAnimation.isVisible, 0)}
        >
          <Card className="p-3 sm:p-4 md:p-6 lg:p-8 backdrop-blur-sm bg-background/90 border-border">
            <ResumeContent />
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
