"use client";

import * as React from "react";
import { Moon, Sun, Laptop } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Wait for hydration to avoid SSR mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="w-9 h-9 rounded-md relative dark:border-[#8fffaa]/30 border-[#006b42]/30 dark:bg-[#111]/80 bg-white/80"
        >
          <Sun className="h-[1.1rem] w-[1.1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-[#006b42]" />
          <Moon className="absolute h-[1.1rem] w-[1.1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 dark:text-[#8fffaa]" />
          <span className="sr-only">Toggle theme</span>
          
          {/* Circuit trace decorations */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1 right-1 h-1 w-1 rounded-full dark:bg-[#8fffaa]/40 bg-[#006b42]/40"></div>
            <div className="absolute bottom-1 left-1 h-0.5 w-1.5 dark:bg-[#8fffaa]/40 bg-[#006b42]/40"></div>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="border dark:border-[#8fffaa]/30 border-[#006b42]/30 dark:bg-[#111]/95 bg-white/95 backdrop-blur-sm">
        <DropdownMenuItem onClick={() => setTheme("light")} className="cursor-pointer gap-2">
          <Sun className="h-4 w-4 text-[#006b42]" />
          <span>Light</span>
          {theme === 'light' && <span className="absolute right-2 h-1 w-1 rounded-full bg-[#006b42]"></span>}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className="cursor-pointer gap-2">
          <Moon className="h-4 w-4 dark:text-[#8fffaa]" />
          <span>Dark</span>
          {theme === 'dark' && <span className="absolute right-2 h-1 w-1 rounded-full dark:bg-[#8fffaa]"></span>}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} className="cursor-pointer gap-2">
          <Laptop className="h-4 w-4" />
          <span>System</span>
          {theme === 'system' && <span className="absolute right-2 h-1 w-1 rounded-full dark:bg-[#8fffaa] bg-[#006b42]"></span>}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
