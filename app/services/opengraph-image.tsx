import { ImageResponse } from "next/og";
import { OgImage } from "@/components/og-image";

export const runtime = "edge";
export const alt = "Freelance development services — Muaath Rifath";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(<OgImage eyebrow="Work with Muaath Rifath" title="Your idea. Built." description="MVPs, business websites, ecommerce, and custom software. Chennai · Working worldwide." />, size);
}
