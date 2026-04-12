'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const serviceDetails = [
  {
    title: 'Sales AI',
    description: 'Автоматизация продаж и ускорение первой реакции на входящие лиды.',
    features: [
      'Квалификация лидов по вашим критериям',
      'Персонализированные ответы и follow-up',
      'Обработка заявок из сайта, Telegram, WhatsApp и почты',
      'Передача в CRM только релевантных контактов',
    ],
    examples: ['Снижение потерь лидов на первом касании', 'Ускорение реакции отдела продаж'],
  },
  {
    title: 'Support AI',
    description: 'AI-агенты для поддержки клиентов и внутренних сервисных команд.',
    features: [
      'Ответы 24/7 на типовые вопросы',
      'Поиск по базе знаний и документации',
      'Эскалация сложных запросов оператору',
      'Единый контекст общения по всем каналам',
    ],
    examples: ['Снижение нагрузки на первую линию', 'Быстрый старт без расширения штата'],
  },
  {
    title: 'Operations AI',
    description: 'Автоматизация повторяемых внутренних процессов и документооборота.',
    features: [
      'Обработка документов и заявок',
      'Генерация отчётов и статусов',
      'Внутренние ассистенты для сотрудников',
      'Автоматизация согласований и сверок',
    ],
    examples: ['Сокращение ручной рутины', 'Прозрачность процессов и контроль SLA'],
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          className="text-5xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Услуги по внедрению AI-агентов
        </motion.h1>

        <div className="space-y-16">
          {serviceDetails.map((service, index) => (
            <motion.div
              key={service.title}
              className="glass p-8 rounded-xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4 text-primary">{service.title}</h2>
              <p className="text-xl text-gray-300 mb-6">{service.description}</p>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Что входит</h3>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <span className="text-accent">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Что получает бизнес</h3>
                  <ul className="space-y-2">
                    {service.examples.map((example) => (
                      <li key={example} className="flex items-center gap-2">
                        <span className="text-primary">📌</span>
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 text-center">
                <Link
                  href="/contact"
                  className="inline-block px-8 py-4 bg-primary text-black font-semibold rounded-lg hover:bg-primary/80 transition-colors"
                >
                  Обсудить {service.title}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
