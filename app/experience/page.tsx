import React from "react";
import { Metadata } from "next";
import { PageEntryWrapper } from "@/components/animated/PageEntryWrapper";
import { AnimatedBackground } from "@/components/animated/AnimatedBackground";
import { AnimatedSectionTitle } from "@/components/animated/AnimatedSectionTitle";
import { ProgrammingLanguagesGrid } from "@/components/animated/ProgrammingLanguagesGrid";
import { FrameworksGrid } from "@/components/animated/FrameworksGrid";
import { ToolsGrid } from "@/components/animated/ToolsGrid";
import { ProjectsGrid } from "@/components/animated/ProjectsGrid";
import { CertificationsGrid } from "@/components/animated/CertificationsGrid";
import { EducationCard } from "@/components/animated/EducationCard";
import { WorkExperienceCard } from "@/components/animated/WorkExperienceCard";

// Work Experience
const workExperience = [
  {
    company: "Introspect Labs",
    role: "Full Stack Developer",
    location: "Remote — Bengaluru, India",
    duration: "Oct 2025 – Present",
    type: "Full-time",
    bullets: [
      "Architected therapist consultation platform from scratch — professional profiles, session booking with server-side pricing breakdown, LiveKit video sessions, and webhook-driven attendance tracking with missed-session refund logic.",
      "Built AI journaling pipeline — rant-to-journal articulation via LLM, AES-256-GCM encryption at rest, cursor-style inline editing with custom Tiptap diff marks, crisis detection, and AI visualization via RunwayML/Kling.",
      "Developed complete Next.js 15 frontend (185 commits) with Zustand state management, Server/Client component architecture for SEO, draggable picture-in-picture video UI, and presigned S3 upload flows.",
      "Integrated Razorpay for Autopay subscriptions and per-session payments with idempotent webhook handling, HMAC-SHA256 signature verification, and slot locking to prevent phantom bookings.",
      "Replaced OTP-based authentication with Zitadel OIDC across the full stack; implemented automatic JWT token refresh with pre-expiry buffer, federated logout, and per-request user sync.",
      "Set up CI/CD with GitHub Actions (self-hosted runner), Docker, Nginx reverse proxy, Let's Encrypt SSL; authored 30+ Alembic database migrations.",
    ],
    logoPath: "/assets/introspect-labs.svg",
  },
  {
    company: "Freelance",
    role: "Full Stack Developer",
    location: "Chennai, India",
    duration: "Dec 2022 – Oct 2025",
    type: "Self-employed",
    bullets: [
      "Delivered full-stack web applications for clients using Next.js, React, TypeScript, and Tailwind CSS with responsive, accessible designs.",
      "Built backend services with Node.js, PostgreSQL, Prisma ORM, and NextAuth for secure authentication flows.",
    ],
  },
];

// Languages (from resume.tex)
const programmingLanguages = [
  { name: "TypeScript", imagePath: "/assets/typescript.png" },
  { name: "JavaScript", imagePath: "/assets/javascript.png" },
  { name: "Python", imagePath: "/assets/python.png" },
  { name: "SQL", imagePath: "/assets/sql.svg" },
  { name: "Kotlin", imagePath: "/assets/kotlin.svg" },
  { name: "HTML/CSS", imagePath: "/assets/htmlcss.svg" },
  { name: "C/C++", imagePath: "/assets/cpp.png" },
];

// Frontend
const frontend = [
  { name: "React", imagePath: "/assets/react.png" },
  { name: "Next.js", imagePath: "/assets/nextjs-icon.png" },
  { name: "Tailwind CSS", imagePath: "/assets/tailwind.png" },
  { name: "Zustand", imagePath: "/assets/zustand.svg" },
  { name: "Three.js", imagePath: "/assets/three-js.svg" },
  { name: "Tiptap", imagePath: "/assets/tiptap.jpeg" },
  { name: "Framer Motion", imagePath: "/assets/framer-motion.svg" },
];

// Backend
const backend = [
  { name: "FastAPI", imagePath: "/assets/fastapi.svg" },
  { name: "Node.js", imagePath: "/assets/node-js.webp" },
  { name: "Express.js", imagePath: "/assets/express-js.svg" },
  { name: "PostgreSQL", imagePath: "/assets/postgresql.svg" },
  { name: "MongoDB", imagePath: "/assets/MongoDB.jpg" },
  { name: "Prisma", imagePath: "/assets/prisma-orm.png" },
  { name: "Celery", imagePath: "/assets/celery.png" },
  { name: "Redis", imagePath: "/assets/redis.svg" },
  { name: "Alembic", imagePath: "/assets/alembic.svg" },
];

