import React from 'react';
import { Metadata } from 'next';
import ExperiencePageContent from '@/components/ExperiencePageContent';

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
  return <ExperiencePageContent />;
};

export default ExperienceSection;
