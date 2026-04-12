import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { caseStudies } from '../../../lib/cases';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return caseStudies.map((caseItem) => ({ slug: caseItem.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseItem = caseStudies.find((item) => item.slug === slug);

  if (!caseItem) {
    return {};
  }

  return {
    title: `${caseItem.title} — кейс внедрения AI-агента`,
    description: caseItem.summary,
  };
}

export default async function CaseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const caseItem = caseStudies.find((item) => item.slug === slug);

  if (!caseItem) {
    notFound();
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <Link href="/cases" className="text-primary hover:text-accent transition-colors">
            ← Назад к кейсам
          </Link>
        </div>

        <article className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-6 sm:p-8 lg:p-10">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.16em] text-primary">
              {caseItem.industry}
            </span>
            <span className="inline-flex rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.16em] text-gray-300">
              Срок запуска: {caseItem.timeline}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold mb-5">{caseItem.title}</h1>
          <p className="text-lg text-gray-300 max-w-3xl mb-8 leading-8">{caseItem.summary}</p>

          <div className="grid md:grid-cols-3 gap-4 mb-10">
            {caseItem.metrics.map((metric) => (
              <div key={metric.label} className="rounded-2xl border border-white/8 bg-black/10 p-5">
                <div className="text-2xl font-bold text-primary mb-2">{metric.value}</div>
                <div className="text-sm text-gray-400 leading-6">{metric.label}</div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-3 text-red-400">Задача</h2>
                <p className="text-gray-300 leading-8">{caseItem.problem}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3 text-primary">Решение</h2>
                <p className="text-gray-300 leading-8">{caseItem.solution}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3 text-accent">Результат</h2>
                <p className="text-gray-300 leading-8">{caseItem.result}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Что происходило в проекте</h2>
                <div className="space-y-4 text-gray-300 leading-8">
                  {caseItem.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            </div>

            <aside className="space-y-6">
              <div className="rounded-2xl border border-white/8 bg-black/10 p-6">
                <h2 className="text-xl font-semibold mb-4">Интеграции</h2>
                <div className="flex flex-wrap gap-2">
                  {caseItem.integrations.map((integration) => (
                    <span
                      key={integration}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-300"
                    >
                      {integration}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-white/8 bg-black/10 p-6">
                <h2 className="text-xl font-semibold mb-4">Следующий шаг</h2>
                <p className="text-gray-300 leading-7 mb-5">
                  Если у вас похожая задача, мы можем начать с короткого аудита процесса и предложить
                  пилотный сценарий с понятной бизнес-метрикой.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex w-full justify-center rounded-xl bg-primary px-5 py-4 font-semibold text-black hover:bg-primary/80 transition-colors"
                >
                  Обсудить похожий кейс
                </Link>
              </div>
            </aside>
          </div>
        </article>
      </div>
    </div>
  );
}
