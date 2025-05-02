import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider";
import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";
import { BackgroundElements } from "@/components/background-elements";
import { LayoutBootSequence } from "@/components/layout-boot-sequence";
import localFont from 'next/font/local';
import { Suspense } from "react";

const pyeongChangPeace = localFont({
  src: '../public/fonts/PyeongChangPeace-Bold.woff2',
  variable: '--font-pyeongchang'
})

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Muaath Rifath',
  description: 'Engineering student bridging hardware and software through IoT innovation. Specialized in embedded systems, real-time applications, and modern web development.',
  metadataBase: new URL('https://muaathrifath.tech'),
  authors: [
    {
      name: 'Muaath Rifath',
      url: 'https://muaathrifath.tech',
    }
  ],
  creator: 'Muaath Rifath',
  applicationName: 'Muaath Rifath',
  colorScheme: 'dark light',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
  verification: {
    yandex: '11f01083e7c530fb',
    other: {
      'msvalidate.01': '8B74D86213EF01859C288AA7D42295FE',
      'seznam-wmt': 'ieWWkMIDyegS11rBv5HWimQ33HrmEO6x',
    },
  },
  openGraph: {
    title: 'Muaath Rifath',
    description: 'Engineering student bridging hardware and software through IoT innovation. Specialized in embedded systems, real-time applications, and modern web development.',
    images: 'assets/home-page.png',
    url: 'https://muaathrifath.tech',
    type: 'website',
    siteName: 'Muaath Rifath',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muaath Rifath',
    description: 'Engineering student bridging hardware and software through IoT innovation. Specialized in embedded systems, real-time applications, and modern web development.',
    images: 'assets/home-page.png',
    creator: '@MuaathRifath',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/assets/logo-portfolio.svg',
  },
  keywords: [
    "Muaath Rifath",
    "Embedded Software Engineer",
    "Web Developer",
    "Freelancer",
    "Engineering Student",
  ],
  alternates: {
    canonical: 'https://muaathrifath.tech',
    languages: {
      'en': 'https://muaathrifath.tech',
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    noimageindex: false,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
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
          <LayoutBootSequence />
          <Suspense fallback={null}>
            <BackgroundElements />
            <Topbar />
            <main className="flex flex-col min-h-screen">
              <section className="flex w-full z-10 flex-grow">
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
