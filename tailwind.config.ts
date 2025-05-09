import type { Config } from "tailwindcss"
const plugin = require('tailwindcss/plugin')
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");
function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "sans-serif"],
        'star': ['var(--font-pyeongchang)']
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        'custom-purple': 'rgb(170 166 195 / 1)',
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "circuit-trace": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(calc(100vw + 100%))" }
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.8" }
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" }
        },
        "border-snake": {
          "0%": { 
            top: "0", 
            left: "0", 
            width: "3px", 
            height: "0", 
            opacity: "1"
          },
          "12.5%": { 
            top: "0", 
            left: "0", 
            width: "3px", 
            height: "100%", 
            opacity: "1"
          },
          "25%": { 
            top: "calc(100% - 3px)", 
            left: "0", 
            width: "0", 
            height: "3px", 
            opacity: "1"
          },
          "37.5%": { 
            top: "calc(100% - 3px)", 
            left: "0", 
            width: "100%", 
            height: "3px", 
            opacity: "1"
          },
          "50%": { 
            top: "calc(100% - 3px)", 
            left: "calc(100% - 3px)", 
            width: "3px", 
            height: "0", 
            opacity: "1"
          },
          "62.5%": { 
            top: "0", 
            left: "calc(100% - 3px)", 
            width: "3px", 
            height: "100%", 
            opacity: "1"
          },
          "75%": { 
            top: "0", 
            left: "calc(100% - 3px)", 
            width: "0", 
            height: "3px", 
            opacity: "1"
          },
          "87.5%": { 
            top: "0", 
            left: "0", 
            width: "100%", 
            height: "3px", 
            opacity: "1"
          },
          "100%": { 
            top: "0", 
            left: "0", 
            width: "3px", 
            height: "0", 
            opacity: "1"
          }
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "circuit-trace": "circuit-trace 8s linear infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
        "border-snake": "border-snake 8s ease-in-out infinite",
      },
      animationDelay: {
        '300': '300ms',
        '500': '500ms',
        '700': '700ms',
        '1000': '1000ms',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    addVariablesForColors,
    plugin(({ addVariant, matchUtilities, theme }: { addVariant: (name: string, value: string) => void, matchUtilities: any, theme: any }) => {
      addVariant('firefox', '@supports (-moz-appearance: none)');
      
      // Add animation-delay utilities
      matchUtilities(
        {
          "animation-delay": (value: string) => ({
            "animation-delay": value,
          }),
        },
        {
          values: theme("animationDelay"),
        }
      );
    }),
  ],
} satisfies Config

export default config