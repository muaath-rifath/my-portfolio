'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { FaGraduationCap } from 'react-icons/fa';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { slideInRight } from '@/lib/animations';

interface Education {
  institution: string;
  degree: string;
  duration: string;
  description?: string;
}

interface EducationCardProps {
  education: Education;
  delay?: number;
}

export const EducationCard: React.FC<EducationCardProps> = ({ education, delay = 0 }) => {
  const animation = useScrollAnimation({ threshold: 0.1 });

  return (
    <Card
      ref={animation.ref as React.RefObject<HTMLDivElement>}
      style={slideInRight(animation.isVisible, delay)}
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
  );
};
