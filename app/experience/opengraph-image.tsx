import { ImageResponse } from "next/og";
import { OgImage } from "@/components/og-image";

export const runtime = "edge";
export const alt = "Experience — Muaath Rifath";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(<OgImage eyebrow="Muaath Rifath" title="Experience & expertise" description="Building with TypeScript, Next.js, FastAPI, AI systems, and reliable infrastructure." />, size);
}
