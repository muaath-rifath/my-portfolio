"use client";
import { Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function NotFoundContent() {
  const pathname = usePathname();
  
  return (
    <div className="container flex flex-col items-center justify-center min-h-screen px-4 py-16 mx-auto text-center">
      <div className="relative">
        <h1 className="text-6xl font-bold font-mono tracking-tighter mb-4">
          <span className="dark:text-white text-[#006b42]">404</span>
        </h1>
        <div className="absolute -top-2 -right-2 h-2 w-2 rounded-full dark:bg-[#8fffaa]/30 bg-[#006b42]/30"></div>
        <div className="absolute -bottom-2 -left-2 h-2 w-2 rounded-full dark:bg-[#8fffaa]/30 bg-[#006b42]/30"></div>
      </div>
      
      <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
      
      <p className="text-muted-foreground mb-8 max-w-md">
        Sorry, the page at <code className="px-1 py-0.5 rounded bg-muted">{pathname}</code> doesn't exist or has been moved.
      </p>
      
      <Link 
        href="/" 
        className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded-md text-white dark:bg-[#8fffaa]/80 bg-[#006b42] hover:opacity-90 transition-opacity"
      >
        Return Home
      </Link>
      
      {/* Circuit trace decorations */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-12 h-[1px] w-16 dark:bg-[#8fffaa]/20 bg-[#006b42]/20"></div>
        <div className="absolute bottom-1/4 right-10 h-[1px] w-24 dark:bg-[#8fffaa]/20 bg-[#006b42]/20"></div>
        <div className="absolute top-1/3 right-1/4 h-2 w-2 rounded-full dark:bg-[#8fffaa]/30 bg-[#006b42]/30"></div>
        <div className="absolute bottom-1/3 left-1/4 h-1.5 w-1.5 rounded-full dark:bg-[#8fffaa]/20 bg-[#006b42]/20"></div>
      </div>
    </div>
  );
}

export default function NotFound() {
  return (
    <Suspense fallback={
      <div className="container flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    }>
      <NotFoundContent />
    </Suspense>
  );
} 