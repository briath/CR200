'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { caseStudies } from '../../lib/cases';

const industries = ['Все', ...Array.from(new Set(caseStudies.map((item) => item.industry)))];

export default function CasesPage() {
  const [filter, setFilter] = useState('Все');

  const filteredCases =
    filter === 'Все' ? caseStudies : caseStudies.filter((caseItem) => caseItem.industry === filter);

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm uppercase tracking-[0.2em] text-primary mb-4">Кейсы</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Типовые сценарии внедрения AI-агентов</h1>
          <p className="text-gray-300 text-lg">
            Здесь собраны задачи, в которых AI-агенты особенно хорошо проявляют себя: продажи,
            поддержка, логистика, финансы, образование и внутренние процессы бизнеса.
          </p>
        </motion.div>

        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap gap-4 justify-center">
            {industries.map((industry) => (
              <button
                key={industry}
                onClick={() => setFilter(industry)}
                className={`px-6 py-2 rounded-lg transition-colors ${
                  filter === industry ? 'bg-primary text-black' : 'glass text-white hover:bg-primary/20'
                }`}
              >
                {industry}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredCases.map((caseItem, index) => (
            <motion.article
              key={caseItem.id}
              className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.06 }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,209,255,0.16),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(123,97,255,0.12),transparent_30%)] opacity-80 transition-opacity group-hover:opacity-100" />
              <div className="relative z-10">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="inline-flex rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.16em] text-primary">
                    {caseItem.industry}
                  </span>
                  <span className="text-xs uppercase tracking-[0.16em] text-gray-400">{caseItem.timeline}</span>
                </div>

                <h3 className="text-xl font-semibold mb-3">{caseItem.title}</h3>
                <p className="text-gray-300 mb-5 leading-7">{caseItem.summary}</p>

                <div className="grid grid-cols-3 gap-3 mb-5">
                  {caseItem.metrics.map((metric) => (
                    <div key={metric.label} className="rounded-2xl border border-white/8 bg-black/10 p-3">
                      <div className="text-lg font-bold text-primary">{metric.value}</div>
                      <div className="text-[11px] leading-4 text-gray-400">{metric.label}</div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 text-sm leading-7">
                  <div>
                    <span className="text-red-400 font-medium">Задача:</span>
                    <p className="text-gray-300">{caseItem.problem}</p>
                  </div>
                  <div>
                    <span className="text-primary font-medium">Решение:</span>
                    <p className="text-gray-300">{caseItem.solution}</p>
                  </div>
                  <div>
                    <span className="text-accent font-medium">Результат:</span>
                    <p className="text-gray-300">{caseItem.result}</p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {caseItem.integrations.map((integration) => (
                      <span
                        key={integration}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300"
                      >
                        {integration}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/cases/${caseItem.slug}`}
                    className="text-primary font-medium transition-colors hover:text-accent"
                  >
                    Открыть кейс →
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/contact"
            className="inline-flex rounded-xl bg-primary px-8 py-4 font-semibold text-black hover:bg-primary/80 transition-colors"
          >
            Обсудить похожий сценарий
          </Link>
        </div>
      </div>
    </div>
  );
}
