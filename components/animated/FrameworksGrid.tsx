'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { useStaggeredAnimation } from '@/hooks/useScrollAnimation';
import { scaleIn } from '@/lib/animations';

interface Framework {
  name: string;
  imagePath: string;
}

interface FrameworksProps {
  frameworks: Framework[];
  delay?: number;
}

export const FrameworksGrid: React.FC<FrameworksProps> = ({ frameworks, delay = 0 }) => {
  const stagger = useStaggeredAnimation(60);

  return (
    <div className="mt-10 flex flex-wrap justify-center gap-6">
      {frameworks.map((framework, index) => (
        <Card 
          key={index}
          ref={stagger.addRef(index)}
          style={scaleIn(stagger.isVisible(index), delay + 30)}
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
  );
};
