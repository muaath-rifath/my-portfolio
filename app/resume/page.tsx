import { pageMetadata } from "@/lib/seo";
import React from 'react';
import ResumePageContent from '@/components/ResumePageContent';

export const metadata = pageMetadata(
  "Full-Stack Developer Resume",
  "View and download Muaath Rifath’s resume: full-stack development, Next.js, backend engineering, and AI systems. Explore experience for your next project.",
  "/resume",
);

export default function Resume() {
  return <ResumePageContent />;
}
