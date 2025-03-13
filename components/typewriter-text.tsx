"use client";

import { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';

type Role = {
  text: string;
  highlightParts: string[];
};

const roles: Role[] = [
  { 
    text: "IoT/Embedded Engineer", 
    highlightParts: ["IoT", "Embedded"] 
  },
  { 
    text: "Full Stack Developer (Freelancer)", 
    highlightParts: ["Full Stack", "Freelancer"] 
  }
];

export function TypewriterText() {
  const [currentRole, setCurrentRole] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [delta, setDelta] = useState(100); // typing speed
  const { theme } = useTheme();
  
  // Track whether we're mounted to avoid hydration issues
  const isMounted = useRef(false);
  
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  
  useEffect(() => {
    const ticker = setTimeout(() => {
      if (!isMounted.current) return;
      
      const role = roles[currentRole].text;
      
      // If deleting, remove a character
      if (isDeleting) {
        setText(text.substring(0, text.length - 1));
      } else {
        // If typing, add a character
        setText(role.substring(0, text.length + 1));
      }
      
      // Adjust typing speed - faster for deleting
      if (isDeleting) {
        setDelta(50); // faster when deleting
      } else {
        setDelta(100); // normal typing speed
      }
      
      // Switch direction or role when done typing/deleting
      if (!isDeleting && text === role) {
        // Pause at the end of typing a full text
        setDelta(2000); // pause before starting to delete
        setIsDeleting(true);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        // Switch to next role
        setCurrentRole((prev) => (prev + 1) % roles.length);
        setDelta(300); // slight pause before typing next text
      }
    }, delta);
    
    return () => clearTimeout(ticker);
  }, [text, isDeleting, currentRole, delta]);
  
  // Generate the component with highlighted parts
  const highlightText = () => {
    if (text === "") return null;
    
    const role = roles[currentRole];
    const highlightParts = role.highlightParts;
    
    let result = text;
    
    // Replace parts to highlight with styled spans
    highlightParts.forEach(part => {
      if (text.includes(part)) {
        const regex = new RegExp(`(${part})`, 'g');
        result = result.replace(regex, `<span class="highlight">$1</span>`);
      }
    });
    
    return (
      <span 
        className="font-mono text-sm font-semibold tracking-wide"
        dangerouslySetInnerHTML={{ __html: result }}
      />
    );
  };
  
  return (
    <div className="flex items-center h-6">
      <div className="h-2 w-2 mr-2 rounded-full bg-green-500"></div>
      
      <div className="inline-flex items-center">
        {highlightText()}
        
        {/* Blinking cursor */}
        <motion.span
          className="h-4 w-[2px] ml-1 dark:bg-white bg-[#006b42]"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 1 }}
        />
      </div>
      
      <style jsx>{`
        .highlight {
          color: ${theme === 'dark' ? '#8fffaa' : '#006b42'};
          font-weight: 700;
        }
      `}</style>
    </div>
  );
}
