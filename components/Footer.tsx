"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconBrandGithub, IconBrandLinkedin, IconBrandX, IconMail } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const navigation = [
  { href: "/experience", label: "Experience" },
  { href: "/services", label: "Freelance services" },
  { href: "/blogs", label: "Blog" },
];

export default function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 mt-auto overflow-hidden border-t border-[#006b42]/10 dark:border-[#8fffaa]/10">
      <div className="absolute inset-0 -z-10 bg-white/70 backdrop-blur-md dark:bg-black/65" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#006b42]/35 to-transparent dark:via-[#8fffaa]/35" />

      <div className="container px-4 py-10 md:px-6 md:py-12">
        <div className="grid gap-10 md:grid-cols-4 md:gap-8">
          <div className="max-w-xs">
            <Link href="/" className="font-mono text-lg font-semibold tracking-tight">
              <span className="text-[#006b42] dark:text-[#8fffaa]">Muaath</span><span className="text-muted-foreground">Rifath</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Freelance developer in Chennai building MVPs, websites, ecommerce stores, and custom software for clients worldwide.
            </p>
          </div>

          <div>
            <FooterHeading indent>Explore</FooterHeading>
            <ul className="mt-4 space-y-3">
              {navigation.map(({ href, label }) => {
                const active = pathname === href;
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={cn(
                        "group flex w-fit items-center gap-3 text-sm transition-colors hover:text-[#006b42] dark:hover:text-[#8fffaa]",
                        active && "font-medium text-[#006b42] dark:text-[#8fffaa]",
                      )}
                    >
                      <span className={cn("h-1 w-1 rounded-full bg-[#006b42]/30 transition-colors group-hover:bg-[#006b42] dark:bg-[#8fffaa]/30 dark:group-hover:bg-[#8fffaa]", active && "bg-[#006b42] dark:bg-[#8fffaa]")} />
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <FooterHeading>Résumé</FooterHeading>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              My experience, skills, and selected projects in one place.
            </p>
            <Link
              href="/resume"
              className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-[#006b42] underline decoration-current/30 underline-offset-4 hover:decoration-current dark:text-[#8fffaa]"
            >
              View résumé <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <div>
            <FooterHeading>Connect</FooterHeading>
            <div className="mt-4 flex items-center gap-1">
              <SocialLink href="https://github.com/muaath-rifath" label="GitHub"><IconBrandGithub size={19} /></SocialLink>
              <SocialLink href="https://linkedin.com/in/muaathrifath" label="LinkedIn"><IconBrandLinkedin size={19} /></SocialLink>
              <SocialLink href="https://x.com/MuaathRifath" label="X"><IconBrandX size={19} /></SocialLink>
              <SocialLink href="mailto:contact@muaathrifath.me" label="Email"><IconMail size={19} /></SocialLink>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Have a product idea or technical challenge?{" "}
              <Link
                href="/contact"
                className="font-medium text-[#006b42] underline decoration-current/30 underline-offset-4 hover:decoration-current dark:text-[#8fffaa]"
              >
                Let’s talk.
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-[#006b42]/10 pt-6 text-xs text-muted-foreground dark:border-[#8fffaa]/10 md:flex-row md:items-center md:justify-between">
          <p>© {currentYear} Muaath Rifath. All rights reserved.</p>
          <p>Built with Next.js and TypeScript.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterHeading({ children, indent = false }: { children: React.ReactNode; indent?: boolean }) {
  return (
    <h3 className={cn("font-mono text-sm font-semibold uppercase tracking-wider text-[#006b42] dark:text-[#8fffaa]", indent && "pl-2")}>{children}</h3>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  const isExternal = href.startsWith("http");
  return (
    <Link
      href={href}
      aria-label={label}
      className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-[#006b42]/10 hover:text-[#006b42] dark:hover:bg-[#8fffaa]/10 dark:hover:text-[#8fffaa]"
      {...(isExternal ? { target: "_blank", rel: "me noopener noreferrer" } : {})}
    >
      {children}
    </Link>
  );
}
