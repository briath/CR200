import type { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ai-agents-company.com';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AI Agents',
    short_name: 'AI Agents',
    description:
      'AI-агенты для продаж, поддержки и внутренних процессов бизнеса.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#0b0f19',
    theme_color: '#0b0f19',
    categories: ['business', 'productivity', 'technology'],
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
    id: siteUrl,
  };
}
