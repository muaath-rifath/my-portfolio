import type { MetadataRoute } from "next";

const baseUrl = "https://muaathrifath.me";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/experience", "/resume", "/contact", "/blogs", "/blogs/building-erlanglabs-on-open-source"].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "monthly" : "yearly",
    priority: path === "" ? 1 : 0.7,
  }));
}
