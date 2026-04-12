'use client';

import { motion } from 'framer-motion';

const metrics = [
  {
    value: '2-6 недель',
    label: 'средний срок запуска пилота',
  },
  {
    value: '24/7',
    label: 'работа AI-агента без потери контекста',
  },
  {
    value: '1 сценарий',
    label: 'достаточно, чтобы проверить ROI на практике',
  },
];

const proofCards = [
  {
    title: 'Продажи',
    text: 'Сокращаем задержку между заявкой и первым касанием, чтобы отдел продаж работал только с релевантным входящим потоком.',
  },
  {
    title: 'Поддержка',
    text: 'Снимаем типовые обращения с первой линии и наводим порядок в базе знаний, чтобы команда не тонула в повторяющихся запросах.',
  },
  {
    title: 'Операции',
    text: 'Автоматизируем документы, статусы, внутренние согласования и отчёты, где сотрудники теряют часы каждую неделю.',
  },
];

export default function ResultsProof() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-sm uppercase tracking-[0.2em] text-primary mb-4">Результат</p>
          <h2 className="text-4xl font-bold mb-4">Внедрение должно давать измеримый эффект, а не просто “AI на сайте”</h2>
          <p className="text-gray-300">
            Мы не начинаем с масштабного проекта ради проекта. Сначала выбираем процесс, где можно быстро
            проверить бизнес-ценность, а уже потом расширяем решение на новые сценарии.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3 mb-10">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              className="glass rounded-2xl p-6 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl font-bold text-primary mb-2">{metric.value}</div>
              <div className="text-gray-300">{metric.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {proofCards.map((card, index) => (
            <motion.div
              key={card.title}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold mb-3">{card.title}</h3>
              <p className="text-gray-300 leading-7">{card.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
