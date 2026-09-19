import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Hire a Freelance Developer",
  "Discuss your MVP, website, ecommerce store, or custom software with Muaath Rifath. Share your goals, budget, and timeline to scope your project.",
  "/contact",
);

export default function ContactLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
