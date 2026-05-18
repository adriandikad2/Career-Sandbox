import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/sidebar";
import { SkipLinks } from "@/components/layout/skip-links";
import { KeyboardShortcutsDialog } from "@/components/accessibility/keyboard-shortcuts-dialog";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Career Sandbox — AI Career Path Explorer",
  description:
    "Explore and simulate alternative career development paths with AI-powered scenario generation. A Human-Centered AIGC platform for career planning.",
  keywords: [
    "career planning",
    "AI career",
    "career path",
    "skill development",
    "career sandbox",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex antialiased">
        <SkipLinks />
        <Sidebar />
        <KeyboardShortcutsDialog />
        <main
          id="main-content"
          className="flex-1 ml-[72px] min-h-screen overflow-y-auto"
          role="main"
          aria-label="Main content area"
        >
          {children}
        </main>
      </body>
    </html>
  );
}
