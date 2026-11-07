'use client';

import React from 'react';
import Link from 'next/link';
import { PageEntryWrapper } from '@/components/animated/PageEntryWrapper';
import { AnimatedSectionTitle } from '@/components/animated/AnimatedSectionTitle';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { fadeInUp, fadeInLeft, fadeInRight } from '@/lib/animations';
import { Button } from '@/components/ui/button';
import { Download, FileText, Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

const sectionTitle =
  'mb-4 border-b border-border pb-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#006b42] dark:text-[#8fffaa]';
const bodyText = 'text-sm leading-relaxed text-muted-foreground sm:text-[15px]';
const bulletList = `list-disc space-y-1.5 pl-5 marker:text-[#006b42] dark:marker:text-[#8fffaa] ${bodyText}`;

function ResumeSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8 last:mb-0">
      <h2 className={sectionTitle}>{title}</h2>
      {children}
    </section>
  );
}

function ResumeBullets({ children }: { children: React.ReactNode }) {
  return <ul className={bulletList}>{children}</ul>;
}

function ExperienceItem({
  company,
  period,
  role,
  location,
  children,
}: {
  company: React.ReactNode;
  period: string;
  role: string;
  location: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <h3 className="text-base font-semibold text-foreground">{company}</h3>
        <span className="text-xs tabular-nums text-muted-foreground sm:text-sm">{period}</span>
      </div>
      <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <span className="text-sm font-medium text-[#006b42] dark:text-[#8fffaa]">{role}</span>
        <span className="text-xs text-muted-foreground sm:text-sm">{location}</span>
      </div>
      {children}
    </div>
  );
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
      <div className="relative w-full px-4 pb-16 pt-20 sm:px-6 sm:pb-20 sm:pt-24">
        <div className="mx-auto w-full max-w-5xl">
          <div
            ref={headerAnimation.ref as React.RefObject<HTMLDivElement>}
            style={fadeInUp(headerAnimation.isVisible, 0)}
            className="mb-6 sm:mb-8"
          >
            <AnimatedSectionTitle>
              <h1 className="relative inline-block font-mono text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
                <span className="text-[#006b42] dark:text-[#8fffaa]">Resume</span>
                <span className="absolute bottom-0 left-0 h-0.5 w-full bg-[#006b42]/50 dark:bg-[#8fffaa]/50" />
              </h1>
              <p className="mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
                View my professional background, skills, and experience. Download the PDF version for
                your records.
              </p>
            </AnimatedSectionTitle>
          </div>

          <div
            ref={downloadAnimation.ref as React.RefObject<HTMLDivElement>}
            style={fadeInRight(downloadAnimation.isVisible, 0)}
            className="mb-6 sm:mb-8"
          >
            <div className="flex flex-col items-start justify-between gap-4 rounded-lg border border-border p-4 sm:flex-row sm:items-center sm:p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-md border border-border p-2">
                  <FileText className="h-4 w-4 text-[#006b42] dark:text-[#8fffaa]" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-foreground">Download Resume</h2>
                  <p className="text-xs text-muted-foreground sm:text-sm">Get the latest PDF version</p>
                </div>
              </div>
              <Button
                onClick={handleDownloadPDF}
                size="sm"
                className="gap-2 bg-[#006b42] text-white hover:bg-[#006b42]/90 dark:bg-[#8fffaa] dark:text-[#0b1a12] dark:hover:bg-[#8fffaa]/90"
              >
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
            </div>
          </div>

          <div
            ref={contentAnimation.ref as React.RefObject<HTMLDivElement>}
            style={fadeInLeft(contentAnimation.isVisible, 0)}
          >
            <article className="rounded-lg border border-border p-5 sm:p-7 md:p-8">
              <header className="mb-8 border-b border-border pb-6 text-center">
                <h2 className="mb-1 text-xl font-semibold tracking-tight text-foreground sm:text-2xl md:text-3xl">
                  Mohamed Muaath Rifath
                </h2>
                <p className="mb-4 text-sm font-medium text-[#006b42] dark:text-[#8fffaa] sm:text-base">Software Engineer</p>
                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-muted-foreground sm:text-sm">
                  <a
                    href="mailto:contact@muaathrifath.me"
                    className="flex items-center gap-1.5 transition-colors hover:text-[#006b42] dark:text-[#8fffaa]"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    <span className="break-all">contact@muaathrifath.me</span>
                  </a>
                  <a
                    href="tel:+918883735079"
                    className="flex items-center gap-1.5 transition-colors hover:text-[#006b42] dark:text-[#8fffaa]"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    +91 88837 35079
                  </a>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    Chennai, India
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-muted-foreground sm:text-sm">
                  <Link href="/" className="flex items-center gap-1.5 transition-colors hover:text-[#006b42] dark:text-[#8fffaa]">
                    <Globe className="h-3.5 w-3.5" />
                    muaathrifath.me
                  </Link>
                  <Link
                    href="https://linkedin.com/in/muaath-rifath"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 transition-colors hover:text-[#006b42] dark:text-[#8fffaa]"
                  >
                    <Linkedin className="h-3.5 w-3.5" />
                    linkedin.com/in/muaath-rifath
                  </Link>
                  <Link
                    href="https://github.com/muaath-rifath"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 transition-colors hover:text-[#006b42] dark:text-[#8fffaa]"
                  >
                    <Github className="h-3.5 w-3.5" />
                    github.com/muaath-rifath
                  </Link>
                </div>
              </header>

              <ResumeSection title="Professional Summary">
                <p className={bodyText}>
                  Software Engineer who has owned and shipped systems across payments, real-time video,
                  identity, AI integrations, and IoT hardware. Comfortable working end-to-end across
                  frontend, backend, database, and infrastructure.
                </p>
              </ResumeSection>

              <ResumeSection title="Experience">
                <div className="space-y-7">
                  <ExperienceItem
                    company="Introspect Labs"
                    period="Oct 2025 – Feb 2026"
                    role="Full Stack Developer"
                    location="Remote, Bengaluru, India"
                  >
                    <ResumeBullets>
                      <li>
                        Migrated uyir.ai from OTP-based sign-in to ZITADEL OIDC and synchronized existing
                        user accounts.
                      </li>
                      <li>
                        Built therapist booking with slot validation, Razorpay payment capture, and LiveKit
                        room creation.
                      </li>
                      <li>
                        Processed signed LiveKit webhooks to track session attendance and prevent duplicate
                        event handling.
                      </li>
                      <li>
                        Built text- and voice-based AI journaling with Tiptap inline editing and encrypted
                        storage; blocked journal visualization when crisis content was detected.
                      </li>
                      <li>
                        Used presigned AWS S3 uploads for therapist media and knowledge-base files, keeping
                        uploads off the application server.
                      </li>
                      <li>
                        Added offline states and global error boundaries to the Next.js application to handle
                        network and rendering failures.
                      </li>
                      <li>
                        Automated deployments to a DigitalOcean development environment using GitHub Actions,
                        Docker, and Alembic migrations.
                      </li>
                    </ResumeBullets>
                  </ExperienceItem>

                  <ExperienceItem
                    company="Rafoof"
                    period="2026 – Present"
                    role="Freelance Software Engineer"
                    location="Remote"
                  >
                    <ResumeBullets>
                      <li>
                        Built a multi-tenant physical library management backend with Fastify, TypeScript, and
                        PostgreSQL 18, enforcing tenant isolation across 18 tables with PostgreSQL RLS and raw
                        pg connection pooling.
                      </li>
                      <li>
                        Developed a cross-platform mobile app using Kotlin Multiplatform (KMP) and Compose
                        Multiplatform for Android and iOS with MVI architecture and Zitadel OIDC authentication.
                      </li>
                      <li>
                        Integrated CameraX and Google ML Kit for continuous 30 FPS QR scanning, and engineered
                        direct thermal label printing using Android PrintManager and ZXing.
                      </li>
                      <li>
                        Implemented weighted full-text and trigram search with PostgreSQL GIN indexes, and
                        prevented duplicate checkouts via Idempotency-Key headers and optimistic row versioning.
                      </li>
                    </ResumeBullets>
                  </ExperienceItem>

                  <ExperienceItem
                    company={
                      <>
                        Erlang Labs <span className="font-normal text-muted-foreground">(erlanglabs.com)</span>
                      </>
                    }
                    period="2026"
                    role="Freelance Software Engineer"
                    location="Remote"
                  >
                    <ResumeBullets>
                      <li>Built the backend for a call automation SaaS using Go and Python microservices.</li>
                      <li>
                        Enforced tenant isolation with ZITADEL authorization and PostgreSQL row-level security.
                      </li>
                      <li>
                        Configured APISIX to validate JWTs, rate-limit public routes, strip untrusted headers,
                        and keep internal endpoints private.
                      </li>
                      <li>
                        Built an asynchronous document-ingestion pipeline with GCS and JetStream, then indexed
                        Gemini/Vertex AI embeddings in Qdrant for retrieval during calls.
                      </li>
                      <li>
                        Built a background provisioner that initializes new organizations across services and
                        retries failed steps independently.
                      </li>
                      <li>
                        Built LiveKit agents for inbound and outbound calls using Gemini, ElevenLabs, Cartesia,
                        and Sarvam; captured recordings, transcripts, extracted fields, and usage for each call.
                      </li>
                    </ResumeBullets>
                  </ExperienceItem>
                </div>
              </ResumeSection>

              <ResumeSection title="Projects">
                <div>
                  <h3 className="text-base font-semibold text-foreground">Sol, Smart Home Ecosystem</h3>
                  <p className="mb-3 mt-1 text-xs text-[#006b42] dark:text-[#8fffaa] sm:text-sm">
                    Go, Python, PostgreSQL, Redis, MQTT, LiveKit, Azure OpenAI
                  </p>
                  <ResumeBullets>
                    <li>
                      Built the Go backend for managing homes, rooms, members, appliances, and device state
                      with PostgreSQL (TimescaleDB) and Redis.
                    </li>
                    <li>
                      Built a Python voice assistant with LiveKit and Azure OpenAI for natural-language device
                      control.
                    </li>
                    <li>
                      Secured the device platform with ZITADEL authentication, room-level access controls, and
                      mTLS-authenticated MQTT connections.
                    </li>
                    <li>
                      Tracked device commands with MQTT acknowledgements and built OTA firmware updates with
                      mTLS-protected downloads and safe retries.
                    </li>
                  </ResumeBullets>
                </div>
              </ResumeSection>

              <ResumeSection title="Skills">
                <div className={`space-y-2 ${bodyText}`}>
                  {[
                    ['Languages', 'TypeScript, JavaScript, Python, Go, SQL, C/C++, Kotlin, Bash, HTML/CSS'],
                    [
                      'Backend',
                      'FastAPI, Fastify, Node.js, Express.js, PostgreSQL, TimescaleDB, MongoDB, Prisma, Redis, Celery, Alembic, gRPC',
                    ],
                    [
                      'Frontend & Mobile',
                      'React, Next.js, Compose Multiplatform, Vue.js, Tailwind CSS, Tiptap, Zustand, Three.js, Framer Motion',
                    ],
                    [
                      'Cloud & Infrastructure',
                      'AWS, GCP, Azure, DigitalOcean, Docker, Linux, Git, GitHub Actions, Nginx, APISIX, NATS JetStream',
                    ],
                    ['AI & Realtime', 'LiveKit, Gemini/Vertex AI, Azure OpenAI, Qdrant, RAG, MCP'],
                    ['Security', 'ZITADEL OIDC/OAuth, JWT, mTLS, PostgreSQL RLS'],
                  ].map(([label, value]) => (
                    <p key={label}>
                      <span className="font-medium text-foreground">{label}:</span> {value}
                    </p>
                  ))}
                </div>
              </ResumeSection>

              <ResumeSection title="Certifications">
                <ResumeBullets>
                  <li>
                    <strong className="font-medium text-foreground">
                      MCP: Build Rich-Context AI Apps with Anthropic
                    </strong>{' '}
                    – <em>DeepLearning.AI (May 2025)</em>
                  </li>
                  <li>
                    <strong className="font-medium text-foreground">
                      Docker Foundations Professional Certificate
                    </strong>{' '}
                    – <em>Docker, Inc. (Feb 2026)</em>
                  </li>
                  <li>
                    <strong className="font-medium text-foreground">Foundation of Cloud IoT Edge ML</strong> –{' '}
                    <em>NPTEL (May 2024)</em>
                  </li>
                </ResumeBullets>
              </ResumeSection>

              <ResumeSection title="Education">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <span className="font-semibold text-foreground">
                    Aalim Muhammed Salegh College of Engineering
                  </span>
                  <span className="text-xs tabular-nums text-muted-foreground sm:text-sm">2022 – 2026</span>
                </div>
                <div className={`mt-1 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between ${bodyText}`}>
                  <span>B.E. in Electronics &amp; Communication Engineering</span>
                  <span className="text-xs text-muted-foreground sm:text-sm">Chennai, India</span>
                </div>
              </ResumeSection>
            </article>
          </div>
        </div>
      </div>
    </PageEntryWrapper>
  );
}
