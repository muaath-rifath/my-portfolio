"use client";

import { Turnstile as CloudflareTurnstile } from "@marsidev/react-turnstile";

interface TurnstileProps {
  onTokenChange: (token: string | null) => void;
}

export default function Turnstile({ onTokenChange }: TurnstileProps) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  if (!siteKey) {
    return null;
  }

  return (
    <div className="contact-turnstile-shell">
      <div className="contact-turnstile">
        <CloudflareTurnstile
          siteKey={siteKey}
          onSuccess={onTokenChange}
          onExpire={() => onTokenChange(null)}
          onError={() => onTokenChange(null)}
          options={{ action: "contact", theme: "auto", size: "normal" }}
        />
      </div>
    </div>
  );
}
