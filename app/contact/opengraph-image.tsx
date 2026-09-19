import { ImageResponse } from "next/og";
import { OgImage } from "@/components/og-image";

export const runtime = "edge";
export const alt = "Contact Muaath Rifath";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(<OgImage eyebrow="Let’s work together" title="Start a conversation" description="Have a product, technical challenge, or collaboration in mind? Get in touch." />, size);
}
