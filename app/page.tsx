import type { Metadata } from 'next';
import Hero from '../components/Hero';
import ProblemSolution from '../components/ProblemSolution';
import Services from '../components/Services';
import TechStack from '../components/TechStack';
import Cases from '../components/Cases';
import Process from '../components/Process';
import Trust from '../components/Trust';
import CostCalculator from '../components/CostCalculator';
import ContactForm from '../components/ContactForm';
import AIDemo from '../components/AIDemo';
import Integrations from '../components/Integrations';
import FAQ from '../components/FAQ';
import FinalCTA from '../components/FinalCTA';
import ResultsProof from '../components/ResultsProof';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ai-agents-company.com';
const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@ai-agents.com';
const contactPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE || '+7 (495) 123-45-67';
const contactAddress = process.env.NEXT_PUBLIC_CONTACT_ADDRESS || 'Санкт-Петербург';

export const metadata: Metadata = {
  title: 'AI-агенты для бизнеса',
  description:
    'Внедряем AI-агентов для продаж, поддержки и внутренних процессов. Подключаем CRM, мессенджеры, базы знаний и API за 2-6 недель.',
  alternates: {
    canonical: siteUrl,
  },
};

export default function Home() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AI Agents',
    url: siteUrl,
    email: contactEmail,
    telephone: contactPhone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: contactAddress,
      addressCountry: 'RU',
    },
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Разработка и внедрение AI-агентов для бизнеса',
    provider: {
      '@type': 'Organization',
      name: 'AI Agents',
      url: siteUrl,
    },
    areaServed: 'RU',
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'Компании, внедряющие AI-автоматизацию',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'С чего начать, если у нас пока нет чёткой AI-стратегии?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Обычно мы начинаем с короткого аудита процессов и выбираем один сценарий с понятным ROI.',
        },
      },
      {
        '@type': 'Question',
        name: 'Сколько времени занимает запуск?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Пилотный сценарий обычно запускается за 2-6 недель в зависимости от интеграций и требований по безопасности.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Hero />
      <ProblemSolution />
      <Services />
      <ResultsProof />
      <TechStack />
      <Integrations />
      <Cases />
      <Process />
      <Trust />
      <FAQ />
      <CostCalculator />
      <FinalCTA />
      <ContactForm />
      <AIDemo />
    </>
  );
}