// DevOps & Tools
const devopsTools = [
  { name: "Docker", imagePath: "/assets/docker.jpg" },
  { name: "Git", imagePath: "/assets/Git-Icon.png" },
  { name: "GitHub Actions", imagePath: "/assets/github-actions.png" },
  { name: "Nginx", imagePath: "/assets/nginx.png" },
  { name: "Linux", imagePath: "/assets/linux.png" },
  { name: "AWS", imagePath: "/assets/aws.svg" },
  { name: "Azure", imagePath: "/assets/azure.svg" },
  { name: "LiveKit", imagePath: "/assets/livekit.png" },
  { name: "Razorpay", imagePath: "/assets/razorpay.jpeg" },
];

// Projects
const projectsData = [
  {
    title: "Zylert",
    description:
      "AI-powered notification manager for Android that classifies notifications into priority tiers using GPT-4, generates summaries, and provides a chat interface to reduce notification fatigue.",
    imageUrl: "/assets/zylert.svg",
    projectUrl: "https://github.com/muaath-rifath/zylert",
    tags: [
      "Kotlin",
      "Android SDK 36",
      "Room",
      "Node.js",
      "Express.js",
      "OpenAI SDK",
    ],
  },
  {
    title: "Sol",
    description:
      "AI-powered smart home assistant with natural-language control via Gemini 2.0 Flash, real-time MQTT/WebSocket device communication, and PWA with offline-first support. Won 1st Prize at T.J.S. Engineering College Project Expo.",
    imageUrl: "/assets/sol.png",
    projectUrl: "https://github.com/muaath-rifath/sol",
    tags: [
      "Next.js",
      "Gemini 2.0 Flash",
      "MCP",
      "MQTT",
      "Prisma",
      "PostgreSQL",
    ],
  },
  {
    title: "Threble",
    description:
      "Open-source social platform with LinkedIn-style connection graphs, community roles (USER/MODERATOR/ADMIN), RSVP events, 20+ notification types with real-time badge counts, and 20+ Prisma models with compound indexes.",
    imageUrl: "/assets/threble.png",
    projectUrl: "https://github.com/muaath-rifath/threble",
    tags: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Azure",
      "NextAuth",
    ],
  },
  {
    title: "Portfolio",
    description:
      "Interactive 3D portfolio with Three.js scene rendering, smooth page transitions via Framer Motion, Firestore-backed contact form with reCAPTCHA v3, and SSR-safe dark/light mode.",
    imageUrl: "/assets/portfolio.png",
    projectUrl: "https://github.com/muaath-rifath/my-portfolio",
    tags: ["Next.js", "Three.js", "Framer Motion", "Tailwind CSS", "Firestore"],
  },
  {
    title: "HR Dashboard",
    description:
      "Employee management dashboard with attendance tracking, leave approval, performance reviews, Chart.js analytics, dual navigation, themeable UI, and persisted global state via Zustand.",
    imageUrl: "/assets/hr-dashboard.svg",
    projectUrl: "https://github.com/muaath-rifath/hr-dashboard",
    tags: ["Next.js 15", "TypeScript", "Zustand", "Chart.js", "Radix UI"],
  },
];

