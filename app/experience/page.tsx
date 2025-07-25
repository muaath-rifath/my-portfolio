import React from 'react';
import { Metadata } from 'next';
import { PageEntryWrapper } from '@/components/animated/PageEntryWrapper';
import { AnimatedBackground } from '@/components/animated/AnimatedBackground';
import { AnimatedSectionTitle } from '@/components/animated/AnimatedSectionTitle';
import { ProgrammingLanguagesGrid } from '@/components/animated/ProgrammingLanguagesGrid';
import { FrameworksGrid } from '@/components/animated/FrameworksGrid';
import { ToolsGrid } from '@/components/animated/ToolsGrid';
import { ProjectsGrid } from '@/components/animated/ProjectsGrid';
import { CertificationsGrid } from '@/components/animated/CertificationsGrid';
import { EducationCard } from '@/components/animated/EducationCard';

// Data arrays - these are server-side and don't need to be client components
const programmingLanguages = [
  { 
    name: 'Arduino',
    imagePath: '/assets/arduino.png' 
  },
  { 
    name: 'JavaScript', 
    imagePath: '/assets/javascript.png' 
  },
  { 
    name: 'TypeScript', 
    imagePath: '/assets/typescript.png' 
  },
  { 
    name: 'Python', 
    imagePath: '/assets/python.png' 
  },
  { 
    name: 'MicroPython', 
    imagePath: '/assets/MicroPython_new_logo.png'
  },
  { 
    name: 'C', 
    imagePath: '/assets/c.png' 
  },
  { 
    name: 'C++',
    imagePath: '/assets/cpp.png' 
  },
];

const frameworks = [
  {
    name: 'Next.js',
    imagePath: '/assets/nextjs-icon.png',
  },
  {
    name: 'React',
    imagePath: '/assets/react.png',
  },
  {
    name: 'Node.js',
    imagePath: '/assets/node-js.webp',
  },
  { 
    name: 'Tailwind', 
    imagePath: '/assets/tailwind.png' 
  },
  {
    name: 'Prisma',
    imagePath: '/assets/prisma-orm.png',
  },
  {
    name: 'Mongoose',
    imagePath: '/assets/mongoose-odm.jpg',
  },
];

const tools_and_infra = [
  {
    name: 'GitHub',
    imagePath: '/assets/github-logo.png',
  },
  {
    name: 'Git',
    imagePath: '/assets/Git-Icon.png',
  },
  {
    name: 'MongoDB',
    imagePath: '/assets/MongoDB.jpg',
  },
  {
    name: 'VSCode',
    imagePath: '/assets/vscode.png',
  },
  { 
    name: 'Arduino IDE', 
    imagePath: '/assets/arduino.png' 
  },
  { 
    name: 'Thonny', 
    imagePath: '/assets/Thonny_logo.png' 
  },
  {
    name: 'Linux',
    imagePath: '/assets/linux.png',
  },
];

const projectsData = [
  {
    title: "Portfolio",
    description: "A personal portfolio website showcasing my projects and skills.",
    imageUrl: "/assets/portfolio.png",
    projectUrl: "https://github.com/muaath-rifath/my-portfolio",
    tags: ["Next.js", "React", "Tailwind CSS"],
  },
  {
    title: "Sol",
    description: "A AI based and privacy focussed smart home automation system using RaspberryPi and ESP32.",
    imageUrl: "/assets/sol.png",
    projectUrl: "https://github.com/muaath-rifath/sol", 
    tags: ["Mistral AI", "ESP-IDF", "MQTT", "Raspberry Pi", "Flask"],
  },
  {
    title: "Threble",
    description: "An open-source social media platform built with Next.js",
    imageUrl: "/assets/threble.png",
    projectUrl: "https://github.com/muaath-rifath/threble",
    tags: ["Next.js", "Prisma", "Postgres", "Azure", "Tailwind CSS", "NextAuth"],
  }
];

const licensesCertifications = [
  {
    title: 'Foundation of Cloud IoT Edge ML',
    issuer: 'NPTEL',
    issueDate: 'April 2024',
    description: 'Foundation of Cloud IoT Edge ML course covering Edge Computing, Cloud Integration, Docker and Kubernetes, Kafka, etc.',
    certificateLink: 'https://archive.nptel.ac.in/noc/Ecertificate/?q=NPTEL24CS26S65351013530593153',
    imagePath: '/assets/NPTEL24CS26S65351013530593153.webp',
    logoPath: '/assets/nptel.png',
  },
  {
    title: 'Career Essentials in GitHub',
    issuer: 'GitHub & LinkedIn Learning',
    issueDate: 'November 2024',
    description: 'Foundation of GitHub and Professional Development course covering version control, collaboration, and professional skills.',
    certificateLink: 'https://www.linkedin.com/learning/certificates/59c0e2acd4349d169fa3b3f2ddb1699dc27de2a7ab90c3676359f855889a0efc',
    imagePath: '/assets/linkedin-github-foundations.jpg',
    logoPath: '/assets/github-logo.png',
  },
  {
    title: 'Career Essentials in Software Development',
    issuer: 'Microsoft & LinkedIn Learning',
    issueDate: 'March 2024',
    description: 'Foundation of Software Development course covering programming, debugging, testing, and deployment.',
    certificateLink: 'https://www.linkedin.com/learning/certificates/2e0a238093805d7199aa48b1f7f2792351f7eeb8dbef4f1c7accc3363fd9bcb9',
    imagePath: '/assets/linkedin-microsoft-sd.jpg',
    logoPath: '/assets/Microsoft_Logo.svg',
  },
  {
    title: 'Python',
    issuer: 'HackerRank',
    issueDate: 'January 2024',
    description: 'Python course covering foundational programming concepts, classes, and data structures.',
    certificateLink: 'https://www.hackerrank.com/certificates/0227798a014b',
    imagePath: '/assets/hackerrank-python.png',
    logoPath: '/assets/HackerRank.png',
  },
];

