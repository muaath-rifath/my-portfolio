import { ImageResponse } from "next/og";
import { OgImage } from "@/components/og-image";

export const runtime = "edge";
export const alt = "Resume — Muaath Rifath";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(<OgImage eyebrow="Muaath Rifath" title="Resume" description="Software engineer building scalable backends, AI-integrated frontends, and modern web products." />, size);
}
