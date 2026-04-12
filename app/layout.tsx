import type { Metadata } from 'next';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ai-agents-company.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'AI-агенты для бизнеса | Автоматизация продаж, поддержки и операций',
    template: '%s | AI Agents',
  },
  description:
    'Разрабатываем и внедряем AI-агентов для бизнеса: продажи, поддержка клиентов, документооборот и внутренние процессы. Интеграция с CRM, API и мессенджерами за 2-6 недель.',
  keywords: [
    'AI-агенты для бизнеса',
    'автоматизация бизнеса',
    'AI для продаж',
    'AI для поддержки',
    'внедрение ИИ',
    'CRM интеграции',
  ],
  applicationName: 'AI Agents',
  category: 'business',
  openGraph: {
    title: 'AI-агенты для бизнеса',
    description:
      'Внедряем AI-агентов для продаж, поддержки и операционных процессов с интеграцией в CRM, API и мессенджеры.',
    type: 'website',
    url: siteUrl,
    locale: 'ru_RU',
    siteName: 'AI Agents',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'AI Agents — внедрение AI-агентов для бизнеса',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI-агенты для бизнеса',
    description:
      'AI-агенты для продаж, поддержки и внутренних процессов с интеграцией в CRM, API и мессенджеры.',
    images: ['/twitter-image'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  manifest: '/manifest.webmanifest',
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#0B0F19] text-white">
        <Header />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
