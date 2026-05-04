import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Cursor from "@/components/Cursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vanessa - Frontend Developer",
  description: "Portfolio of Vanessa, a frontend developer specializing in React, TypeScript, and modern web technologies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} data-scroll-behavior="smooth">
      <body className="min-h-full flex flex-col">
        <Cursor />
        <Navigation />
        <main className="flex-1 pt-20">
          {children}
        </main>
        <footer className="py-6 border-t border-border text-center text-foreground-muted text-sm">
          <p>&copy; {new Date().getFullYear()} Vanessa. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}