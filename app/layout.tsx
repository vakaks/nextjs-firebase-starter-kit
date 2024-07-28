import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from '@/lib/utils';

const inter = Inter({ 
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "VAKAKS Next.js Starter Kit",
  description: "A starter kit that comes with Next.js, Tailwind CSS, ShadCn, TypeScript and Firebase. It's designed to help you build your projects",
  category: "Programming",
  creator: "VAKAKS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={
        cn(inter.variable)
      }>{children}</body>
    </html>
  );
}
