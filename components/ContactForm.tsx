'use client';

'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
        setFormData({ name: '', email: '', company: '', message: '' });
      } else {
        alert('Ошибка отправки. Попробуйте еще раз.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Ошибка отправки. Попробуйте еще раз.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.h2
          className="text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Свяжитесь с нами
        </motion.h2>
        <motion.form
          onSubmit={handleSubmit}
          className="glass p-8 rounded-xl space-y-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
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
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Сообщение
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 bg-transparent border border-gray-600 rounded-lg focus:border-primary outline-none resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full py-4 bg-primary text-black font-semibold rounded-lg hover:bg-primary/80 transition-colors"
          >
            Отправить
          </button>
        </motion.form>
      </div>
    </section>
  );
}