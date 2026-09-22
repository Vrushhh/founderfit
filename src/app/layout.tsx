import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0A0B0D",
};

export const metadata: Metadata = {
  title: "FOUNDERFIT — Find the Business You Should Test Next",
  description:
    "A personalized Business Blueprint for Indian corporate professionals looking for a validated way out of desk jobs. 10 questions. ₹299.",
  keywords: [
    "FounderFit",
    "business blueprint",
    "Indian corporate employees",
    "side business",
    "quit corporate job",
    "start a business India",
    "micro SaaS",
    "B2B agency",
    "career change"
  ],
  openGraph: {
    title: "FOUNDERFIT — Find the Business You Should Test Next",
    description:
      "Having difficult days at your desk job? Find the business model that fits your skills, experience, and risk appetite. 10 questions • ₹299.",
    type: "website",
    locale: "en_IN",
    siteName: "FOUNDERFIT"
  },
  twitter: {
    card: "summary_large_image",
    title: "FOUNDERFIT — Find the Business You Should Test Next",
    description:
      "Don't quit your job blindly. Find the business model worth testing on the side."
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-[#0A0B0D] text-[#F4F5F6] antialiased selection:bg-emerald-500/30 selection:text-emerald-300`}
      >
        {children}
      </body>
    </html>
  );
}
