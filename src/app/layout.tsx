import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "EduOrbit — Discover International Master's Scholarships Matched to Your Profile",
  description:
    "EduOrbit helps you find verified international scholarships matched to your exact profile. Answer 5 questions and get a ranked list of scholarships you're actually eligible for.",
  keywords: [
    "international scholarships",
    "master's scholarships",
    "scholarship finder",
    "study abroad funding",
    "PhD scholarships",
    "fully funded scholarships",
  ],
  authors: [{ name: "EduOrbit" }],
  openGraph: {
    title: "EduOrbit — Stop Guessing. Find Scholarships Matched to You.",
    description:
      "Answer 5 questions. Get a ranked list of scholarships you're actually eligible for, with verified funding details and real deadlines.",
    type: "website",
    siteName: "EduOrbit",
  },
  twitter: {
    card: "summary_large_image",
    title: "EduOrbit — International Scholarship Finder",
    description:
      "Find scholarships matched to your exact profile. Verified funding, real deadlines.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
