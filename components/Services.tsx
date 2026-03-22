'use client';

import { motion } from 'framer-motion';

const services = [
  {
    title: 'Operations AI',
    description: 'Автоматизация операционных процессов',
    icon: '⚙️',
  },
  {
    title: 'Sales AI',
    description: 'AI для продаж и лидогенерации',
    icon: '📈',
  },
  {
    title: 'Support AI',
    description: 'Чат-боты и поддержка клиентов',
    icon: '💬',
  },
  {
    title: 'Custom AI',
    description: 'Индивидуальные решения под ваши нужды',
    icon: '🔧',
  },
];

export default function Services() {
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
          Наши AI-агенты
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="glass p-6 rounded-xl hover:scale-105 transition-transform cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-300">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}