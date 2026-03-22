'use client';

import ContactForm from '../../components/ContactForm';
import { motion } from 'framer-motion';

export default function ContactPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          className="text-5xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Свяжитесь с нами
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div>
              <h2 className="text-2xl font-semibold mb-4">Давайте обсудим ваш проект</h2>
              <p className="text-gray-300 mb-6">
                Готовы автоматизировать бизнес-процессы с помощью AI? Свяжитесь с нами,
                и мы проведем бесплатный аудит ваших процессов.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-primary text-xl">📧</span>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-300">hello@ai-agents.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-primary text-xl">📱</span>
                <div>
                  <p className="font-medium">Телефон</p>
                  <p className="text-gray-300">+7 (495) 123-45-67</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-primary text-xl">📍</span>
                <div>
                  <p className="font-medium">Адрес</p>
                  <p className="text-gray-300">Москва, Россия</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </div>
  );
}