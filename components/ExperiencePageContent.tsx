'use client';

import React from 'react';
import { FaGraduationCap } from 'react-icons/fa';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { useScrollAnimation, useParallax, useStaggeredAnimation } from '@/hooks/useScrollAnimation';
import { 
  fadeInUp, 
  fadeInDown, 
  fadeInLeft, 
  fadeInRight, 
  scaleIn, 
  bounceInUp, 
  slideInLeft,
  slideInRight,
  parallax 
} from '@/lib/animations';

// Interfaces remain the same as in the original code
interface Education {
  institution: string;
  degree: string;
  duration: string;
  description?: string;
}

interface ProgrammingLanguage {
  name: string;
  imagePath: string;
}
interface Framework {
  name: string;
  imagePath: string;
}

interface ToolsandInfra {
  name: string;
  imagePath: string;
}
interface LicenseCertification {
  title: string;
  issuer: string;
  issueDate: string;
  description: string;
  certificateLink: string;
  imagePath: string;
  logoPath: string;
}

// Add the Project interface here
interface Project {
  title: string;
  description: string;
  imageUrl: string; // Path relative to /public or an absolute URL
  projectUrl?: string; // Optional link to the live project or repository
  tags: string[];
}

// Arrays remain the same as in the original code
const programmingLanguages: ProgrammingLanguage[] = [
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
const frameworks: Framework[] = [
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
const tools_and_infra:ToolsandInfra[] = [
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
const licensesCertifications: LicenseCertification[] = [
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

const educations: Education[] = [
  {
    institution: 'Aalim Muhammed Salegh College of Engineering, Chennai 600055',
    degree: 'Bachelor of Electronics and Communication Engineering',
    duration: '2022 - 2026',
    description:
      "Pursuing a Bachelor's degree in Electronics and Communication Engineering with a strong foundation in core principles. Relevant coursework includes Microprocessors and Microcontrollers, Embedded Systems, Digital Electronics, Signal Processing, Analog and Digital Communication, and Wireless Communication.",
  },
];

// Add the projectsData array here
const projectsData: Project[] = [
  {
    title: "Portfolio",
    description: "A personal portfolio website showcasing my projects and skills.",
    imageUrl: "/assets/portfolio.png", // Replace with actual image path
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
    projectUrl: "https://github.com/muaath-rifath/threble", // Added project URL
    tags: ["Next.js", "Prisma", "Postgres", "Azure", "Tailwind CSS", "NextAuth"],
  }
];

const ExperiencePageContent: React.FC = () => {
  // Animation hooks with adjusted timing for proper sequence
  const heroAnimation = useScrollAnimation({ threshold: 0.2 });
  const programmingAnimation = useScrollAnimation({ threshold: 0.1 });
  const frameworksAnimation = useScrollAnimation({ threshold: 0.1 });
  const toolsAnimation = useScrollAnimation({ threshold: 0.1 });
  const projectsAnimation = useScrollAnimation({ threshold: 0.1 });
  const certificationsAnimation = useScrollAnimation({ threshold: 0.1 });
  const educationAnimation = useScrollAnimation({ threshold: 0.1 });
  
  // Parallax effects
  const backgroundParallax = useParallax(0.3);
  const circuitParallax = useParallax(0.5);
  
  // Staggered animations with improved timing sequence
  const programmingStagger = useStaggeredAnimation(100); // Faster for first section
  const frameworksStagger = useStaggeredAnimation(80);   // Slightly faster
  const toolsStagger = useStaggeredAnimation(90);        // Medium speed
  const projectsStagger = useStaggeredAnimation(150);    // Slower for larger cards
  const certificationsStagger = useStaggeredAnimation(200); // Slowest for complex cards

  return (
    <section className="relative w-full overflow-hidden" style={{ opacity: 0, animation: 'pageEntryFadeIn 1.2s ease-out 0.5s forwards' }}>
      {/* Animated Circuit trace decorations with parallax */}
      <div 
        className="fixed inset-0 z-0 opacity-10 pointer-events-none"
        style={parallax(circuitParallax.offsetY, 0.3)}
        ref={circuitParallax.ref as React.RefObject<HTMLDivElement>}
      >
        <div className="h-[1px] w-3/4 dark:bg-[#8fffaa]/30 bg-[#006b42]/30 absolute top-40 left-0 transition-all duration-1000"></div>
        <div className="h-[1px] w-1/2 dark:bg-[#8fffaa]/20 bg-[#006b42]/20 absolute top-60 right-0 transition-all duration-1000 delay-200"></div>
        <div className="h-[1px] w-1/3 dark:bg-[#8fffaa]/30 bg-[#006b42]/30 absolute bottom-40 left-1/4 transition-all duration-1000 delay-400"></div>
        
        {/* Animated Nodes */}
        <div className="absolute right-12 top-72 h-2 w-2 rounded-full dark:bg-[#8fffaa]/60 bg-[#006b42]/60 animate-pulse"></div>
        <div className="absolute right-28 top-96 h-1 w-1 rounded-full dark:bg-[#8fffaa]/40 bg-[#006b42]/40 animate-pulse delay-100"></div>
        <div className="absolute left-20 top-80 h-1.5 w-1.5 rounded-full dark:bg-[#8fffaa]/50 bg-[#006b42]/50 animate-pulse delay-200"></div>
        
        {/* Vertical traces */}
        <div className="w-[1px] h-40 dark:bg-[#8fffaa]/30 bg-[#006b42]/30 absolute top-40 left-1/3 transition-all duration-1000 delay-300"></div>
        <div className="w-[1px] h-60 dark:bg-[#8fffaa]/20 bg-[#006b42]/20 absolute top-20 right-1/4 transition-all duration-1000 delay-500"></div>
      </div>
      
      {/* Programming Languages Section - First to appear */}
      <section className="w-full mt-20 relative">
        <div className="container px-4 sm:px-6">
          <div 
            className="relative z-10 mb-8"
            ref={programmingAnimation.ref as React.RefObject<HTMLDivElement>}
            style={fadeInUp(programmingAnimation.isVisible, 0)}
          >
            <h2 className="text-3xl font-bold font-mono tracking-tighter relative inline-block">
              <span className="dark:text-white text-[#006b42]">Programming Languages</span>
              <span className="absolute left-0 bottom-0 h-[2px] w-full dark:bg-[#8fffaa]/50 bg-[#006b42]/50"></span>
            </h2>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-6">
            {programmingLanguages.map((language, index) => (
              <Card 
                key={index}
                ref={programmingStagger.addRef(index)}
                style={bounceInUp(programmingStagger.isVisible(index), 50)}
                className={cn(
                  'p-4 h-full relative group',
                  'rounded-lg border dark:border-gray-700 border-gray-200',
                  'backdrop-blur-sm bg-background/90 transition-all duration-300 hover:shadow-lg hover:shadow-[#006b42]/10 dark:hover:shadow-[#8fffaa]/10',
                  'hover:scale-105 hover:-translate-y-2'
                )}
              >
                <div className="flex justify-center items-center flex-col relative">
                  <div className="bg-white rounded-full p-1 relative mb-2 transition-transform duration-300 group-hover:rotate-6">
                    <Image
                      src={language.imagePath}
                      alt={language.name}
                      height={48}
                      width={48}
                      className="w-16 h-16 filter-none rounded-full" 
                    />
                  </div>
                  <h3 className="dark:text-white text-[#006b42] text-base font-medium font-mono text-center">{language.name}</h3>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Frameworks Section - Second to appear */}
      <section className="w-full mt-16 relative">
        <div className="container px-4 sm:px-6">
          <div 
            className="relative z-10 mb-8"
            ref={frameworksAnimation.ref as React.RefObject<HTMLDivElement>}
            style={fadeInUp(frameworksAnimation.isVisible, 200)}
          >
            <h2 className="text-3xl font-bold font-mono tracking-tighter relative inline-block">
              <span className="dark:text-white text-[#006b42]">Frameworks</span>
              <span className="absolute left-0 bottom-0 h-[2px] w-full dark:bg-[#8fffaa]/50 bg-[#006b42]/50"></span>
            </h2>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-6">
            {frameworks.map((framework, index) => (
              <Card 
                key={index}
                ref={frameworksStagger.addRef(index)}
                style={scaleIn(frameworksStagger.isVisible(index), 30)}
                className={cn(
                  'p-4 h-full relative group',
                  'rounded-lg border dark:border-gray-700 border-gray-200',
                  'backdrop-blur-sm bg-background/90 transition-all duration-300 hover:shadow-lg hover:shadow-[#006b42]/10 dark:hover:shadow-[#8fffaa]/10',
                  'hover:scale-110 hover:rotate-1'
                )}
              >
                <div className="flex justify-center items-center flex-col relative">
                  <div className="bg-white rounded-full p-1 relative mb-2 transition-transform duration-300 group-hover:scale-110">
                    <Image
                      src={framework.imagePath}
                      alt={framework.name}
                      height={48}
                      width={48}
                      className="w-16 h-16 filter-none rounded-full" 
                    />
                  </div>
                  <h3 className="dark:text-white text-[#006b42] text-base font-medium font-mono text-center">{framework.name}</h3>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Infra Section - Third to appear */}
      <section className="w-full mt-16 relative">
        <div className="container px-4 sm:px-6">
          <div 
            className="relative z-10 mb-8"
            ref={toolsAnimation.ref as React.RefObject<HTMLDivElement>}
            style={fadeInUp(toolsAnimation.isVisible, 400)}
          >
            <h2 className="text-3xl font-bold font-mono tracking-tighter relative inline-block">
              <span className="dark:text-white text-[#006b42]">Tools & Infra</span>
              <span className="absolute left-0 bottom-0 h-[2px] w-full dark:bg-[#8fffaa]/50 bg-[#006b42]/50"></span>
            </h2>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-6">
            {tools_and_infra.map((tool, index) => (
              <Card 
                key={index}
                ref={toolsStagger.addRef(index)}
                style={fadeInUp(toolsStagger.isVisible(index), 60)}
                className={cn(
                  'p-4 h-full relative group',
                  'rounded-lg border dark:border-gray-700 border-gray-200',
                  'backdrop-blur-sm bg-background/90 transition-all duration-300 hover:shadow-lg hover:shadow-[#006b42]/10 dark:hover:shadow-[#8fffaa]/10',
                  'hover:scale-105 hover:-rotate-1'
                )}
              >
                <div className="flex justify-center items-center flex-col relative">
                  <div className="bg-white rounded-full p-1 relative mb-2 transition-transform duration-300 group-hover:-rotate-3">
                    <Image
                      src={tool.imagePath}
                      alt={tool.name}
                      height={48}
                      width={48}
                      className="w-16 h-16 filter-none rounded-full object-cover" 
                    />
                  </div>
                  <h3 className="dark:text-white text-[#006b42] text-base font-medium font-mono text-center">{tool.name}</h3>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section - Fourth to appear */}
      <section className="w-full mt-16 relative">
        <div className="container px-4 sm:px-6">
          <div 
            className="relative z-10 mb-8"
            ref={projectsAnimation.ref as React.RefObject<HTMLDivElement>}
            style={fadeInUp(projectsAnimation.isVisible, 600)}
          >
            <h2 className="text-3xl font-bold font-mono tracking-tighter relative inline-block">
              <span className="dark:text-white text-[#006b42]">Projects</span>
              <span className="absolute left-0 bottom-0 h-[2px] w-full dark:bg-[#8fffaa]/50 bg-[#006b42]/50"></span>
            </h2>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-8">
            {projectsData.map((project, index) => (
              <Card
                key={index}
                ref={projectsStagger.addRef(index)}
                style={fadeInUp(projectsStagger.isVisible(index), 100)}
                className={cn(
                  'p-6 w-full max-w-md relative group overflow-hidden',
                  'rounded-lg border dark:border-gray-700 border-gray-200',
                  'backdrop-blur-sm bg-background/90 transition-all duration-500 hover:shadow-lg hover:shadow-[#006b42]/10 dark:hover:shadow-[#8fffaa]/10',
                  'hover:scale-[1.02] hover:-translate-y-1'
                )}
              >
                <div className="relative mb-4 h-48 w-full overflow-hidden rounded-md">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                  />
                   <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-xl font-semibold dark:text-white text-[#006b42] font-mono tracking-tight mb-2 transition-colors group-hover:dark:text-[#8fffaa] group-hover:text-[#004d2e]">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 text-sm">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="text-xs font-mono px-2 py-1 rounded dark:bg-[#8fffaa]/10 bg-[#006b42]/10 dark:text-[#8fffaa] text-[#006b42] transition-all duration-300 hover:scale-105"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {project.projectUrl && (
                  <Link href={project.projectUrl} target="_blank" rel="me" className="inline-block mt-auto">
                    <button className="text-sm font-medium dark:text-[#8fffaa] text-[#006b42] hover:underline font-mono transition-all duration-300 hover:translate-x-1">
                      View Project →
                    </button>
                  </Link>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Licenses and Certifications Section - Fifth to appear */}
      <section className="w-full mt-16 relative">
        <div className="container px-4 sm:px-6">
          <div 
            className="relative z-10 mb-8"
            ref={certificationsAnimation.ref as React.RefObject<HTMLDivElement>}
            style={fadeInUp(certificationsAnimation.isVisible, 800)}
          >
            <h2 className="text-3xl font-bold font-mono tracking-tighter relative inline-block">
              <span className="dark:text-white text-[#006b42]">Licenses and Certifications</span>
              <span className="absolute left-0 bottom-0 h-[2px] w-full dark:bg-[#8fffaa]/50 bg-[#006b42]/50"></span>
            </h2>
          </div>
          <div className="mt-8">
            <div className="flex flex-wrap justify-center gap-8">
              {licensesCertifications.map((certification, index) => (
                <Card
                  key={index}
                  ref={certificationsStagger.addRef(index)}
                  style={scaleIn(certificationsStagger.isVisible(index), 150)}
                  className="w-full max-w-md p-6 mb-8 relative group backdrop-blur-sm bg-background/90 border dark:border-gray-700 border-gray-200 rounded-lg transition-all duration-500 hover:shadow-lg hover:shadow-[#006b42]/10 dark:hover:shadow-[#8fffaa]/10 hover:scale-[1.02] hover:-translate-y-2"
                >
                  <Link href={certification.certificateLink} target="_blank" className="block">
                    {/* Circuit trace decorations */}
                    <div className="absolute top-0 right-0 w-[40%] h-[1px] dark:bg-[#8fffaa]/30 bg-[#006b42]/30 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                    <div className="absolute bottom-0 left-0 w-[40%] h-[1px] dark:bg-[#8fffaa]/30 bg-[#006b42]/30 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100"></div>
                    
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="relative">
                        <Image 
                          src={certification.logoPath} 
                          alt="Certifying Organization Logo"
                          height={32}
                          width={32}
                          className="bg-white rounded-full p-0.5 relative transition-transform duration-300 group-hover:rotate-12"
                        />
                        <div className="absolute -inset-1 rounded-full dark:bg-[#8fffaa]/10 bg-[#006b42]/10 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse"></div>
                      </div>
                      <h3 className="text-lg font-semibold dark:text-white text-[#006b42] font-mono tracking-tight transition-colors group-hover:dark:text-[#8fffaa] group-hover:text-[#004d2e]">
                        {certification.title}
                      </h3>
                    </div>
                    <p className="mt-2 font-medium dark:text-[#8fffaa] text-[#006b42]">{certification.issuer}</p>
                    <p className="mt-2 text-gray-500 dark:text-gray-400 font-mono text-sm">
                      Issued: {certification.issueDate}
                    </p>
                    <div className="mt-4 mb-4 overflow-hidden rounded-lg relative">
                      <Image
                        src={certification.imagePath}
                        alt="Certificate"
                        height={0}
                        width={0}
                        sizes="100vw"
                        className="w-full h-auto object-cover rounded-lg transition-transform duration-700 group-hover:scale-105 group-hover:-rotate-1"
                      />
                      <div className="absolute inset-0 border rounded-lg dark:border-[#8fffaa]/20 border-[#006b42]/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <p className="mt-2 text-gray-600 dark:text-gray-300 leading-relaxed">
                      {certification.description}
                    </p>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education Section - Last to appear */}
      <section className="w-full mt-16 pb-24 relative">
        <div className="container px-4 sm:px-6">
          <div 
            className="relative z-10 mb-8"
            ref={educationAnimation.ref as React.RefObject<HTMLDivElement>}
            style={fadeInUp(educationAnimation.isVisible, 1000)}
          >
            <h2 className="text-3xl font-bold font-mono tracking-tighter relative inline-block">
              <span className="dark:text-white text-[#006b42]">Education</span>
              <span className="absolute left-0 bottom-0 h-[2px] w-full dark:bg-[#8fffaa]/50 bg-[#006b42]/50"></span>
            </h2>
          </div>
          <div className="mt-8 flex justify-center">
            <div className="w-full max-w-3xl">
              {educations.map((education, index) => (
                <Card
                  key={index}
                  style={bounceInUp(educationAnimation.isVisible, 200)}
                  className="p-6 relative group backdrop-blur-sm bg-background/90 border dark:border-gray-700 border-gray-200 rounded-lg transition-all duration-500 hover:shadow-lg hover:shadow-[#006b42]/10 dark:hover:shadow-[#8fffaa]/10 hover:scale-[1.01] hover:-translate-y-1"
                >
                  {/* Circuit trace decorations */}
                  <div className="absolute top-0 right-0 w-[40%] h-[1px] dark:bg-[#8fffaa]/30 bg-[#006b42]/30 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                  <div className="absolute bottom-0 left-0 w-[40%] h-[1px] dark:bg-[#8fffaa]/30 bg-[#006b42]/30 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100"></div>
                  <div className="absolute top-0 right-0 h-[40%] w-[1px] dark:bg-[#8fffaa]/30 bg-[#006b42]/30 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200"></div>
                  <div className="absolute bottom-0 left-0 h-[40%] w-[1px] dark:bg-[#8fffaa]/30 bg-[#006b42]/30 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-300"></div>
                  
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="relative rounded-full p-2 dark:bg-[#8fffaa]/10 bg-[#006b42]/10 transition-transform duration-300 group-hover:rotate-12">
                      <FaGraduationCap className="h-6 w-6 dark:text-[#8fffaa] text-[#006b42]" />
                    </div>
                    <h3 className="text-lg font-semibold dark:text-white text-[#006b42] font-mono tracking-tight transition-colors group-hover:dark:text-[#8fffaa] group-hover:text-[#004d2e]">
                      {education.degree}
                    </h3>
                  </div>
                  <p className="mt-2 font-medium dark:text-[#8fffaa] text-[#006b42]">{education.institution}</p>
                  <p className="mt-2 text-gray-500 dark:text-gray-400 font-mono text-sm">{education.duration}</p>
                  {education.description && (
                    <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                      {education.description}
                    </p>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default ExperiencePageContent;
