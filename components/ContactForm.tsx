'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { trackEvent } from '../lib/analytics';

type FormState = {
  name: string;
  email: string;
  company: string;
  message: string;
  website: string;
};

const initialState: FormState = {
  name: '',
  email: '',
  company: '',
  message: '',
  website: '',
};

export default function ContactForm() {
  const [formData, setFormData] = useState<FormState>(initialState);
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [startedAt, setStartedAt] = useState<number>(Date.now());

  useEffect(() => {
    setStartedAt(Date.now());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: 'idle', message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          submittedAt: new Date().toISOString(),
          startedAt,
        }),
      });

      const result = (await response.json()) as { success: boolean; message: string };

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Не удалось отправить заявку.');
      }

      trackEvent('lead_form_submit', {
        form: 'contact',
        status: 'success',
      });

      setStatus({
        type: 'success',
        message: result.message || 'Спасибо! Мы свяжемся с вами в ближайшее время.',
      });
      setFormData(initialState);
      setStartedAt(Date.now());
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Не удалось отправить заявку.';

      trackEvent('lead_form_submit', {
        form: 'contact',
        status: 'error',
        message,
      });

      setStatus({
        type: 'error',
        message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact-form" className="py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.h2
          className="text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Оставьте заявку
        </motion.h2>
        <motion.form
          onSubmit={handleSubmit}
          className="glass p-8 rounded-xl space-y-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden"
          />

          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Имя
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 bg-transparent border border-gray-600 rounded-lg focus:border-primary outline-none"
              placeholder="Как к вам обращаться"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 bg-transparent border border-gray-600 rounded-lg focus:border-primary outline-none"
              placeholder="name@company.ru"
            />
          </div>
          <div>
            <label htmlFor="company" className="block text-sm font-medium mb-2">
              Компания
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full p-3 bg-transparent border border-gray-600 rounded-lg focus:border-primary outline-none"
              placeholder="Название компании"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Какая задача стоит перед бизнесом
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 bg-transparent border border-gray-600 rounded-lg focus:border-primary outline-none resize-none"
              placeholder="Например: нужно автоматизировать обработку входящих лидов и ответы на типовые вопросы клиентов"
            />
          </div>

          {status.type !== 'idle' && (
            <div
              className={`rounded-lg border px-4 py-3 text-sm ${
                status.type === 'success'
                  ? 'border-green-500/40 bg-green-500/10 text-green-200'
                  : 'border-red-500/40 bg-red-500/10 text-red-200'
              }`}
            >
              {status.message}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-primary text-black font-semibold rounded-lg hover:bg-primary/80 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Отправляем...' : 'Отправить заявку'}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