// Certifications
const licensesCertifications = [
  {
    title: "Docker Foundations Professional Certificate",
    issuer: "Docker",
    issueDate: "February 2026",
    description:
      "Docker containerization fundamentals including building, shipping, and running containers for modern application development and deployment.",
    certificateLink:
      "https://www.linkedin.com/learning/certificates/1e9fc3c7128a2d9441ca1a12d755fc16a026666ad031b6923fbfac7ed54f36b8",
    imagePath: "/assets/docker-cert.jpg",
    logoPath: "/assets/docker.jpg",
  },
  {
    title: "MCP: Build Rich-Context AI Apps",
    issuer: "DeepLearning.AI",
    issueDate: "May 2025",
    description:
      "Building AI applications with rich context using Model Context Protocol for enhanced AI integration and system-level connections.",
    certificateLink:
      "https://learn.deeplearning.ai/accomplishments/5c980bf5-fee5-4908-bd47-28309915c9e7?usp=sharing",
    imagePath: "/assets/mcp-cert.png",
    logoPath: "/assets/deeplearning-ai.svg",
  },
  {
    title: "Career Essentials in GitHub",
    issuer: "GitHub & LinkedIn Learning",
    issueDate: "November 2024",
    description:
      "Foundation of GitHub and Professional Development course covering version control, collaboration, and professional skills.",
    certificateLink:
      "https://www.linkedin.com/learning/certificates/59c0e2acd4349d169fa3b3f2ddb1699dc27de2a7ab90c3676359f855889a0efc",
    imagePath: "/assets/linkedin-github-foundations.jpg",
    logoPath: "/assets/github-logo.png",
  },
  {
    title: "Foundation of Cloud IoT Edge ML",
    issuer: "NPTEL",
    issueDate: "April 2024",
    description:
      "Foundation of Cloud IoT Edge ML course covering Edge Computing, Cloud Integration, Docker and Kubernetes, Kafka, etc.",
    certificateLink:
      "https://archive.nptel.ac.in/noc/Ecertificate/?q=NPTEL24CS26S65351013530593153",
    imagePath: "/assets/NPTEL24CS26S65351013530593153.webp",
    logoPath: "/assets/nptel.png",
  },
  {
    title: "Career Essentials in Software Development",
    issuer: "Microsoft & LinkedIn Learning",
    issueDate: "March 2024",
    description:
      "Foundation of Software Development course covering programming, debugging, testing, and deployment.",
    certificateLink:
      "https://www.linkedin.com/learning/certificates/2e0a238093805d7199aa48b1f7f2792351f7eeb8dbef4f1c7accc3363fd9bcb9",
    imagePath: "/assets/linkedin-microsoft-sd.jpg",
    logoPath: "/assets/Microsoft_Logo.svg",
  },
  {
    title: "Python",
    issuer: "HackerRank",
    issueDate: "January 2024",
    description:
      "Python course covering foundational programming concepts, classes, and data structures.",
    certificateLink: "https://www.hackerrank.com/certificates/0227798a014b",
    imagePath: "/assets/hackerrank-python.png",
    logoPath: "/assets/HackerRank.png",
  },
];

// Education
const educations = [
  {
    institution: "Aalim Muhammed Salegh College of Engineering, Chennai 600055",
    degree: "Bachelor of Electronics and Communication Engineering",
    duration: "2022 - 2026",
    description:
      "Pursuing a Bachelor's degree in Electronics and Communication Engineering with a strong foundation in core principles. Relevant coursework includes Microprocessors and Microcontrollers, Embedded Systems, Digital Electronics, Signal Processing, Analog and Digital Communication, and Wireless Communication.",
  },
];

