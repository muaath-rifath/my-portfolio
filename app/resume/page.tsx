import React from 'react';
import { Metadata } from 'next';
import ResumePageContent from '@/components/ResumePageContent';

export const metadata: Metadata = {
  title: "Resume | Muaath Rifath",
  description: "View and download the resume of Mohamed Muaath Rifath, an ECE student specializing in IoT and Embedded Systems.",
  keywords: ["Resume", "CV", "Mohamed Muaath Rifath", "IoT", "embedded systems", "ECE", "download"],
  openGraph: {
    title: "Resume | Muaath Rifath",
    description: "View and download the resume of Mohamed Muaath Rifath, an ECE student specializing in IoT and Embedded Systems.",
    images: ["/assets/resume-page.png"],
    type: "website",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resume | Muaath Rifath',
    description: 'View and download the resume of Mohamed Muaath Rifath, an ECE student specializing in IoT and Embedded Systems.',
    images: '/assets/resume-page.png',
  },
  alternates: {
    canonical: 'https://muaathrifath.tech/resume',
  },
};

export default function Resume() {
  return <ResumePageContent />;
}
