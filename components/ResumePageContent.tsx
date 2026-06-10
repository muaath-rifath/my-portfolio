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
    link.download = 'Mohamed_Muaath_Rifath_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const ResumeContent = () => (
    <div className="resume-content max-w-none">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-border">
        <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 dark:text-white text-[#006b42]">
          Mohamed Muaath Rifath
        </h1>
        <p className="text-base sm:text-lg text-zinc-700 dark:text-zinc-100 mb-3 sm:mb-4">Software Engineer</p>
        
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
          Software Engineer focused on shipping zero-to-one products. I build systems across distributed Go backends, AI-integrated frontends, and custom ESP32 firmware. I prioritize reliability in core infrastructure like identity and payments, building with security and scalability in mind to support product growth. My focus is on solving the technical challenges of early-stage development to ensure a stable foundation for the product.
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
              <span className="text-xs sm:text-sm italic mt-1 sm:mt-0">Oct 2025 – Feb 2026</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
              <span className="text-sm italic text-zinc-700 dark:text-zinc-100">Full Stack Developer</span>
              <span className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-100">Remote, Bengaluru, India</span>
            </div>
            <ul className="space-y-1 text-zinc-700 dark:text-zinc-100 ml-3 sm:ml-4 text-sm sm:text-base">
              <li className="flex"><span className="mr-1 sm:mr-2 mt-0.5 text-xs">•</span><span>Architected the v1 backend for uyir.ai, migrating the identity layer from legacy OTP to Zitadel OIDC; implemented automatic JWT refresh and patched critical Next.js CVEs mid-deployment.</span></li>
              <li className="flex"><span className="mr-1 sm:mr-2 mt-0.5 text-xs">•</span><span>Engineered a reconnection-aware attendance tracking system for LiveKit video sessions using event-sourced audit logs and idempotency guards to handle webhook race conditions and network drops.</span></li>
              <li className="flex"><span className="mr-1 sm:mr-2 mt-0.5 text-xs">•</span><span>Built the full Next.js 15 frontend from scratch with custom Tiptap diff marks for inline AI editing, therapist dashboards, and a presigned S3 upload workflow for AI avatar training data.</span></li>
              <li className="flex"><span className="mr-1 sm:mr-2 mt-0.5 text-xs">•</span><span>Containerized the stack with Docker, set up self-hosted GitHub Actions CI/CD with Nginx reverse proxy, and migrated from SMTP to AWS SES for scalable transactional emails.</span></li>
              <li className="flex"><span className="mr-1 sm:mr-2 mt-0.5 text-xs">•</span><span>Optimized database performance via PostgreSQL schema design and Alembic migrations, supporting complex therapist-user scheduling and multi-tier subscription billing.</span></li>
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
          {/* Sol - Smart Home Assistant */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 dark:text-white text-[#004d30]">Sol, Open Distributed Smart Home & Agentic Orchestration Platform <span className="text-sm font-normal text-zinc-600 dark:text-zinc-100">– Go 1.25, ESP32-S3, MQTT, LiveKit, MCP, TimescaleDB, MinIO, ZITADEL, mTLS</span></h3>
            <ul className="space-y-1 text-zinc-700 dark:text-zinc-100 ml-3 sm:ml-4 text-sm sm:text-base">
              <li className="flex"><span className="mr-1 sm:mr-2 mt-0.5 text-xs">•</span><span>Architected a 4-tier agentic platform featuring a Go control plane and ESP32-S3 nodes, validated through hardware deployment with per-device X.509 mTLS security.</span></li>
              <li className="flex"><span className="mr-1 sm:mr-2 mt-0.5 text-xs">•</span><span>Engineered a 1.2s latency voice pipeline using on-device wake-word detection (WakeNet9), LiveKit WebRTC streaming, and Azure OpenAI Realtime API for agentic reasoning.</span></li>
              <li className="flex"><span className="mr-1 sm:mr-2 mt-0.5 text-xs">•</span><span>Hardened AI-to-hardware reliability via a pgvector/HNSW grounding layer that resolves natural language device references to UUIDs with sub-millisecond latency.</span></li>
              <li className="flex"><span className="mr-1 sm:mr-2 mt-0.5 text-xs">•</span><span>Developed a zero-install WebSerial provisioning flow for browser-based firmware flashing and OIDC device-code registration, eliminating the need for local IDEs.</span></li>
              <li className="flex"><span className="mr-1 sm:mr-2 mt-0.5 text-xs">•</span><span>Built a native MCP server with capability-based authorization, exposing a standard interface for external agents (OpenClaw, NemoClaw, Claude) to discover and actuate hardware.</span></li>
            </ul>
          </div>

          {/* Zylert */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 dark:text-white text-[#004d30]">Zylert, LLM-Orchestrated Notification Triage System <span className="text-sm font-normal text-zinc-600 dark:text-zinc-100">– Kotlin, Android SDK 36, Room, Node.js, OpenAI/Mistral, Zod</span></h3>
            <ul className="space-y-1 text-zinc-700 dark:text-zinc-100 ml-3 sm:ml-4 text-sm sm:text-base">
              <li className="flex"><span className="mr-1 sm:mr-2 mt-0.5 text-xs">•</span><span>Architected an Android-to-Node.js pipeline that intercepts and triages push notifications in real time using LLM-backed semantic classification.</span></li>
              <li className="flex"><span className="mr-1 sm:mr-2 mt-0.5 text-xs">•</span><span>Hardened LLM output reliability using strict Zod validation and fallbacks to handle malformed payloads and ensure 99% parsing accuracy.</span></li>
              <li className="flex"><span className="mr-1 sm:mr-2 mt-0.5 text-xs">•</span><span>Engineered a priority routing system that surfaces critical human messages while compressing low-value automated noise via conversational querying.</span></li>
            </ul>
          </div>

          {/* Threble - Social Media Platform */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 dark:text-white text-[#004d30]">Threble, Open-Source Social Network <span className="text-sm font-normal text-zinc-600 dark:text-zinc-100">– Next.js 15, TypeScript, NextAuth, Prisma, PostgreSQL, Redux/RTK, Azure Blob</span></h3>
            <ul className="space-y-1 text-zinc-700 dark:text-zinc-100 ml-3 sm:ml-4 text-sm sm:text-base">
              <li className="flex"><span className="mr-1 sm:mr-2 mt-0.5 text-xs">•</span><span>Developed an open-source social platform featuring a LinkedIn-style graph with connection requests, mutual-connection lookups, and community roles.</span></li>
              <li className="flex"><span className="mr-1 sm:mr-2 mt-0.5 text-xs">•</span><span>Implemented route protection with NextAuth, Prisma/PostgreSQL persistence, and responsive UI with mobile-aware notification flows.</span></li>
            </ul>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 dark:text-[#8fffaa] text-[#006b42] border-b border-border pb-1 sm:pb-2">
          Skills
        </h2>
        <div className="space-y-2 sm:space-y-3 text-zinc-700 dark:text-zinc-100 text-sm sm:text-base">
          <div>
            <span className="font-semibold dark:text-[#8fffaa] text-[#006b42]">Languages:</span> TypeScript, Go, Python, Kotlin, C/C++ (ESP-IDF/Arduino), SQL, Shell/Bash, HTML/CSS
          </div>
          <div>
            <span className="font-semibold dark:text-[#8fffaa] text-[#006b42]">Frontend/Mobile:</span> Next.js 16, React 19, D3.js, Three.js, R3F, Tailwind CSS, Zustand, Redux, Framer Motion, Android SDK
          </div>
          <div>
            <span className="font-semibold dark:text-[#8fffaa] text-[#006b42]">Backend/DevOps:</span> FastAPI, Node.js, PostgreSQL (TimescaleDB/pgvector), MongoDB, Prisma, Celery, Redis, MQTT, Docker, Traefik, MinIO, GitHub Actions, AWS
          </div>
          <div>
            <span className="font-semibold dark:text-[#8fffaa] text-[#006b42]">AI/Security:</span> OpenAI Realtime, LiveKit, RAG Pipelines, Zitadel OIDC, mTLS, X.509, OAuth 2.0, JWT, HMAC-SHA256
          </div>
        </div>
      </section>
      
      {/* Certifications */}
      <section className="mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 dark:text-[#8fffaa] text-[#006b42] border-b border-border pb-1 sm:pb-2">
          Certifications
        </h2>
        <ul className="space-y-1 sm:space-y-2 text-zinc-700 dark:text-zinc-100 ml-3 sm:ml-4 text-sm sm:text-base">
          <li className="flex"><span className="mr-1 sm:mr-2 mt-0.5 text-xs">•</span><span>MCP: Build Rich-Context AI Apps with Anthropic – <em>DeepLearning.AI (May 2025)</em></span></li>
          <li className="flex"><span className="mr-1 sm:mr-2 mt-0.5 text-xs">•</span><span>Docker Foundations Professional Certificate – <em>Docker, Inc. (Feb 2026)</em></span></li>
          <li className="flex"><span className="mr-1 sm:mr-2 mt-0.5 text-xs">•</span><span>Foundation of Cloud IoT Edge ML – <em>NPTEL (May 2024)</em></span></li>
        </ul>
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
