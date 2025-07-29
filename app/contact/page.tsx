"use client";
import ContactForm from "@/components/ContactForm";
import ContactInfo from "@/components/ContactInfo";
import { Metadata } from "next";
import { useEffect, useRef, useState } from "react";

const metadata: Metadata = {
  title: "Contact | Muaath Rifath",
  description: "Get in touch with Mohamed Muaath Rifath for any inquiries or collaborations. Fill out the contact form or reach out via email or phone.",
  keywords: ["Contact", "Mohamed Muaath Rifath", "inquiries", "collaborations", "email", "phone"],
  openGraph: {
    title: "Contact | Muaath Rifath",
    description: "Get in touch with Mohamed Muaath Rifath for any inquiries or collaborations. Fill out the contact form or reach out via email or phone.",
    images: ["/assets/contact-page.png"],
    type: "website",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact | Muaath Rifath',
    description: 'Get in touch with Mohamed Muaath Rifath for any inquiries or collaborations. Fill out the contact form or reach out via email or phone.',
    images: '/assets/contact-page.png',
  },
  alternates: {
    canonical: 'https://muaathrifath.tech/contact',
  },
};

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const contactRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const contactObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (contactRef.current) {
      contactObserver.observe(contactRef.current);
    }
    
    if (headerRef.current) {
      headerObserver.observe(headerRef.current);
    }

    return () => {
      contactObserver.disconnect();
      headerObserver.disconnect();
    };
  }, []);

  return (
    <section className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-16 lg:min-h-screen lg:flex lg:flex-col lg:justify-center overflow-hidden">
      {/* Circuit trace decorations */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-40 left-12 h-[1px] w-16 dark:bg-[#8fffaa]/20 bg-[#006b42]/20"></div>
        <div className="absolute bottom-1/4 right-10 h-[1px] w-24 dark:bg-[#8fffaa]/20 bg-[#006b42]/20"></div>
        <div className="absolute top-1/3 right-1/4 h-2 w-2 rounded-full dark:bg-[#8fffaa]/30 bg-[#006b42]/30"></div>
        <div className="absolute bottom-1/3 left-1/4 h-1.5 w-1.5 rounded-full dark:bg-[#8fffaa]/20 bg-[#006b42]/20"></div>
      </div>
      
      {/* Circuit overlay for enhanced tech aesthetic */}
      <div className="absolute inset-0 bg-[url('/assets/circuit-overlay.svg')] bg-no-repeat bg-cover opacity-10 mix-blend-overlay z-0 pointer-events-none"></div>

      {/* Header with circuit-inspired styling */}
      <div 
        ref={headerRef}
        className={`relative z-10 mb-8 mt-10 transition-all duration-1000 ease-out ${
          headerVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        <h1 className="text-4xl md:text-5xl font-bold font-mono tracking-tighter relative inline-block">
          <span className="dark:text-white text-[#006b42]">Get in Touch</span>
          <span className={`absolute left-0 bottom-0 h-[2px] dark:bg-[#8fffaa]/50 bg-[#006b42]/50 transition-all duration-1000 delay-500 ${
            headerVisible ? 'w-full' : 'w-0'
          }`}></span>
        </h1>
        <p className={`mt-4 text-lg text-muted-foreground max-w-2xl transition-all duration-1000 delay-300 ${
          headerVisible 
            ? 'opacity-100 translate-x-0' 
            : 'opacity-0 translate-x-4'
        }`}>
          Have a question or want to work together? Feel free to reach out using the form below or through my contact details.
        </p>
      </div>

      <div 
        ref={contactRef}
        className={`relative z-10 flex flex-col lg:flex-row w-full max-w-4xl mx-auto justify-center items-stretch gap-0 mb-16 group perspective-1000 transition-all duration-1000 ease-out ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        <ContactInfo />
        <ContactForm />
        
        {/* Animation enhancements without breaking layout */}
        {/* Floating particles effect */}
        <div className={`absolute -top-2 -right-2 w-2 h-2 rounded-full dark:bg-[#8fffaa]/60 bg-[#006b42]/60 transition-all duration-1000 delay-700 animate-float-up ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}></div>
        <div className={`absolute -bottom-2 -left-2 w-1.5 h-1.5 rounded-full dark:bg-[#8fffaa]/40 bg-[#006b42]/40 transition-all duration-1000 delay-900 animate-float-side ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}></div>
        <div className={`absolute -top-2 -left-2 w-2 h-2 rounded-full dark:bg-[#8fffaa]/60 bg-[#006b42]/60 transition-all duration-1000 delay-800 animate-float-side ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}></div>
        <div className={`absolute -bottom-2 -right-2 w-1.5 h-1.5 rounded-full dark:bg-[#8fffaa]/40 bg-[#006b42]/40 transition-all duration-1000 delay-1000 animate-float-up ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}></div>

        {/* Central connecting line animation */}
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[2px] h-0 dark:bg-gradient-to-b dark:from-[#8fffaa]/60 dark:via-[#8fffaa]/30 dark:to-transparent bg-gradient-to-b from-[#006b42]/60 via-[#006b42]/30 to-transparent transition-all duration-1500 delay-500 hidden lg:block ${
          isVisible ? 'h-32 opacity-100' : 'h-0 opacity-0'
        }`}></div>
        
        {/* Floating circuit traces */}
        <div className={`absolute top-1/4 left-1/4 w-8 h-[1px] dark:bg-[#8fffaa]/30 bg-[#006b42]/30 transition-all duration-1000 delay-600 ${
          isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
        }`}></div>
        <div className={`absolute bottom-1/4 right-1/4 w-8 h-[1px] dark:bg-[#8fffaa]/30 bg-[#006b42]/30 transition-all duration-1000 delay-700 ${
          isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
        }`}></div>
      </div>
      
      {/* Bottom circuit decoration */}
      <div className="relative z-10 w-full hidden md:block">
        <div className="absolute left-1/4 bottom-0 w-16 h-[1px] dark:bg-[#8fffaa]/20 bg-[#006b42]/20"></div>
        <div className="absolute right-1/4 bottom-0 w-16 h-[1px] dark:bg-[#8fffaa]/20 bg-[#006b42]/20"></div>
      </div>
    </section>
  );
}