const educations = [
  {
    institution: 'Aalim Muhammed Salegh College of Engineering, Chennai 600055',
    degree: 'Bachelor of Electronics and Communication Engineering',
    duration: '2022 - 2026',
    description:
      "Pursuing a Bachelor's degree in Electronics and Communication Engineering with a strong foundation in core principles. Relevant coursework includes Microprocessors and Microcontrollers, Embedded Systems, Digital Electronics, Signal Processing, Analog and Digital Communication, and Wireless Communication.",
  },
];

export const metadata: Metadata = {
  title: "Experience | Muaath Rifath",
  description: "Explore the professional experiences of Mohamed Muaath Rifath, including roles in software engineering and frontend development.",
  keywords: ["Experience", "Mohamed Muaath Rifath", "software engineering", "frontend development", "professional experience", "IoT", "embedded systems"],
  openGraph: {
    title: "Experience | Muaath Rifath",
    description: "Explore the professional experiences of Mohamed Muaath Rifath, including roles in software engineering and frontend development.",
    images: ["/assets/expertise-page.png"],
    type: "website",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Experience | Muaath Rifath',
    description: 'Explore the professional experiences of Mohamed Muaath Rifath, including roles in software engineering and frontend development.',
    images: '/assets/expertise-page.png',
  },
  alternates: {
    canonical: 'https://muaathrifath.tech/experience',
  },
};

const ExperienceSection: React.FC = () => {
  return (
    <PageEntryWrapper>
      <section className="relative w-full overflow-hidden">
        <AnimatedBackground />
        
        {/* Programming Languages Section */}
        <section className="w-full mt-20 relative">
          <div className="container px-4 sm:px-6">
            <AnimatedSectionTitle delay={0}>
              <h2 className="text-3xl font-bold font-mono tracking-tighter relative inline-block">
                <span className="dark:text-white text-[#006b42]">Programming Languages</span>
                <span className="absolute left-0 bottom-0 h-[2px] w-full dark:bg-[#8fffaa]/50 bg-[#006b42]/50"></span>
              </h2>
            </AnimatedSectionTitle>
            <ProgrammingLanguagesGrid languages={programmingLanguages} delay={300} />
          </div>
        </section>

        {/* Frameworks Section */}
        <section className="w-full mt-16 relative">
          <div className="container px-4 sm:px-6">
            <AnimatedSectionTitle delay={200}>
              <h2 className="text-3xl font-bold font-mono tracking-tighter relative inline-block">
                <span className="dark:text-white text-[#006b42]">Frameworks</span>
                <span className="absolute left-0 bottom-0 h-[2px] w-full dark:bg-[#8fffaa]/50 bg-[#006b42]/50"></span>
              </h2>
            </AnimatedSectionTitle>
            <FrameworksGrid frameworks={frameworks} delay={500} />
          </div>
        </section>

        {/* Tools & Infra Section */}
        <section className="w-full mt-16 relative">
          <div className="container px-4 sm:px-6">
            <AnimatedSectionTitle delay={400}>
              <h2 className="text-3xl font-bold font-mono tracking-tighter relative inline-block">
                <span className="dark:text-white text-[#006b42]">Tools & Infra</span>
                <span className="absolute left-0 bottom-0 h-[2px] w-full dark:bg-[#8fffaa]/50 bg-[#006b42]/50"></span>
              </h2>
            </AnimatedSectionTitle>
            <ToolsGrid tools={tools_and_infra} delay={700} />
          </div>
        </section>

        {/* Projects Section */}
        <section className="w-full mt-16 relative">
          <div className="container px-4 sm:px-6">
            <AnimatedSectionTitle delay={600}>
              <h2 className="text-3xl font-bold font-mono tracking-tighter relative inline-block">
                <span className="dark:text-white text-[#006b42]">Projects</span>
                <span className="absolute left-0 bottom-0 h-[2px] w-full dark:bg-[#8fffaa]/50 bg-[#006b42]/50"></span>
              </h2>
            </AnimatedSectionTitle>
            <ProjectsGrid projects={projectsData} delay={900} />
          </div>
        </section>
        {/* Licenses and Certifications Section */}
        <section className="w-full mt-16 relative">
          <div className="container px-4 sm:px-6">
            <AnimatedSectionTitle delay={800}>
              <h2 className="text-3xl font-bold font-mono tracking-tighter relative inline-block">
                <span className="dark:text-white text-[#006b42]">Licenses and Certifications</span>
                <span className="absolute left-0 bottom-0 h-[2px] w-full dark:bg-[#8fffaa]/50 bg-[#006b42]/50"></span>
              </h2>
            </AnimatedSectionTitle>
            <CertificationsGrid certifications={licensesCertifications} delay={1100} />
          </div>
        </section>

        {/* Education Section */}
        <section className="w-full mt-16 pb-24 relative">
          <div className="container px-4 sm:px-6">
            <AnimatedSectionTitle delay={1000}>
              <h2 className="text-3xl font-bold font-mono tracking-tighter relative inline-block">
                <span className="dark:text-white text-[#006b42]">Education</span>
                <span className="absolute left-0 bottom-0 h-[2px] w-full dark:bg-[#8fffaa]/50 bg-[#006b42]/50"></span>
              </h2>
            </AnimatedSectionTitle>
            <div className="mt-8 flex justify-center">
              <div className="w-full max-w-3xl">
                {educations.map((education, index) => (
                  <EducationCard 
                    key={index}
                    education={education}
                    delay={1300}
                  />
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
