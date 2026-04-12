'use client';

import { motion } from 'framer-motion';

const steps = [
  { title: 'Аудит', description: 'Изучаем процессы, точки потерь, текущий стек и целевые KPI.' },
  { title: 'MVP', description: 'Собираем рабочий сценарий на реальных данных и проверяем бизнес-эффект.' },
  { title: 'Интеграция', description: 'Подключаем CRM, мессенджеры, базу знаний, API и внутренние системы.' },
  { title: 'Запуск', description: 'Выводим решение в прод, обучаем команду и сопровождаем внедрение.' },
];

export default function Process() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Как мы внедряем AI-агентов
        </motion.h2>
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-primary text-black rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                {index + 1}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-300 max-w-xs">{step.description}</p>
              {index < steps.length - 1 && (
                <div className="hidden md:block w-24 h-1 bg-primary mt-8" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
