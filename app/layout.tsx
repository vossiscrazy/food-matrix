import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { PlanNav } from "@/components/PlanNav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Food Matrix",
  description: "Food Matrix food lists",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} flex h-dvh flex-col antialiased`}>
        <PlanNav />
        <div className="flex min-h-0 flex-1 flex-col">{children}</div>
      </body>
    </html>
  );
}
