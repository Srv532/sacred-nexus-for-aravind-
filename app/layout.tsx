import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { ThemeProvider } from "../components/ThemeProvider";
import SmoothScroller from "../components/SmoothScroller";
import EasterEggs from "../components/EasterEggs";
import Particles from "../components/Particles";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const merriweather = Merriweather({
  weight: ["300", "400", "700"],
  variable: "--font-merriweather",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aravind A | Novel Experience",
  description: "Read the magical and sweeping sagas of author Aravind A.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${merriweather.variable} antialiased selection:bg-[#8b3a3a]/30 selection:text-black dark:selection:text-white bg-[#eeece6] dark:bg-[#0a0a0a] text-[#1f1d1c] dark:text-zinc-100 font-sans transition-colors duration-500 min-h-screen`}
      >
        <SmoothScroller />
        <EasterEggs />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="fixed inset-0 pointer-events-none z-[-2] bg-[radial-gradient(#e0ddd5_1px,transparent_1px)] dark:bg-[radial-gradient(#222_1px,transparent_1px)] [background-size:24px_24px] opacity-60">
            <Particles />
          </div>
          <Navigation />
          <main className="min-h-screen pt-[72px]">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
