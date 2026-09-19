import { ImageResponse } from "next/og";
import { OgImage } from "@/components/og-image";

export const runtime = "edge";
export const alt = "Mohamed Muaath Rifath — Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <OgImage eyebrow="Mohamed Muaath Rifath" title="Full-Stack Developer" description="Backend services, AI voice systems, and products built to last." />,
    size,
  );
}
