'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { caseStudies } from '../lib/cases';

const featuredCases = caseStudies.slice(0, 6);

export default function Cases() {
  return (
    <section id="cases" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-sm uppercase tracking-[0.2em] text-primary mb-4">Кейсы</p>
          <h2 className="text-4xl font-bold mb-4">Сценарии внедрения с понятным бизнес-эффектом</h2>
          <p className="text-gray-300">
            Показываем не абстрактные “AI-возможности”, а реальные форматы задач, где автоматизация
            влияет на скорость, нагрузку команды и качество клиентского сервиса.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {featuredCases.map((caseItem, index) => (
            <motion.article
              key={caseItem.id}
              className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.08 }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,209,255,0.16),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(123,97,255,0.12),transparent_30%)] opacity-80 transition-opacity group-hover:opacity-100" />
              <div className="relative z-10">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="inline-flex rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.16em] text-primary">
                    {caseItem.industry}
                  </span>
                  <span className="text-xs uppercase tracking-[0.16em] text-gray-400">
                    {caseItem.timeline}
                  </span>
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
                    <h4 className="text-red-400 font-medium mb-1">Задача</h4>
                    <p className="text-gray-300">{caseItem.problem}</p>
                  </div>
                  <div>
                    <h4 className="text-primary font-medium mb-1">Решение</h4>
                    <p className="text-gray-300">{caseItem.solution}</p>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {caseItem.integrations.slice(0, 2).map((integration) => (
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
                    className="text-primary transition-colors hover:text-accent"
                  >
                    Подробнее →
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Link
            href="/cases"
            className="inline-flex px-8 py-4 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary/80 transition-colors"
          >
            Смотреть все кейсы
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
