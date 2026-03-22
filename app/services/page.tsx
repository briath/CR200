'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const serviceDetails = [
  {
    title: 'Sales AI',
    description: 'Автоматизация продаж и лидогенерации',
    features: ['Квалификация лидов', 'Персонализированные предложения', 'Follow-up автоматизация', 'Анализ конверсии'],
    examples: ['Увеличение конверсии на 40%', 'Сокращение времени продаж на 50%'],
  },
  {
    title: 'Support AI',
    description: 'ИИ для поддержки клиентов',
    features: ['24/7 чат-боты', 'Автоматическое решение запросов', 'Эскалация сложных случаев', 'Анализ удовлетворенности'],
    examples: ['Решение 70% запросов автоматически', 'Сокращение времени ответа на 80%'],
  },
  {
    title: 'Operations AI',
    description: 'Автоматизация операционных процессов',
    features: ['Обработка документов', 'Генерация отчетов', 'Координация задач', 'Мониторинг KPI'],
    examples: ['Освобождение 50% времени сотрудников', 'Снижение ошибок на 90%'],
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
          Наши услуги
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
                  <h3 className="text-xl font-semibold mb-4">Возможности</h3>
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="text-accent">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Результаты</h3>
                  <ul className="space-y-2">
                    {service.examples.map((example, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="text-primary">📈</span>
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 text-center">
                <Link href="/contact" className="inline-block px-8 py-4 bg-primary text-black font-semibold rounded-lg hover:bg-primary/80 transition-colors">
                  Заказать {service.title}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}