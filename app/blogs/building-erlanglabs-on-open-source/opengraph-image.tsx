import { ImageResponse } from "next/og";
import { OgImage } from "@/components/og-image";
import { erlanglabsPost } from "@/lib/blogs/erlanglabs";

export const runtime = "edge";
export const alt = erlanglabsPost.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(<OgImage eyebrow="ErlangLabs · Engineering" title={erlanglabsPost.title} description={erlanglabsPost.description} accent="#f5c66a" />, size);
}
