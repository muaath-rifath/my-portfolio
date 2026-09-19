import { ImageResponse } from "next/og";
import { OgImage } from "@/components/og-image";

export const runtime = "edge";
export const alt = "Mohamed Muaath Rifath — Freelance Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <OgImage eyebrow="Mohamed Muaath Rifath" title="Freelance Developer" description="MVPs, websites, ecommerce, and custom software. Built with Muaath Rifath." />,
    size,
  );
}
