'use client';

import { motion } from 'framer-motion';

const cases = [
  {
    problem: 'Компания теряла 30% лидов из-за ручной обработки',
    solution: 'Внедрили Sales AI для автоматической квалификации и распределения лидов',
    result: 'Увеличение конверсии на 40%, снижение затрат на 25%',
  },
  {
    problem: 'Поддержка клиентов работала только в рабочее время',
    solution: 'Разработали 24/7 AI-чатбот для первой линии поддержки',
    result: 'Сокращение времени ответа на 80%, повышение удовлетворенности клиентов',
  },
  {
    problem: 'Операционные процессы занимали 50% времени сотрудников',
    solution: 'Автоматизировали рутинные задачи с помощью Operations AI',
    result: 'Освобождение 20 часов в неделю на сотрудника, рост продуктивности',
  },
];

export default function Cases() {
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
          Кейсы
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {cases.map((case_, index) => (
            <motion.div
              key={index}
              className="glass p-6 rounded-xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-red-400 mb-2">Проблема</h3>
                <p className="text-gray-300">{case_.problem}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-primary mb-2">Решение</h3>
                <p className="text-gray-300">{case_.solution}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-accent mb-2">Результат</h3>
                <p className="text-gray-300">{case_.result}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <button className="px-8 py-4 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary/80 transition-colors">
            Смотреть демо
          </button>
        </motion.div>
      </div>
    </section>
  );
}