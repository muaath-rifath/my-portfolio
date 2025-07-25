"use client";

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

type Role = {
  text: string;
  highlightParts: string[];
};

const roles: Role[] = [
  { 
    text: "IoT Engineer", 
    highlightParts: ["IoT"] 
  },
  { 
    text: "Full Stack Developer", 
    highlightParts: ["Full Stack"] 
  }
];

export function TypewriterText() {
  const [currentRole, setCurrentRole] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [delta, setDelta] = useState(100); // typing speed
  
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
    
    // Split text into parts for highlighting
    let parts: (string | { text: string; highlight: boolean })[] = [text];
    
    highlightParts.forEach(part => {
      if (text.includes(part)) {
        parts = parts.flatMap(p => {
          if (typeof p === 'string' && p.includes(part)) {
            const splitParts = p.split(part);
            const result: (string | { text: string; highlight: boolean })[] = [];
            for (let i = 0; i < splitParts.length; i++) {
              if (splitParts[i]) result.push(splitParts[i]);
              if (i < splitParts.length - 1) {
                result.push({ text: part, highlight: true });
              }
            }
            return result;
          }
          return [p];
        });
      }
    });
    
    return (
      <span className="font-mono text-sm font-semibold tracking-wide">
        {parts.map((part, index) => {
          if (typeof part === 'string') {
            return <span key={index}>{part}</span>;
          } else {
            return (
              <span 
                key={index}
                className="font-bold text-[#006b42] dark:text-[#00ff88]"
              >
                {part.text}
              </span>
            );
          }
        })}
      </span>
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
    </div>
  );
}
