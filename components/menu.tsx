"use client";

import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./mode-toggle";
import { useTheme } from "next-themes";

export default function MenuBar() {
  const pathname = usePathname();
  const { theme } = useTheme();
  const [open, setOpen] = React.useState(false);
  
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden dark:hover:bg-[#8fffaa]/10 hover:bg-[#006b42]/10 relative"
        >
          <Menu className="h-5 w-5 dark:text-white text-[#006b42]" />
          <span className="sr-only">Open menu</span>
          
          {/* Circuit trace decorations */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1 right-1 h-0.5 w-1.5 dark:bg-[#8fffaa]/30 bg-[#006b42]/30"></div>
            <div className="absolute bottom-1 left-1 h-0.5 w-1.5 dark:bg-[#8fffaa]/30 bg-[#006b42]/30"></div>
          </div>
        </Button>
      </SheetTrigger>
      
      <SheetContent 
        side="left"
        className="w-[280px] sm:w-[350px] border-r dark:border-[#8fffaa]/20 border-[#006b42]/20 dark:bg-[#111]/95 bg-white/95 backdrop-blur-sm p-0"
      >
        {/* Theme toggle positioned at top right */}
        <div className="absolute top-4 right-4 z-20">
          <ModeToggle />
        </div>
        
        {/* Circuit pattern overlay */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-20 right-4 h-1.5 w-1.5 rounded-full dark:bg-[#8fffaa]/20 bg-[#006b42]/10"></div>
          <div className="absolute top-32 left-12 h-0.5 w-8 dark:bg-[#8fffaa]/10 bg-[#006b42]/10"></div>
          <div className="absolute bottom-40 right-8 h-2 w-2 rounded-full dark:bg-[#8fffaa]/10 bg-[#006b42]/10"></div>
          <div className="absolute top-1/2 left-4 h-0.5 w-12 dark:bg-[#8fffaa]/10 bg-[#006b42]/10"></div>
          <div className="absolute bottom-24 left-20 h-1 w-1 rounded-full dark:bg-[#8fffaa]/10 bg-[#006b42]/10"></div>
        </div>
        
        {/* Simplified navigation links - starts higher without the header */}
        <div className="pt-16 px-4 pb-6">
          <div className="space-y-1">
            {sidebarLinks.map((link) => {
              const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;
              return (
                <Link
                  key={link.label}
                  href={link.route}
                  onClick={() => setOpen(false)}
                  className={`
                    block px-4 py-3 rounded-md font-mono transition-colors relative group
                    ${isActive 
                      ? 'dark:text-[#8fffaa] dark:bg-[#8fffaa]/10 text-[#006b42] bg-[#006b42]/10 font-semibold' 
                      : 'dark:text-gray-300 text-gray-700 dark:hover:bg-[#8fffaa]/5 hover:bg-[#006b42]/5'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div className={`h-2 w-2 rounded-full ${isActive ? 'dark:bg-[#8fffaa] bg-[#006b42]' : 'dark:bg-gray-600 bg-gray-300'}`} />
                    <div className="flex-1">
                      {link.label}
                      {isActive && (
                        <div className="h-0.5 mt-0.5 dark:bg-[#8fffaa]/50 bg-[#006b42]/50"></div>
                      )}
                    </div>
                    
                    {/* Right circuit accent for active item */}
                    {isActive && (
                      <div className="flex items-center space-x-1">
                        <div className="h-0.5 w-2 dark:bg-[#8fffaa]/40 bg-[#006b42]/40"></div>
                        <div className="h-1.5 w-1.5 rounded-full dark:bg-[#8fffaa]/40 bg-[#006b42]/40"></div>
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
