import type { Metadata } from "next";
import { pageMetadata, siteDescription, siteUrl } from "@/lib/seo";
import "./globals.css";
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider";
import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";
import { BackgroundElements } from "@/components/background-elements";
import localFont from 'next/font/local';
import { Suspense } from "react";

const pyeongChangPeace = localFont({
  src: '../public/fonts/PyeongChangPeace-Bold.woff2',
  variable: '--font-pyeongchang'
})


export const metadata: Metadata = {
  ...pageMetadata("Freelance Web & MVP Developer", siteDescription, "/"),
  metadataBase: new URL(siteUrl),
  authors: [{ name: "Mohamed Muaath Rifath", url: siteUrl }],
  creator: "Muaath Rifath",
  applicationName: "Muaath Rifath",
  referrer: "origin-when-cross-origin",
  verification: {
    yandex: '11f01083e7c530fb',
    other: {
      'msvalidate.01': '8B74D86213EF01859C288AA7D42295FE',
      'seznam-wmt': 'ieWWkMIDyegS11rBv5HWimQ33HrmEO6x',
    },
  },
  icons: { icon: "/favicon.ico", shortcut: "/favicon.ico", apple: "/assets/logo-portfolio.svg" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'dark light',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={pyeongChangPeace.variable} suppressHydrationWarning>
      <head />
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <BackgroundElements />
          <Suspense fallback={null}>
            <Topbar />
            <main className="flex flex-col min-h-screen transition-opacity duration-500 relative z-10">
              <section className="flex w-full flex-grow">
                {children}
              </section>
              <Footer />
            </main>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}
