import React from 'react';
import { Metadata } from 'next';
import ResumePageContent from '@/components/ResumePageContent';

export const metadata: Metadata = {
  title: "Resume | Muaath Rifath",
  description: "View and download the resume of Mohamed Muaath Rifath — Software Engineer specializing in scalable backends, AI-integrated frontends, and modern web development.",
  keywords: ["Resume", "CV", "Mohamed Muaath Rifath", "Software Engineer", "Next.js", "TypeScript", "Go", "download"],
  openGraph: {
    title: "Resume | Muaath Rifath",
    description: "View and download the resume of Mohamed Muaath Rifath — Software Engineer specializing in scalable backends, AI-integrated frontends, and modern web development.",
    images: ["/assets/resume-page.png"],
    type: "website",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resume | Muaath Rifath',
    description: 'View and download the resume of Mohamed Muaath Rifath — Software Engineer specializing in scalable backends, AI-integrated frontends, and modern web development.',
    images: '/assets/resume-page.png',
  },
  alternates: {
    canonical: 'https://muaathrifath.me/resume',
  },
};

export default function Resume() {
  return <ResumePageContent />;
}
