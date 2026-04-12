'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const highlights = [
  'Выбираем сценарий с понятным ROI',
  'Показываем MVP на реальных процессах',
  'Подключаем CRM, мессенджеры и API',
];

export default function FinalCTA() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="rounded-[2rem] border border-primary/20 bg-[radial-gradient(circle_at_top,#16314b,transparent_60%),linear-gradient(135deg,#0f1728,#0b0f19)] p-8 md:p-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4">Следующий шаг</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-5">
                Обсудим, где AI-агент быстрее всего окупится в вашем бизнесе
              </h2>
              <p className="text-gray-300 text-lg mb-6">
                На первом созвоне разберём текущую воронку, рутину команды и точки потерь. После этого
                вы получите реалистичную дорожную карту внедрения без абстрактных обещаний.
              </p>
              <div className="space-y-3 mb-8">
                {highlights.map((highlight) => (
                  <div key={highlight} className="flex items-center gap-3 text-gray-200">
                    <span className="text-accent">●</span>
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl p-6">
              <p className="text-sm text-gray-400 mb-3">Что подготовить к разговору</p>
              <div className="space-y-3 text-sm text-gray-200 leading-6">
                <p>1. Где у команды больше всего ручной рутины.</p>
                <p>2. Через какие каналы приходят заявки и обращения.</p>
                <p>3. В каких системах уже живут данные и процессы.</p>
              </div>
              <Link
                href="/contact"
                className="mt-6 inline-flex w-full justify-center rounded-xl bg-primary px-6 py-4 font-semibold text-black hover:bg-primary/80 transition-colors"
              >
                Оставить заявку
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
