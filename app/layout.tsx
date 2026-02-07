import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Sidebar } from "@/components/sidebar";
import { MobileNav } from "@/components/mobile-nav";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CryptoVision | Crypto Portfolio Dashboard",
  description:
    "Real-time cryptocurrency portfolio tracker with AI-powered insights, analytics, and beautiful data visualizations.",
  openGraph: {
    title: "CryptoVision | Crypto Portfolio Dashboard",
    description:
      "Real-time cryptocurrency portfolio tracker with AI-powered insights, analytics, and beautiful data visualizations.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 pb-20 md:pb-0 md:ml-64">
            <div className="p-4 sm:p-6">{children}</div>
          </main>
        </div>
        <MobileNav />
      </body>
    </html>
  );
}
