'use client';

import { motion } from 'framer-motion';

const faqItems = [
  {
    question: 'С чего начать, если у нас пока нет чёткой AI-стратегии?',
    answer:
      'Обычно мы начинаем с короткого аудита процессов и выбираем один сценарий с понятным ROI. Это помогает не распыляться и быстро проверить эффект на практике.',
  },
  {
    question: 'Насколько глубоко AI-агент встраивается в CRM и внутренние системы?',
    answer:
      'Настройка зависит от вашей инфраструктуры. Мы можем ограничиться лёгкой интеграцией через webhook и API либо построить полноценный рабочий контур с логами, правами и маршрутизацией.',
  },
  {
    question: 'Это заменяет сотрудников или помогает им работать эффективнее?',
    answer:
      'В большинстве проектов AI-агент снимает рутину: квалификацию, ответы на типовые вопросы, поиск по базе знаний, документы и статусы. Команда получает больше времени на приоритетные задачи.',
  },
  {
    question: 'Сколько времени занимает запуск?',
    answer:
      'Пилотный сценарий обычно запускается за 2-6 недель. На срок влияет количество интеграций, качество исходных данных и требования по безопасности.',
  },
  {
    question: 'Что происходит после запуска?',
    answer:
      'Мы отслеживаем качество ответов, метрики и точки отказа, корректируем сценарии и помогаем масштабировать рабочий кейс на новые процессы.',
  },
];

export default function FAQ() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4">FAQ</p>
          <h2 className="text-4xl font-bold mb-4">Частые вопросы перед внедрением</h2>
          <p className="text-gray-300">
            Список вопросов, которые чаще всего задают руководители перед стартом пилота или запуском
            полноценного проекта.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <motion.div
              key={item.question}
              className="glass rounded-2xl p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-3">{item.question}</h3>
              <p className="text-gray-300 leading-7">{item.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
