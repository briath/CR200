'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const allCases = [
  {
    id: 1,
    title: 'E-commerce платформа',
    industry: 'Ритейл',
    problem: 'Потеря 30% лидов из-за ручной обработки',
    solution: 'Sales AI для автоматической квалификации и распределения',
    result: 'Увеличение конверсии на 40%, снижение затрат на 25%',
    image: '/case1.jpg', // placeholder
  },
  {
    id: 2,
    title: 'IT-компания',
    industry: 'Технологии',
    problem: 'Поддержка только в рабочее время',
    solution: '24/7 AI-чатбот для первой линии',
    result: 'Сокращение времени ответа на 80%, повышение удовлетворенности на 35%',
    image: '/case2.jpg',
  },
  {
    id: 3,
    title: 'Производственная компания',
    industry: 'Производство',
    problem: 'Операционные процессы занимали 50% времени',
    solution: 'Operations AI для автоматизации рутины',
    result: 'Освобождение 20 часов в неделю на сотрудника',
    image: '/case3.jpg',
  },
];

const industries = ['Все', 'Ритейл', 'Технологии', 'Производство'];

export default function CasesPage() {
  const [filter, setFilter] = useState('Все');

  const filteredCases = filter === 'Все' ? allCases : allCases.filter(c => c.industry === filter);

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          className="text-5xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Кейсы
        </motion.h1>

        {/* Filter */}
        <div className="flex justify-center mb-12">
          <div className="flex gap-4">
            {industries.map((industry) => (
              <button
                key={industry}
                onClick={() => setFilter(industry)}
                className={`px-6 py-2 rounded-lg transition-colors ${
                  filter === industry
                    ? 'bg-primary text-black'
                    : 'glass text-white hover:bg-primary/20'
                }`}
              >
                {industry}
              </button>
            ))}
          </div>
        </div>

        {/* Cases grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCases.map((case_, index) => (
            <motion.div
              key={case_.id}
              className="glass p-6 rounded-xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-4xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{case_.title}</h3>
              <p className="text-primary mb-4">{case_.industry}</p>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-red-400 font-medium">Проблема:</span>
                  <p className="text-gray-300">{case_.problem}</p>
                </div>
                <div>
                  <span className="text-primary font-medium">Решение:</span>
                  <p className="text-gray-300">{case_.solution}</p>
                </div>
                <div>
                  <span className="text-accent font-medium">Результат:</span>
                  <p className="text-gray-300">{case_.result}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}