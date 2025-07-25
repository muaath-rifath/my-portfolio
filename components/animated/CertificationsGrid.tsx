'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { useStaggeredAnimation } from '@/hooks/useScrollAnimation';
import { fadeInUp } from '@/lib/animations';

interface Certification {
  title: string;
  issuer: string;
  issueDate: string;
  description: string;
  certificateLink: string;
  imagePath: string;
  logoPath: string;
}

interface CertificationsGridProps {
  certifications: Certification[];
  delay?: number;
}

export const CertificationsGrid: React.FC<CertificationsGridProps> = ({ certifications, delay = 0 }) => {
  const stagger = useStaggeredAnimation(200);

  return (
    <div className="mt-8">
      <div className="flex flex-wrap justify-center gap-8">
        {certifications.map((certification, index) => (
          <Card
            key={index}
            ref={stagger.addRef(index)}
            style={fadeInUp(stagger.isVisible(index), delay + 150)}
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
  );
};
