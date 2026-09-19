"use client";
import ContactForm from "@/components/ContactForm";
import ContactInfo from "@/components/ContactInfo";
import "./contact.css";
import { useEffect, useRef, useState } from "react";

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
    <section className="contact-page relative container mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-16 lg:min-h-screen lg:flex lg:flex-col lg:justify-center overflow-hidden">
      <div
        ref={headerRef}
        className={`relative z-10 mb-8 mt-10 transition-all duration-500 ease-out ${
          headerVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4'
        }`}
      >
        <h1 className="contact-title text-4xl md:text-5xl relative inline-block">
          Get in <em>Touch</em>
        </h1>
        <p className={`contact-intro mt-4 text-lg text-muted-foreground max-w-2xl transition-all duration-500 delay-100 ${
          headerVisible
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 translate-x-4'
        }`}>
          Need an MVP, business website, ecommerce store, or a custom technical solution? Tell me what you want to build, who it’s for, and your budget and timeline. I’m based in Chennai and work remotely with clients worldwide.
        </p>
      </div>

      <div
        ref={contactRef}
        className={`contact-card relative z-10 flex flex-col lg:flex-row w-full max-w-4xl mx-auto justify-center items-stretch gap-4 lg:gap-0 mb-16 transition-all duration-500 ease-out ${
          isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4'
        }`}
      >
        <ContactInfo />
        <ContactForm />

      </div>
    </section>
  );
}
