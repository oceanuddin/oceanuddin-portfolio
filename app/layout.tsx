import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AuroraBackground from "@/components/layout/AuroraBackground";
import CustomCursor from "@/components/layout/CustomCursor";
import SmoothScroll from "@/components/layout/SmoothScroll";
import BrowserEggs from "@/components/easter/BrowserEggs";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const SITE = "https://oceanuddin.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "Ocean Uddin — IT · Cybersecurity · Full-Stack · IoT",
  description:
    "Portfolio of Ocean Uddin — IT professional, Security+ certified, full-stack & IoT builder based in Orlando, FL. Apple Technical Specialist, GrillPass, Attaché.cv, and more.",
  keywords: [
    "Ocean Uddin",
    "IT support",
    "cybersecurity",
    "Security+",
    "full-stack developer",
    "IoT",
    "Orlando",
    "Apple technician",
  ],
  authors: [{ name: "Ocean Uddin" }],
  openGraph: {
    title: "Ocean Uddin — IT · Cybersecurity · Full-Stack · IoT",
    description:
      "IT professional, Security+ certified, full-stack & IoT builder based in Orlando, FL.",
    url: SITE,
    siteName: "Ocean Uddin",
    type: "website",
    images: [{ url: "/monogram-black.png", width: 1200, height: 630, alt: "Ocean Uddin" }],
  },
  twitter: {
    card: "summary",
    title: "Ocean Uddin — IT · Cybersecurity · Full-Stack · IoT",
    description: "IT · Cybersecurity · Full-Stack · IoT — Orlando, FL.",
  },
  icons: { icon: "/monogram-white.png" },
};

export const viewport: Viewport = {
  themeColor: "#06070a",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuroraBackground />
        <SmoothScroll />
        <CustomCursor />
        <BrowserEggs />
        {children}
      </body>
    </html>
  );
}
