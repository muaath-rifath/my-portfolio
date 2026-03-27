'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FaBriefcase } from 'react-icons/fa';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { slideInRight } from '@/lib/animations';

interface WorkExperience {
  company: string;
  role: string;
  location: string;
  duration: string;
  type: string;
  bullets: string[];
  logoPath?: string;
}

interface WorkExperienceCardProps {
  experience: WorkExperience;
  delay?: number;
  isLast?: boolean;
}

export const WorkExperienceCard: React.FC<WorkExperienceCardProps> = ({
  experience,
  delay = 0,
  isLast = false,
}) => {
  const animation = useScrollAnimation({ threshold: 0.1 });
  const [expanded, setExpanded] = useState(false);
  const PREVIEW = 2;
  const hasMore = experience.bullets.length > PREVIEW;
  const visibleBullets = expanded ? experience.bullets : experience.bullets.slice(0, PREVIEW);

  return (
    <div className="relative flex gap-5">
      {/* Tree node column */}
      <div className="relative flex flex-col items-center">
        {/* Circle node */}
        <div className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full shrink-0 border-2 dark:border-[#8fffaa]/60 border-[#006b42]/60 overflow-hidden ${experience.logoPath ? 'bg-white' : 'dark:bg-[#0e3320] bg-[#e6f5ee]'}`}>
          {experience.logoPath ? (
            <Image
              src={experience.logoPath}
              alt={experience.company}
              fill
              className="object-contain p-0.5"
            />
          ) : (
            <FaBriefcase className="h-4 w-4 dark:text-[#8fffaa] text-[#006b42]" />
          )}
        </div>
        {/* Trunk line below node */}
        {!isLast && (
          <div className="w-[2px] flex-1 mt-1 dark:bg-[#8fffaa]/20 bg-[#006b42]/20 min-h-8" />
        )}
      </div>

      {/* Card */}
      <div
        ref={animation.ref as React.RefObject<HTMLDivElement>}
        style={slideInRight(animation.isVisible, delay)}
        className="relative flex-1 mb-8 group"
      >
        {/* Horizontal connector */}
        <div className="absolute left-[-1.25rem] top-5 w-5 h-[2px] dark:bg-[#8fffaa]/25 bg-[#006b42]/25" />

        <div className="rounded-lg border dark:border-gray-700 border-gray-200 p-5 backdrop-blur-sm bg-background/90 transition-all duration-500 hover:shadow-lg hover:shadow-[#006b42]/10 dark:hover:shadow-[#8fffaa]/10 hover:-translate-y-1">
          {/* Circuit trace accents */}
          <div className="absolute top-0 right-0 w-[40%] h-[1px] dark:bg-[#8fffaa]/30 bg-[#006b42]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="absolute bottom-0 left-0 w-[40%] h-[1px] dark:bg-[#8fffaa]/30 bg-[#006b42]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100" />
          <div className="absolute top-0 right-0 h-[40%] w-[1px] dark:bg-[#8fffaa]/30 bg-[#006b42]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200" />
          <div className="absolute bottom-0 left-0 h-[40%] w-[1px] dark:bg-[#8fffaa]/30 bg-[#006b42]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-300" />

          <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
            <div>
              <h3 className="text-lg font-semibold dark:text-white text-[#006b42] font-mono tracking-tight transition-colors group-hover:dark:text-[#8fffaa] group-hover:text-[#004d2e]">
                {experience.role}
              </h3>
              <p className="font-medium dark:text-[#8fffaa] text-[#006b42]">
                {experience.company}
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-gray-500 dark:text-gray-400 font-mono text-sm">
                {experience.duration}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{experience.type}</p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-3">{experience.location}</p>

          {experience.bullets.length > 0 && (
            <>
              <ul className="space-y-2">
                {visibleBullets.map((bullet, i) => (
                  <li key={i} className="flex text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                    <span className="mr-2 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full dark:bg-[#8fffaa]/60 bg-[#006b42]/60" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              {hasMore && (
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="mt-3 text-sm font-medium dark:text-[#8fffaa] text-[#006b42] hover:underline underline-offset-2 transition-colors"
                >
                  {expanded ? 'Read less' : `Read more (${experience.bullets.length - PREVIEW} more)`}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
