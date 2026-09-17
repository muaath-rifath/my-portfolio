"use client";

import { useMotionPreference } from "@/hooks/useMotionPreference";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { TypewriterText } from "./typewriter-text";
import dynamic from "next/dynamic";
import { useInView, useMotionValue } from "framer-motion";
import { ArrowUpRight, MoveUpRight } from "lucide-react";
import { IconBrandGithub, IconBrandLinkedin, IconBrandX } from "@tabler/icons-react";
import { use3dCapability } from "@/hooks/use-3d-capability";

const Model3D = dynamic(() => import("./home-model-3d").then(mod => mod.HomeModel3D), {
  ssr: false,
  loading: () => null,
});

export function HeroSection() {
  const section = useRef<HTMLElement>(null);
  const reducedMotion = useMotionPreference();
  const sceneVisible = useInView(section);
  const rotationProgress = useMotionValue(0);
  const [sceneReady, setSceneReady] = useState(false);
  const canRender3D = use3dCapability();
  const reportSceneReady = useCallback(() => {
    setSceneReady(true);
    document.documentElement.dataset.homeSceneReady = "true";
    window.dispatchEvent(new Event("home-scene-ready"));
  }, []);

  useEffect(() => {
    if (canRender3D === false) window.dispatchEvent(new Event("home-scene-unavailable"));
  }, [canRender3D]);

  return (
    <section ref={section} className={`lab-hero ${reducedMotion ? "lab-reduced" : ""}`}>
      <div className="lab-sticky">
        <div className="lab-hero-inner">
          <div className="lab-intro">
            <p className="lab-eyebrow">Hi, I’m</p>
            <h1><span>Mohamed</span>{" "}<span>Muaath</span>{" "}<span className="lab-name-outline">Rifath<span className="lab-name-dot">.</span></span></h1>
            <div className="lab-hero-role"><TypewriterText /></div>
            <p className="mt-5 max-w-[42ch] text-base leading-relaxed text-muted-foreground">I build the backend services, APIs, and AI voice systems that power the experience.</p>
            <div className="lab-actions">
              <Link href="/experience" className="lab-button">Explore my work <ArrowUpRight size={18} /></Link>
              <Link href="/contact" className="lab-contact-link">Let’s talk <MoveUpRight size={16} /></Link>
            </div>
            <div className="lab-socials">
              <a href="https://github.com/muaath-rifath" target="_blank" rel="noopener noreferrer me" aria-label="GitHub"><IconBrandGithub size={20} /></a>
              <a href="https://linkedin.com/in/muaath-rifath" target="_blank" rel="noopener noreferrer me" aria-label="LinkedIn"><IconBrandLinkedin size={20} /></a>
              <a href="https://x.com/MuaathRifath" target="_blank" rel="noopener noreferrer me" aria-label="X"><IconBrandX size={20} /></a>
              <span />
              <Link href="/resume">View resume <ArrowUpRight size={14} /></Link>
            </div>
          </div>
          <div className={`lab-scene-stage ${sceneReady && canRender3D ? "lab-scene-ready" : ""}`}>
            <div className="lab-scene-frame">
              <Image className="lab-scene-poster lab-scene-poster-light" src="/assets/home-hero-poster-light.webp" alt="" aria-hidden="true" fill priority sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1023px) calc(100vw - 64px), 55vw" />
              <Image className="lab-scene-poster lab-scene-poster-dark" src="/assets/home-hero-poster.webp" alt="" aria-hidden="true" fill priority sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1023px) calc(100vw - 64px), 55vw" />
              {canRender3D && <div className="lab-scene-layer"><Model3D progress={rotationProgress} active={sceneVisible} onSceneReady={reportSceneReady} /></div>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
