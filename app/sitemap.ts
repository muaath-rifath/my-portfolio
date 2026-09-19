import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";
import { services } from "@/lib/services";
import { erlanglabsPost } from "@/lib/blogs/erlanglabs";

export default function sitemap(): MetadataRoute.Sitemap {
  // Omit lastModified until genuine content revision dates are tracked.
  return ["", "/services", ...services.map(({ slug }) => `/services/${slug}`), "/experience", "/resume", "/contact", "/blogs", `/blogs/${erlanglabsPost.slug}`].map((path) => ({ url: `${siteUrl}${path}` }));
}
