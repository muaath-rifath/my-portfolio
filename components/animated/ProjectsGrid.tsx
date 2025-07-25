'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { useStaggeredAnimation } from '@/hooks/useScrollAnimation';
import { fadeInUp } from '@/lib/animations';

interface Project {
  title: string;
  description: string;
  imageUrl: string;
  projectUrl?: string;
  tags: string[];
}

interface ProjectsGridProps {
  projects: Project[];
  delay?: number;
}

export const ProjectsGrid: React.FC<ProjectsGridProps> = ({ projects, delay = 0 }) => {
  const stagger = useStaggeredAnimation(150);

  return (
    <div className="mt-8 flex flex-wrap justify-center gap-8">
      {projects.map((project, index) => (
        <Card
          key={index}
          ref={stagger.addRef(index)}
          style={fadeInUp(stagger.isVisible(index), delay + 100)}
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
  );
};
