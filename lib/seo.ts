import type { Metadata } from "next";

export const siteUrl = "https://www.muaathrifath.me";
export const personId = `${siteUrl}/#person`;
export const siteDescription = "Freelance developer in Chennai building MVPs, business websites, ecommerce stores, and custom software. Work directly with Muaath Rifath on your next project.";

export function pageMetadata(title: string, description: string, path: string, type: "website" | "article" = "website"): Metadata {
  const pathname = new URL(path, siteUrl).pathname;
  const imagePath = pathname.startsWith("/services/") ? "/services/opengraph-image" : `${pathname === "/" ? "" : pathname}/opengraph-image`;
  const images = [{ url: new URL(imagePath, siteUrl).href, width: 1200, height: 630, alt: `${title} | Muaath Rifath` }];
  const fullTitle = `${title} | Muaath Rifath`;
  return {
    title: fullTitle,
    description,
    alternates: { canonical: path },
    openGraph: { title: fullTitle, description, url: path, type, siteName: "Muaath Rifath", locale: "en_US", images },
    twitter: { card: "summary_large_image", title: fullTitle, description, creator: "@MuaathRifath", images },
  };
}
