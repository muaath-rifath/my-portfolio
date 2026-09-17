import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Muaath Rifath",
  description: "Get in touch with Mohamed Muaath Rifath for a product, technical challenge, or collaboration.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | Muaath Rifath",
    description: "Start a conversation with Mohamed Muaath Rifath about your next product or technical challenge.",
    images: ["/assets/contact-page.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Muaath Rifath",
    description: "Start a conversation with Mohamed Muaath Rifath about your next product or technical challenge.",
    images: ["/assets/contact-page.png"],
  },
};

export default function ContactLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
