'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { useStaggeredAnimation } from '@/hooks/useScrollAnimation';
import { slideInLeft } from '@/lib/animations';

interface Tool {
  name: string;
  imagePath: string;
}

interface ToolsGridProps {
  tools: Tool[];
  delay?: number;
}

export const ToolsGrid: React.FC<ToolsGridProps> = ({ tools, delay = 0 }) => {
  const stagger = useStaggeredAnimation(70);

  return (
    <div className="mt-10 flex flex-wrap justify-center gap-6">
      {tools.map((tool, index) => (
        <Card 
          key={index}
          ref={stagger.addRef(index)}
          style={slideInLeft(stagger.isVisible(index), delay + 40)}
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
  );
};
