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

const sectionTitle = 'text-lg sm:text-xl font-bold mb-3 sm:mb-4 dark:text-[#8fffaa] text-[#006b42] border-b border-border pb-1 sm:pb-2';
const bodyText = 'text-zinc-700 dark:text-zinc-100 text-sm sm:text-base';
const bulletList = `space-y-1 ${bodyText} ml-3 sm:ml-4`;

function ResumeSection({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="mb-6 sm:mb-8"><h2 className={sectionTitle}>{title}</h2>{children}</section>;
}

function ResumeBullets({ children }: { children: React.ReactNode }) {
  return <ul className={bulletList}>{children}</ul>;
}

function Bullet({ children }: { children: React.ReactNode }) {
  return <li className="flex"><span className="mr-1 sm:mr-2 mt-0.5 text-xs">•</span><span>{children}</span></li>;
}

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

  return (
    <PageEntryWrapper>
      <section className="relative container mx-auto min-h-screen px-4 pt-16 sm:px-6 sm:pt-20 lg:px-8 lg:pt-16">
        <div className="absolute inset-0 z-0 pointer-events-none hidden sm:block">
          <div className="absolute top-40 left-12 h-px w-16 dark:bg-[#8fffaa]/20 bg-[#006b42]/20" />
          <div className="absolute bottom-1/4 right-10 h-px w-24 dark:bg-[#8fffaa]/20 bg-[#006b42]/20" />
          <div className="absolute top-1/3 right-1/4 h-2 w-2 rounded-full dark:bg-[#8fffaa]/30 bg-[#006b42]/30" />
          <div className="absolute bottom-1/3 left-1/4 h-1.5 w-1.5 rounded-full dark:bg-[#8fffaa]/20 bg-[#006b42]/20" />
        </div>
        <div className="absolute inset-0 z-0 hidden bg-[url('/assets/circuit-overlay.svg')] bg-cover bg-no-repeat opacity-10 mix-blend-overlay pointer-events-none sm:block" />

        <div ref={headerAnimation.ref as React.RefObject<HTMLDivElement>} style={fadeInUp(headerAnimation.isVisible, 0)} className="relative z-10 mb-4 sm:mb-6 lg:mb-8">
          <AnimatedSectionTitle>
            <h1 className="relative inline-block font-mono text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl">
              <span className="dark:text-white text-[#006b42]">Resume</span>
              <span className="absolute bottom-0 left-0 h-0.5 w-full dark:bg-[#8fffaa]/50 bg-[#006b42]/50" />
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-zinc-700 dark:text-zinc-100 sm:mt-4 sm:text-base lg:text-lg">View my professional background, skills, and experience. Download the PDF version for your records.</p>
          </AnimatedSectionTitle>
        </div>

        <div ref={downloadAnimation.ref as React.RefObject<HTMLDivElement>} style={fadeInRight(downloadAnimation.isVisible, 0)} className="relative z-10 mb-4 sm:mb-6 lg:mb-8">
          <Card className="flex flex-col items-start justify-between gap-3 border-border bg-background/90 p-4 backdrop-blur-sm sm:flex-row sm:items-center sm:gap-4 sm:p-6">
            <div className="flex items-center gap-3"><div className="rounded-lg bg-primary/10 p-2"><FileText className="h-4 w-4 text-primary sm:h-5 sm:w-5" /></div><div><h2 className="text-sm font-semibold sm:text-base">Download Resume</h2><p className="text-xs text-zinc-700 dark:text-zinc-100 sm:text-sm">Get the latest PDF version</p></div></div>
            <Button onClick={handleDownloadPDF} className="border border-[#006b42]/30 bg-white/80 text-xs text-[#006b42] shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#006b42]/10 dark:border-[#8fffaa]/30 dark:bg-[#111]/80 dark:text-[#8fffaa] dark:hover:bg-[#8fffaa]/10 sm:text-sm"><Download className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" />Download PDF</Button>
          </Card>
        </div>

        <div ref={contentAnimation.ref as React.RefObject<HTMLDivElement>} style={fadeInLeft(contentAnimation.isVisible, 0)} className="relative z-10 mb-8 sm:mb-12 lg:mb-16">
          <Card className="border-border bg-background/90 p-3 backdrop-blur-sm sm:p-4 md:p-6 lg:p-8">
            <div className="max-w-none">
              <header className="mb-6 border-b border-border pb-4 text-center sm:mb-8 sm:pb-6">
                <h2 className="mb-2 text-xl font-bold text-[#006b42] dark:text-white sm:text-2xl lg:text-3xl xl:text-4xl">Mohamed Muaath Rifath</h2>
                <p className="mb-3 text-base text-zinc-700 dark:text-zinc-100 sm:mb-4 sm:text-lg">Software Engineer</p>
                <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-zinc-700 dark:text-zinc-100 sm:gap-4 sm:text-sm">
                  <a href="mailto:me@muaathrifath.me" className="flex items-center gap-1 transition-colors hover:text-[#006b42] dark:hover:text-[#8fffaa]"><Mail className="h-3 w-3 sm:h-4 sm:w-4" /><span className="break-all">me@muaathrifath.me</span></a>
                  <a href="tel:+918883735079" className="flex items-center gap-1 transition-colors hover:text-[#006b42] dark:hover:text-[#8fffaa]"><Phone className="h-3 w-3 sm:h-4 sm:w-4" />+91 88837 35079</a>
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3 sm:h-4 sm:w-4" />Chennai, India</span>
                </div>
                <div className="mt-2 flex flex-wrap items-center justify-center gap-2 text-xs text-zinc-700 dark:text-zinc-100 sm:gap-4 sm:text-sm">
                  <Link href="/" className="flex items-center gap-1 transition-colors hover:text-[#006b42] dark:hover:text-[#8fffaa]"><Globe className="h-3 w-3 sm:h-4 sm:w-4" />muaathrifath.me</Link>
                  <Link href="https://linkedin.com/in/muaath-rifath" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 transition-colors hover:text-[#006b42] dark:hover:text-[#8fffaa]"><Linkedin className="h-3 w-3 sm:h-4 sm:w-4" />linkedin.com/in/muaath-rifath</Link>
                  <Link href="https://github.com/muaath-rifath" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 transition-colors hover:text-[#006b42] dark:hover:text-[#8fffaa]"><Github className="h-3 w-3 sm:h-4 sm:w-4" />github.com/muaath-rifath</Link>
                </div>
              </header>

              <ResumeSection title="Professional Summary"><p className={`${bodyText} leading-relaxed`}>Software Engineer who has owned and shipped systems across payments, real-time video, identity, AI integrations, and IoT hardware. Comfortable working end-to-end across frontend, backend, database, and infrastructure. Currently building a call automation SaaS.</p></ResumeSection>

              <ResumeSection title="Experience"><div className="space-y-4 sm:space-y-6">
                <div><div className="mb-1 flex flex-col sm:flex-row sm:items-start sm:justify-between"><h3 className="text-base font-semibold text-[#004d30] dark:text-white sm:text-lg">Introspect Labs</h3><span className="mt-1 text-xs italic sm:mt-0 sm:text-sm">Oct 2025 – Feb 2026</span></div><div className="mb-2 flex flex-col sm:flex-row sm:justify-between"><span className="text-sm italic text-zinc-700 dark:text-zinc-100">Full Stack Developer</span><span className="text-xs text-zinc-700 dark:text-zinc-100 sm:text-sm">Remote, Bengaluru, India</span></div><ResumeBullets><Bullet>Migrated uyir.ai from OTP-based sign-in to ZITADEL OIDC and synchronized existing user accounts.</Bullet><Bullet>Built therapist booking with slot validation, Razorpay payment capture, and LiveKit room creation.</Bullet><Bullet>Processed signed LiveKit webhooks to track session attendance and prevent duplicate event handling.</Bullet><Bullet>Built text- and voice-based AI journaling with Tiptap inline editing and encrypted storage; blocked journal visualization when crisis content was detected.</Bullet><Bullet>Used presigned AWS S3 uploads for therapist media and knowledge-base files, keeping uploads off the application server.</Bullet><Bullet>Added offline states and global error boundaries to the Next.js application to handle network and rendering failures.</Bullet><Bullet>Automated deployments to a DigitalOcean development environment using GitHub Actions, Docker, and Alembic migrations.</Bullet></ResumeBullets></div>
                <div><div className="mb-1 flex flex-col sm:flex-row sm:items-start sm:justify-between"><h3 className="text-base font-semibold text-[#004d30] dark:text-white sm:text-lg">Erlang Labs <span className="font-normal">(erlanglabs.com)</span></h3><span className="mt-1 text-xs italic sm:mt-0 sm:text-sm">2026 – Present</span></div><div className="mb-2 flex flex-col sm:flex-row sm:justify-between"><span className="text-sm italic text-zinc-700 dark:text-zinc-100">Software Engineer, Self-Employed</span><span className="text-xs text-zinc-700 dark:text-zinc-100 sm:text-sm">Chennai, India</span></div><ResumeBullets><Bullet>Built the backend for a call automation SaaS using Go and Python microservices.</Bullet><Bullet>Enforced tenant isolation with ZITADEL authorization and PostgreSQL row-level security.</Bullet><Bullet>Configured APISIX to validate JWTs, rate-limit public routes, strip untrusted headers, and keep internal endpoints private.</Bullet><Bullet>Built an asynchronous document-ingestion pipeline with GCS and JetStream, then indexed Gemini/Vertex AI embeddings in Qdrant for retrieval during calls.</Bullet><Bullet>Built a background provisioner that initializes new organizations across services and retries failed steps independently.</Bullet><Bullet>Built LiveKit agents for inbound and outbound calls using Gemini, ElevenLabs, Cartesia, and Sarvam; captured recordings, transcripts, extracted fields, and usage for each call.</Bullet></ResumeBullets></div>
              </div></ResumeSection>

              <ResumeSection title="Projects"><div className="space-y-4 sm:space-y-6">
                <div><h3 className="mb-1 text-base font-semibold text-[#004d30] dark:text-white sm:mb-2 sm:text-lg">Sol, Smart Home Ecosystem <span className="text-sm font-normal text-zinc-600 dark:text-zinc-100">– Go, Python, PostgreSQL, Redis, MQTT, LiveKit, Azure OpenAI</span></h3><ResumeBullets><Bullet>Built the Go backend for managing homes, rooms, members, appliances, and device state with PostgreSQL (TimescaleDB) and Redis.</Bullet><Bullet>Built a Python voice assistant with LiveKit and Azure OpenAI for natural-language device control.</Bullet><Bullet>Secured the device platform with ZITADEL authentication, room-level access controls, and mTLS-authenticated MQTT connections.</Bullet><Bullet>Tracked device commands with MQTT acknowledgements and control logs so the backend could confirm their outcome.</Bullet><Bullet>Built OTA firmware updates with mTLS-protected downloads, safe retries, and device configuration preserved across updates.</Bullet></ResumeBullets></div>
                <div><h3 className="mb-1 text-base font-semibold text-[#004d30] dark:text-white sm:mb-2 sm:text-lg">Zylert, AI Notification Triage App <span className="text-sm font-normal text-zinc-600 dark:text-zinc-100">– Kotlin, Android SDK, Node.js, PostgreSQL, JSON/Zod, REST APIs</span></h3><ResumeBullets><Bullet>Built an Android app and Node.js backend that uses AI to classify captured notifications as important, moderate, or unwanted.</Bullet><Bullet>Added AI-generated notification summaries and a chatbot for searching and asking questions about past alerts.</Bullet><Bullet>Validated API payloads with Zod and stored notification history in PostgreSQL.</Bullet></ResumeBullets></div>
              </div></ResumeSection>

              <ResumeSection title="Skills"><div className={`space-y-2 sm:space-y-3 ${bodyText}`}><p><span className="font-semibold text-[#006b42] dark:text-[#8fffaa]">Languages:</span> TypeScript, JavaScript, Python, Go, SQL, C/C++, Kotlin, Bash, HTML/CSS</p><p><span className="font-semibold text-[#006b42] dark:text-[#8fffaa]">Backend:</span> FastAPI, Node.js, Express.js, PostgreSQL, TimescaleDB, MongoDB, Prisma, Redis, Celery, Alembic, gRPC</p><p><span className="font-semibold text-[#006b42] dark:text-[#8fffaa]">Frontend:</span> React, Next.js, Vue.js, Tailwind CSS, Tiptap, Zustand, Three.js, Framer Motion</p><p><span className="font-semibold text-[#006b42] dark:text-[#8fffaa]">Cloud &amp; Infrastructure:</span> AWS, GCP, Azure, DigitalOcean, Docker, Linux, Git, GitHub Actions, Nginx, APISIX, NATS JetStream</p><p><span className="font-semibold text-[#006b42] dark:text-[#8fffaa]">AI &amp; Realtime:</span> LiveKit, Gemini/Vertex AI, Azure OpenAI, Qdrant, RAG, MCP</p><p><span className="font-semibold text-[#006b42] dark:text-[#8fffaa]">Security:</span> ZITADEL OIDC/OAuth, JWT, mTLS, PostgreSQL RLS</p></div></ResumeSection>

              <ResumeSection title="Certifications"><ResumeBullets><Bullet><strong>MCP: Build Rich-Context AI Apps with Anthropic</strong> – <em>DeepLearning.AI (May 2025)</em></Bullet><Bullet><strong>Docker Foundations Professional Certificate</strong> – <em>Docker, Inc. (Feb 2026)</em></Bullet><Bullet><strong>Foundation of Cloud IoT Edge ML</strong> – <em>NPTEL (May 2024)</em></Bullet></ResumeBullets></ResumeSection>

              <section className="mb-4 sm:mb-6"><h2 className={sectionTitle}>Education</h2><div className={bodyText}><div className="mb-1 flex flex-col sm:flex-row sm:items-start sm:justify-between"><span className="font-semibold text-[#004d30] dark:text-white">Aalim Muhammed Salegh College of Engineering</span><span className="mt-1 text-xs italic sm:mt-0 sm:text-sm">2022 – 2026</span></div><div className="mb-1 text-xs italic sm:text-sm">Chennai, India</div><div>B.E. in Electronics &amp; Communication Engineering</div></div></section>
            </div>
          </Card>
        </div>
      </section>
    </PageEntryWrapper>
  );
}
