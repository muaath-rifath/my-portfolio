# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # Start development server
pnpm build      # Build for production
pnpm start      # Start production server
pnpm lint       # Run ESLint
```

## Architecture

This is a **Next.js 16 App Router** portfolio site using React 19, TypeScript, Tailwind CSS v4, and Framer Motion.

### Route structure (`app/`)

- `/` — Home: `HeroSection` (3D model + typewriter) + `AboutSection`
- `/experience` — Skills, projects, certifications, education (all data is hardcoded in the page file)
- `/contact` — Contact form backed by Firebase Firestore + reCAPTCHA v3
- `/resume` — Resume viewer/download
- `/blog` — Blog page

### Key architectural patterns

**Boot sequence**: On first page load, `BootSequence` (a full-screen overlay in the root layout) runs a terminal-style animation. It manipulates `main` opacity directly via DOM (`opacity-0` initially in layout, set to `1` after boot completes). The `nojs` class on `<html>` is removed by the boot sequence. On back/forward navigation the sequence is skipped.

**Server/Client split**: Most page-level components in `app/` are Server Components. Interactive components use `"use client"`. The contact page itself is `"use client"` due to scroll animations via `IntersectionObserver`. The 3D model is loaded with `dynamic()` and `ssr: false`.

**Animated components** (`components/animated/`): Reusable animated wrappers — `PageEntryWrapper`, `AnimatedSectionTitle`, `AnimatedBackground`, and grid components (`ProgrammingLanguagesGrid`, `FrameworksGrid`, `ToolsGrid`, `ProjectsGrid`, `CertificationsGrid`). These wrap data passed as props with Framer Motion animations.

**Background/visual layer**: `BackgroundElements` (global, in root layout) renders decorative circuit-board SVG elements. `AnimatedBackground` is used inside the experience page for additional decoration. The design uses a tech/circuit-board aesthetic throughout with green accent colors (`#006b42` light, `#8fffaa` dark).

**Contact form flow**: `ContactForm` (client component) → calls `submitContact` server action (`app/_actions/contact.ts`) → verifies reCAPTCHA v3 via Google API → saves to Firestore via Firebase Admin SDK. Required env vars: `FIREBASE_SERVICE_ACCOUNT_KEY` (JSON string), `RECAPTCHA_SECRET_KEY`.

**3D models**: `components/model-3d.tsx` wraps `@react-three/fiber` + `@react-three/drei`. Individual model geometries live in `components/3d-models/`. The hero section loads `Model3D` dynamically with `ssr: false`.

**Theme**: `next-themes` with `ThemeProvider` wrapping the entire app. Dark/light toggle via `ModeToggle`. CSS variables defined in `app/globals.css`. Fonts: Inter (body, `--font-sans`) and PyeongChangPeace (display, `--font-pyeongchang`, loaded from `public/fonts/`).

**UI components** (`components/ui/`): shadcn/ui components. Path alias `@/` maps to project root.

### Content management

All portfolio content (work experience, projects, certifications, skills, education) is **hardcoded** as constants at the top of `app/experience/page.tsx`. To update content, edit those arrays directly. Asset images for skills/certifications are in `public/assets/`.
