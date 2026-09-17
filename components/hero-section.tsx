"use client";

import { useMotionPreference } from "@/hooks/useMotionPreference";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { TypewriterText } from "./typewriter-text";
import dynamic from "next/dynamic";
import { useInView, useMotionValue } from "framer-motion";
import { ArrowDown, ArrowUpRight, MoveUpRight } from "lucide-react";
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
  const [spinComplete, setSpinComplete] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const canRender3D = use3dCapability();
  const spinCompleted = useRef(false);
  const spinCueTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const completeSpin = useCallback(() => {
    spinCompleted.current = true;
    if (spinCueTimer.current) clearTimeout(spinCueTimer.current);
    setSpinComplete(true);
    setIsSpinning(false);
  }, []);
  const reportSceneReady = useCallback(() => {
    setSceneReady(true);
    document.documentElement.dataset.homeSceneReady = "true";
    window.dispatchEvent(new Event("home-scene-ready"));
  }, []);

  useEffect(() => {
    if (canRender3D === false) window.dispatchEvent(new Event("home-scene-unavailable"));
  }, [canRender3D]);

  useEffect(() => {
    if (reducedMotion || spinComplete) return;

    const isDesktopHero = () => {
      const hero = section.current;
      if (!hero || window.innerWidth < 768) return false;
      const heroTop = hero.offsetTop;
      return Math.abs(window.scrollY - heroTop) <= 1;
    };

    const advanceRotation = (amount: number) => {
      rotationProgress.set(Math.min(1, rotationProgress.get() + amount));
    };

    const showSpinCue = () => {
      if (spinCueTimer.current) clearTimeout(spinCueTimer.current);
      if (spinCompleted.current || rotationProgress.get() >= 1 || !isDesktopHero()) {
        setIsSpinning(false);
        return;
      }
      setIsSpinning(true);
      spinCueTimer.current = setTimeout(() => setIsSpinning(false), 180);
    };

    const handleWheel = (event: WheelEvent) => {
      if (spinCompleted.current || event.deltaY <= 0 || !isDesktopHero()) return;
      event.preventDefault();
      // A long virtual travel distance keeps the complete turn calm even on a fast trackpad flick.
      advanceRotation(Math.min(event.deltaY, 120) / 2800);
      showSpinCue();
    };

    const handleKeydown = (event: KeyboardEvent) => {
      if (spinCompleted.current || !isDesktopHero() || !["ArrowDown", "PageDown", "End", " "].includes(event.key)) return;
      event.preventDefault();
      advanceRotation(0.05);
      showSpinCue();
    };

    const hideCueOnScroll = () => {
      if (spinCueTimer.current) clearTimeout(spinCueTimer.current);
      setIsSpinning(false);
    };

    window.addEventListener("scroll", hideCueOnScroll, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", hideCueOnScroll);
      window.removeEventListener("keydown", handleKeydown);
      if (spinCueTimer.current) clearTimeout(spinCueTimer.current);
    };
  }, [reducedMotion, rotationProgress, spinComplete]);

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
              {canRender3D && <div className="lab-scene-layer"><Model3D progress={rotationProgress} active={sceneVisible} onSpinComplete={completeSpin} onSceneReady={reportSceneReady} /></div>}
            </div>
          </div>
        </div>
        {isSpinning && !spinComplete && !reducedMotion && <div className="lab-hero-bottom"><span className="inline-flex items-center gap-3">Keep scrolling <ArrowDown size={15} /></span></div>}
      </div>
    </section>
  );
}
