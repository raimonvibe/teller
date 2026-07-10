import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Teller — Tobacco Tracker",
  description: "Track your tobacco reduction program across three phases",
  applicationName: "Teller",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Teller",
    title: "Teller — Tobacco Tracker",
    description: "Track your tobacco reduction program across three phases",
  },
  twitter: {
    card: "summary_large_image",
    title: "Teller — Tobacco Tracker",
    description: "Track your tobacco reduction program across three phases",
  },
  appleWebApp: {
    capable: true,
    title: "Teller",
    statusBarStyle: "black-translucent",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased gradient-bg`}>
        {children}
      </body>
    </html>
  );
}
