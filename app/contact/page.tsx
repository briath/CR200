'use client';

import ContactForm from '../../components/ContactForm';
import { motion } from 'framer-motion';

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@ai-agents.com';
const contactPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE || '+7 (495) 123-45-67';
const contactAddress = process.env.NEXT_PUBLIC_CONTACT_ADDRESS || 'Санкт-Петербург';

const meetingAgenda = [
  'Разберём, где у вас теряются заявки, время или качество сервиса.',
  'Поймём, какие процессы можно отдавать AI-агенту без риска для бизнеса.',
  'Оценим формат запуска: пилот, MVP или полноценное внедрение.',
];

export default function ContactPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary mb-4">
            Контакт
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Обсудим, где AI даст быстрый бизнес-эффект
          </h1>
          <p className="text-base sm:text-lg text-gray-300">
            Без долгих брифов и абстрактных презентаций. Сначала разбираем вашу реальную задачу,
            потом предлагаем формат запуска, который можно внедрить и измерить.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 md:gap-12 items-start">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="glass rounded-2xl p-6 sm:p-8">
              <h2 className="text-2xl font-semibold mb-5">Что будет на первом созвоне</h2>
              <div className="space-y-4">
                {meetingAgenda.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="text-accent mt-1">●</span>
                    <p className="text-gray-300">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl p-6 sm:p-8">
              <h2 className="text-2xl font-semibold mb-5">Контакты</h2>
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <span className="text-primary text-xl">📧</span>
                  <div className="min-w-0">
                    <p className="font-medium">Email</p>
                    <a
                      href={`mailto:${contactEmail}`}
                      className="text-gray-300 hover:text-primary transition-colors break-all"
                    >
                      {contactEmail}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-primary text-xl">📱</span>
                  <div className="min-w-0">
                    <p className="font-medium">Телефон</p>
                    <a href={`tel:${contactPhone}`} className="text-gray-300 hover:text-primary transition-colors">
                      {contactPhone}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-primary text-xl">📍</span>
                  <div className="min-w-0">
                    <p className="font-medium">Адрес</p>
                    <p className="text-gray-300 break-words">{contactAddress}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
