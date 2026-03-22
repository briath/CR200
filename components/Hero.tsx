'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B0F19] via-[#1a1f35] to-[#0B0F19] opacity-80"></div>
        {/* Particles simulation */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full opacity-30"
              initial={{
                x: (i % 10) * 100,
                y: Math.floor(i / 10) * 100,
              }}
              animate={{
                x: ((i + 5) % 10) * 100,
                y: (Math.floor((i + 5) / 10) % 5) * 100,
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl">
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Создаем AI-агентов, которые работают вместо сотрудников
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl mb-8 text-gray-300"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Автоматизация бизнес-процессов с интеграцией в CRM и API за 2–4 недели
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <button className="px-8 py-4 bg-primary text-black font-semibold rounded-lg hover:bg-primary/80 transition-colors glow">
            Запросить аудит
          </button>
          <button className="px-8 py-4 border border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-black transition-colors">
            Смотреть демо
          </button>
        </motion.div>
      </div>
    </section>
  );
}