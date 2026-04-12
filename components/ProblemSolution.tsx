'use client';

import { motion } from 'framer-motion';

export default function ProblemSolution() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            className="glass p-8 rounded-xl"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6 text-red-400">Что тормозит рост бизнеса</h2>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-red-400 rounded-full" />
                <span>Менеджеры тратят часы на рутинные действия и ручную обработку заявок</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-red-400 rounded-full" />
                <span>Лиды теряются между CRM, мессенджерами, таблицами и почтой</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-red-400 rounded-full" />
                <span>Поддержка и операционные процессы не масштабируются без роста штата</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            className="glass p-8 rounded-xl"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6 text-accent">Что дают AI-агенты</h2>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-accent rounded-full" />
                <span>Автоматически квалифицируют лидов, отвечают клиентам и запускают сценарии</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-accent rounded-full" />
                <span>Работают 24/7 и не теряют контекст между каналами и системами</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-accent rounded-full" />
                <span>Снижают нагрузку на команду и высвобождают время для роста</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
