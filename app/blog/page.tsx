import React from 'react';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Muaath Rifath",
  description: "Read articles, tutorials, and insights about IoT, embedded systems, and web development from Mohamed Muaath Rifath.",
  keywords: ["Blog", "Mohamed Muaath Rifath", "IoT", "embedded systems", "tutorials", "web development", "technology articles"],
  openGraph: {
    title: "Blog | Muaath Rifath",
    description: "Read articles, tutorials, and insights about IoT, embedded systems, and web development from Mohamed Muaath Rifath.",
    images: ["/assets/blog.svg"],
    type: "website",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Muaath Rifath',
    description: 'Read articles, tutorials, and insights about IoT, embedded systems, and web development from Mohamed Muaath Rifath.',
    images: '/assets/blog.svg',
  },
  alternates: {
    canonical: 'https://muaathrifath.tech/blog',
  },
};

const Blog = () => {
    return (
        <div className="mt-16 sm:mt-32">
            <header className="max-w-2xl">
                <h1 className="text-4xl font-bold font-star tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                    Under Development
                </h1>
                <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
                    {/* Thoughts, ideas, and insights on various topics. */}
                </p>
            </header>
            <div className="mt-16 sm:mt-20">
                {/* Add your blog content here */}
            </div>
        </div>
    );
};

export default Blog;