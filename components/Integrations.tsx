'use client';

import { motion } from 'framer-motion';

const integrationGroups = [
  {
    title: 'Продажи и CRM',
    items: ['amoCRM', 'Bitrix24', 'HubSpot', 'Pipedrive'],
  },
  {
    title: 'Коммуникации',
    items: ['Telegram', 'WhatsApp', 'Email', 'Онлайн-чат'],
  },
  {
    title: 'Операции и данные',
    items: ['Google Sheets', 'Notion', '1C', 'Внутренние API'],
  },
];

export default function Integrations() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4">Интеграции</p>
          <h2 className="text-4xl font-bold mb-4">Подключаем AI-агентов к вашим рабочим системам</h2>
          <p className="text-gray-300">
            Не предлагаем внедрение в вакууме. Агенты встраиваются в текущую инфраструктуру и работают
            там, где уже живут ваши заявки, сотрудники и данные.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {integrationGroups.map((group, index) => (
            <motion.div
              key={group.title}
              className="glass p-6 rounded-2xl"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold mb-4">{group.title}</h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
