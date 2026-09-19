import { ImageResponse } from "next/og";
import { OgImage } from "@/components/og-image";

export const runtime = "edge";
export const alt = "Contact Muaath Rifath";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(<OgImage eyebrow="Let’s work together" title="Start a conversation" description="MVPs, websites, ecommerce, and custom software. Tell me what you want to build." />, size);
}
