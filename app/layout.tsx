import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Agents Company - Автоматизация бизнес-процессов",
  description: "Создаем AI-агентов для автоматизации бизнес-процессов с интеграцией в CRM и API за 2–4 недели.",
  keywords: "AI агенты, автоматизация, бизнес, CRM, API",
  openGraph: {
    title: "AI Agents Company",
    description: "Автоматизация бизнес-процессов с AI-агентами",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0B0F19] text-white">
        <Header />
        <main className="flex-1 pt-20">{children}</main>
      </body>
    </html>
  );
}
