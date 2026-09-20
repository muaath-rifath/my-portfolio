"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";

type TurnstileOptions = {
  sitekey: string;
  action: string;
  theme: "auto" | "light" | "dark";
  size: "compact" | "flexible";
  callback: (token: string) => void;
  "error-callback": () => void;
  "expired-callback": () => void;
};

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: TurnstileOptions) => string;
      remove: (widgetId: string) => void;
    };
  }
}

interface TurnstileProps {
  onTokenChange: (token: string | null) => void;
}

export default function Turnstile({ onTokenChange }: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 479px)");
    const updateSize = () => setIsCompact(mediaQuery.matches);

    updateSize();
    mediaQuery.addEventListener("change", updateSize);
    return () => mediaQuery.removeEventListener("change", updateSize);
  }, []);

  const renderWidget = useCallback(() => {
    if (!siteKey || !containerRef.current || !window.turnstile || widgetIdRef.current) {
      return;
    }

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      action: "contact",
      theme: "auto",
      size: isCompact ? "compact" : "flexible",
      callback: (token) => onTokenChange(token),
      "error-callback": () => onTokenChange(null),
      "expired-callback": () => onTokenChange(null),
    });
  }, [isCompact, onTokenChange, siteKey]);

  useEffect(() => {
    renderWidget();

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
      }
      widgetIdRef.current = null;
    };
  }, [renderWidget]);

  if (!siteKey) {
    return null;
  }

  return (
    <>
      <Script
        id="cloudflare-turnstile"
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onLoad={renderWidget}
      />
      <div ref={containerRef} className="contact-turnstile" />
    </>
  );
}
