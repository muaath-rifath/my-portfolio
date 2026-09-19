import { ImageResponse } from "next/og";
import { OgImage } from "@/components/og-image";

export const runtime = "edge";
export const alt = "Blog — Muaath Rifath";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(<OgImage eyebrow="Muaath Rifath" title="Engineering stories" description="Notes on voice AI, distributed backends, and the systems behind the product." />, size);
}