export const metadata: Metadata = {
  title: "Experience | Muaath Rifath",
  description:
    "Explore the professional experience and skills of Mohamed Muaath Rifath — Full-Stack Developer specializing in Next.js, TypeScript, FastAPI, and modern web development.",
  keywords: [
    "Experience",
    "Mohamed Muaath Rifath",
    "Full-Stack Developer",
    "Next.js",
    "TypeScript",
    "FastAPI",
    "React",
    "professional experience",
  ],
  openGraph: {
    title: "Experience | Muaath Rifath",
    description:
      "Explore the professional experience and skills of Mohamed Muaath Rifath — Full-Stack Developer specializing in Next.js, TypeScript, FastAPI, and modern web development.",
    images: ["/assets/expertise-page.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Experience | Muaath Rifath",
    description:
      "Explore the professional experience and skills of Mohamed Muaath Rifath — Full-Stack Developer specializing in Next.js, TypeScript, FastAPI, and modern web development.",
    images: "/assets/expertise-page.png",
  },
  alternates: {
    canonical: "https://muaathrifath.me/experience",
  },
};

const ExperienceSection: React.FC = () => {
  return (
    <PageEntryWrapper>
      <section className="relative w-full overflow-hidden">
        <AnimatedBackground />

        {/* Work Experience Section */}
        <section className="w-full mt-20 relative">
          <div className="container px-4 sm:px-6">
            <AnimatedSectionTitle>
              <h2 className="text-3xl font-bold font-mono tracking-tighter relative inline-block">
                <span className="dark:text-white text-[#006b42]">
                  Work Experience
                </span>
                <span className="absolute left-0 bottom-0 h-[2px] w-full dark:bg-[#8fffaa]/50 bg-[#006b42]/50"></span>
              </h2>
            </AnimatedSectionTitle>
            <div className="mt-8 flex justify-center">
              <div className="w-full max-w-3xl">
                {workExperience.map((exp, index) => (
                  <WorkExperienceCard
                    key={index}
                    experience={exp}
                    delay={index * 80}
                    isLast={index === workExperience.length - 1}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Languages Section */}
        <section className="w-full mt-16 relative">
          <div className="container px-4 sm:px-6">
            <AnimatedSectionTitle>
              <h2 className="text-3xl font-bold font-mono tracking-tighter relative inline-block">
                <span className="dark:text-white text-[#006b42]">
                  Languages
                </span>
                <span className="absolute left-0 bottom-0 h-[2px] w-full dark:bg-[#8fffaa]/50 bg-[#006b42]/50"></span>
              </h2>
            </AnimatedSectionTitle>
            <ProgrammingLanguagesGrid
              languages={programmingLanguages}
              delay={0}
            />
          </div>
        </section>

        {/* Frontend Section */}
        <section className="w-full mt-16 relative">
          <div className="container px-4 sm:px-6">
            <AnimatedSectionTitle>
              <h2 className="text-3xl font-bold font-mono tracking-tighter relative inline-block">
                <span className="dark:text-white text-[#006b42]">Frontend</span>
                <span className="absolute left-0 bottom-0 h-[2px] w-full dark:bg-[#8fffaa]/50 bg-[#006b42]/50"></span>
              </h2>
            </AnimatedSectionTitle>
            <FrameworksGrid frameworks={frontend} delay={0} />
          </div>
        </section>

        {/* Backend Section */}
        <section className="w-full mt-16 relative">
          <div className="container px-4 sm:px-6">
            <AnimatedSectionTitle>
              <h2 className="text-3xl font-bold font-mono tracking-tighter relative inline-block">
                <span className="dark:text-white text-[#006b42]">Backend</span>
                <span className="absolute left-0 bottom-0 h-[2px] w-full dark:bg-[#8fffaa]/50 bg-[#006b42]/50"></span>
              </h2>
            </AnimatedSectionTitle>
            <FrameworksGrid frameworks={backend} delay={0} />
          </div>
        </section>

        {/* DevOps & Tools Section */}
        <section className="w-full mt-16 relative">
          <div className="container px-4 sm:px-6">
            <AnimatedSectionTitle>
              <h2 className="text-3xl font-bold font-mono tracking-tighter relative inline-block">
                <span className="dark:text-white text-[#006b42]">
                  DevOps & Tools
                </span>
                <span className="absolute left-0 bottom-0 h-[2px] w-full dark:bg-[#8fffaa]/50 bg-[#006b42]/50"></span>
              </h2>
            </AnimatedSectionTitle>
            <ToolsGrid tools={devopsTools} delay={0} />
          </div>
        </section>

        {/* Projects Section */}
        <section className="w-full mt-16 relative">
          <div className="container px-4 sm:px-6">
            <AnimatedSectionTitle>
              <h2 className="text-3xl font-bold font-mono tracking-tighter relative inline-block">
                <span className="dark:text-white text-[#006b42]">Projects</span>
                <span className="absolute left-0 bottom-0 h-[2px] w-full dark:bg-[#8fffaa]/50 bg-[#006b42]/50"></span>
              </h2>
            </AnimatedSectionTitle>
            <ProjectsGrid projects={projectsData} delay={0} />
          </div>
        </section>

        {/* Licenses and Certifications Section */}
        <section className="w-full mt-16 relative">
          <div className="container px-4 sm:px-6">
            <AnimatedSectionTitle>
              <h2 className="text-3xl font-bold font-mono tracking-tighter relative inline-block">
                <span className="dark:text-white text-[#006b42]">
                  Licenses and Certifications
                </span>
                <span className="absolute left-0 bottom-0 h-[2px] w-full dark:bg-[#8fffaa]/50 bg-[#006b42]/50"></span>
              </h2>
            </AnimatedSectionTitle>
            <CertificationsGrid
              certifications={licensesCertifications}
              delay={0}
            />
          </div>
        </section>

        {/* Education Section */}
        <section className="w-full mt-16 pb-24 relative">
          <div className="container px-4 sm:px-6">
            <AnimatedSectionTitle>
              <h2 className="text-3xl font-bold font-mono tracking-tighter relative inline-block">
                <span className="dark:text-white text-[#006b42]">
                  Education
                </span>
                <span className="absolute left-0 bottom-0 h-[2px] w-full dark:bg-[#8fffaa]/50 bg-[#006b42]/50"></span>
              </h2>
            </AnimatedSectionTitle>
            <div className="mt-8 flex justify-center">
              <div className="w-full max-w-3xl">
                {educations.map((education, index) => (
                  <EducationCard key={index} education={education} delay={0} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </section>
    </PageEntryWrapper>
  );
};

export default ExperienceSection;
