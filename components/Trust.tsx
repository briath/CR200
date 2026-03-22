'use client';

import { motion } from 'framer-motion';

const trustItems = [
  'GDPR compliance',
  'NDA подписание',
  'SLA гарантии',
  'Безопасное хранение данных',
  'Регулярные аудиты',
  'Поддержка 24/7',
];

export default function Trust() {
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
          Доверие и безопасность
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-6">
          {trustItems.map((item, index) => (
            <motion.div
              key={item}
              className="glass p-6 rounded-xl text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-2xl mb-2">✅</div>
              <p className="font-medium">{item}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}