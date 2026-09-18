import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Award, ChevronDown, FileText } from "lucide-react";
import { SiGo } from "react-icons/si";
import "./experience.css";

// Work Experience
const workExperience = [
  {
    company: "Introspect Labs",
    role: "Full Stack Developer",
    location: "Remote, Bengaluru, India",
    duration: "Oct 2025 – Feb 2026",
    type: "Full-time",
    bullets: [
      "Migrated uyir.ai from OTP-based sign-in to ZITADEL OIDC and synchronized existing user accounts.",
      "Built therapist booking with slot validation, Razorpay payment capture, and LiveKit room creation.",
      "Processed signed LiveKit webhooks to track session attendance and prevent duplicate event handling.",
      "Built text- and voice-based AI journaling with Tiptap inline editing and encrypted storage; blocked journal visualization when crisis content was detected.",
      "Used presigned AWS S3 uploads for therapist media and knowledge-base files, keeping uploads off the application server.",
      "Added offline states and global error boundaries to the Next.js application to handle network and rendering failures.",
      "Automated deployments to a DigitalOcean development environment using GitHub Actions, Docker, and Alembic migrations.",
    ],
    logoPath: "/assets/introspect-labs.svg",
  },
  {
    company: "Erlang Labs",
    role: "Software Engineer",
    location: "Chennai, India",
    duration: "2026 – Present",
    type: "Self-employed",
    bullets: [
      "Built the backend for a call automation SaaS using Go and Python microservices.",
      "Enforced tenant isolation with ZITADEL authorization and PostgreSQL row-level security.",
      "Configured APISIX to validate JWTs, rate-limit public routes, strip untrusted headers, and keep internal endpoints private.",
      "Built an asynchronous document-ingestion pipeline with GCS and JetStream, then indexed Gemini/Vertex AI embeddings in Qdrant for retrieval during calls.",
      "Built a background provisioner that initializes new organizations across services and retries failed steps independently.",
      "Built LiveKit agents for inbound and outbound calls using Gemini, ElevenLabs, Cartesia, and Sarvam; captured recordings, transcripts, extracted fields, and usage for each call.",
    ],
    logoPath: "/erlanglabs-logo-mark.svg",
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
      "Smart home ecosystem with a Go backend for homes, rooms, members, appliances, and device state; a LiveKit and Azure OpenAI voice assistant; ZITADEL access control; and mTLS-authenticated MQTT device connections.",
    imageUrl: "/assets/sol.png",
    projectUrl: "https://github.com/muaath-rifath/sol-core",
    tags: [
      "Go",
      "Python",
      "MQTT",
      "PostgreSQL",
      "Redis",
      "LiveKit",
      "Azure OpenAI",
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
    "Explore the professional experience and skills of Mohamed Muaath Rifath, a Full-Stack Developer specializing in Next.js, TypeScript, FastAPI, and modern web development.",
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
      "Explore the professional experience and skills of Mohamed Muaath Rifath, a Full-Stack Developer specializing in Next.js, TypeScript, FastAPI, and modern web development.",
    images: ["/assets/expertise-page.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Experience | Muaath Rifath",
    description:
      "Explore the professional experience and skills of Mohamed Muaath Rifath, a Full-Stack Developer specializing in Next.js, TypeScript, FastAPI, and modern web development.",
    images: "/assets/expertise-page.png",
  },
  alternates: {
    canonical: "https://muaathrifath.me/experience",
  },
};

const roleNotes: Record<string, { summary: string; stack: string[] }> = {
  "Erlang Labs": {
    summary: "Building the services behind AI-powered calls.",
    stack: ["Go", "Python", "PostgreSQL", "LiveKit", "ZITADEL", "Qdrant"],
  },
  "Introspect Labs": {
    summary: "Connecting care, payments, and AI journaling at uyir.ai.",
    stack: ["Next.js", "TypeScript", "LiveKit", "Razorpay", "AWS S3", "Docker"],
  },
};

const sections = [
  ["work", "Work"], ["projects", "Projects"], ["toolkit", "Toolkit"],
  ["credentials", "Credentials"], ["education", "Education"],
];

function SectionHeading({ title, description }: { title: string; description: string }) {
  return <header className="experience-section-heading">
    <div><h2>{title}</h2></div>
    <p>{description}</p>
  </header>;
}

export default function ExperiencePage() {
  return (
    <div className="experience-page">
      <header className="experience-hero experience-container">
        <p className="experience-kicker">Experience & selected work</p>
        <div className="experience-hero-grid">
          <h1>Where I’ve been.<br /><em>What I’ve built.</em></h1>
          <div className="experience-hero-copy">
            <p>From web applications to AI voice systems and connected devices. A closer look at what I’ve built, the problems I’ve worked on, and the tools I use.</p>
            <Link href="/resume" className="experience-text-link"><FileText size={17} aria-hidden="true" /> View my resume <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </div>
        </div>
        <nav className="experience-section-nav" aria-label="Experience sections">
          {sections.map(([id, label]) => <a key={id} href={`#${id}`}>{label}<ArrowDown size={14} aria-hidden="true" /></a>)}
        </nav>
      </header>

      <section id="work" className="experience-section experience-container">
        <SectionHeading title="Where I’ve contributed" description="Professional work, from product interfaces to the services behind them." />
        <div className="experience-work-list">
          {[...workExperience].reverse().map((experience) => {
            const note = roleNotes[experience.company];
            const current = experience.duration.includes("Present");
            return <article key={experience.company} className="experience-role">
              <div className="experience-role-meta">
                <p className="experience-date">{experience.duration}</p>
                {current && <span className="experience-current"><span />Current role</span>}
                <p>{experience.type}</p>
                <p>{experience.location}</p>
              </div>
              <div className="experience-role-content">
                <div className="experience-company"><Image src={experience.logoPath} width={40} height={40} alt="" /><div><h3>{experience.role}</h3><p>{experience.company}</p></div></div>
                <p className="experience-role-summary">{note.summary}</p>
                <ul className="experience-bullets">{experience.bullets.slice(0, 2).map(bullet => <li key={bullet}>{bullet}</li>)}</ul>
                <details className="experience-details">
                  <summary><span className="experience-details-closed">Explore contributions ({experience.bullets.length - 2})</span><span className="experience-details-open">Show fewer contributions</span><ChevronDown size={16} aria-hidden="true" /></summary>
                  <ul className="experience-bullets">{experience.bullets.slice(2).map(bullet => <li key={bullet}>{bullet}</li>)}</ul>
                </details>
                <ul className="experience-tags" aria-label="Technologies used">{note.stack.map(name => <li key={name}>{name}</li>)}</ul>
              </div>
            </article>;
          })}
        </div>
      </section>

      <section id="projects" className="experience-section experience-projects-section">
        <div className="experience-container">
          <SectionHeading title="Ideas, built into software" description="Personal projects across mobile, the web, and connected homes." />
          <div className="experience-project-grid">
            {projectsData.map((project, index) => <article key={project.title} className={`experience-project ${index < 2 ? "experience-project-featured" : ""}`}>
              <div className="experience-project-top"><Image src={project.imageUrl} width={800} height={450} sizes="(max-width: 639px) 90vw, (max-width: 1023px) 45vw, 560px" alt={`${project.title} project preview`} /></div>
              <h3><a href={project.projectUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} source on GitHub (opens in a new tab)`}>{project.title}<ArrowUpRight size={22} aria-hidden="true" /></a></h3>
              <p>{project.description}</p>
              <ul className="experience-tags" aria-label="Project technologies">{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
              <a className="experience-text-link" href={project.projectUrl} target="_blank" rel="noopener noreferrer">Explore source <ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only"> for {project.title} on GitHub (opens in a new tab)</span></a>
            </article>)}
          </div>
        </div>
      </section>

      <section id="toolkit" className="experience-section experience-container">
        <SectionHeading title="Tools I work with" description="The languages, frameworks, and infrastructure behind the work." />
        <dl className="experience-toolkit">
          {[
            { title: "Languages", items: [{ name: "Go", imagePath: null }, ...programmingLanguages] },
            { title: "Frontend", items: frontend },
            { title: "Backend & data", items: backend },
            { title: "Infrastructure & tools", items: devopsTools },
          ].map(group => (
            <div key={group.title}>
              <dt>{group.title}</dt>
              <dd>
                <ul className="experience-tool-grid">
                  {group.items.map(item => (
                    <li className="experience-tool" key={item.name}>
                      <span className="experience-tool-icon">
                        {item.imagePath ? (
                          <Image src={item.imagePath} width={48} height={48} alt="" />
                        ) : (
                          <SiGo size={48} aria-hidden="true" />
                        )}
                      </span>
                      <span>{item.name}</span>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="credentials" className="experience-section experience-container">
        <SectionHeading title="Continuing to learn" description="Courses and certifications that complement hands-on work." />
        <div className="experience-credentials">
          {licensesCertifications.map(cert => <a key={cert.title} className="experience-credential" href={cert.certificateLink} target="_blank" rel="noopener noreferrer">
            <span className="experience-credential-icon"><Award size={22} aria-hidden="true" /></span>
            <div><h3>{cert.title}</h3><p>{cert.issuer} <span aria-hidden="true">·</span> {cert.issueDate}</p></div>
            <ArrowUpRight size={20} aria-hidden="true" /><span className="sr-only">View certificate (opens in a new tab)</span>
          </a>)}
        </div>
      </section>

      <section id="education" className="experience-section experience-container">
        <SectionHeading title="Engineering foundations" description="The academic side of building things." />
        {educations.map(education => <article className="experience-education" key={education.institution}>
          <p className="experience-date">{education.duration}</p>
          <div><h3>{education.degree}</h3><p className="experience-institution">{education.institution}</p><p>{education.description}</p></div>
        </article>)}
      </section>

      <section className="experience-contact experience-container" aria-labelledby="experience-contact-title">
        <div><p className="experience-kicker">Let’s put this experience to work</p><h2 id="experience-contact-title">What are you<br /><em>working on?</em></h2></div>
        <div><p>Have a product to build or a problem to work through? I’d love to hear about it.</p><Link href="/contact" className="experience-button">Discuss your project <ArrowUpRight size={19} aria-hidden="true" /></Link></div>
      </section>
    </div>
  );
}
