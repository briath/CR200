'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

const initialMessages = [
  {
    type: 'bot',
    text: 'Здравствуйте! Опишите вашу задачу, и я подскажу, где AI-агент даст максимальный эффект.',
  },
];

const responses = {
  sales:
    'Для продаж AI-агент может квалифицировать лидов, отвечать на типовые вопросы, делать follow-up и передавать в CRM только тёплые заявки.',
  support:
    'Для поддержки мы обычно автоматизируем первую линию, поиск ответов по базе знаний и передачу сложных кейсов оператору.',
  operations:
    'Для операционных процессов AI-агенты хорошо работают с документами, отчётами, сверками и внутренними согласованиями.',
  default:
    'Расскажите чуть подробнее о процессе или отделе, который хотите усилить. Я подскажу подходящий сценарий автоматизации.',
};

export default function AIDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState(initialMessages);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { type: 'user', text: input };
    setChatMessages((prev) => [...prev, userMessage]);

    const normalizedInput = input.toLowerCase();

    setTimeout(() => {
      const responseText = responses[
        normalizedInput.includes('продаж')
          ? 'sales'
          : normalizedInput.includes('поддерж')
            ? 'support'
            : normalizedInput.includes('операц')
              ? 'operations'
              : 'default'
      ];

      const botMessage = { type: 'bot', text: responseText };
      setChatMessages((prev) => [...prev, botMessage]);
    }, 1000);

    setInput('');
  };

  return (
    <>
      <motion.button
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-14 h-14 sm:w-16 sm:h-16 bg-primary text-black rounded-full flex items-center justify-center text-2xl font-bold shadow-lg glow z-50"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Скрыть AI-демо' : 'Открыть AI-демо'}
      >
        🤖
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-20 left-3 right-3 sm:left-auto sm:right-6 sm:bottom-24 w-auto sm:w-80 h-[26rem] sm:h-96 glass rounded-xl p-4 z-40 flex flex-col"
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex justify-between items-center mb-4 gap-3">
              <h3 className="font-semibold">AI Demo</h3>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-1">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] p-3 rounded-lg break-words ${
                      msg.type === 'user' ? 'bg-primary text-black' : 'bg-gray-700 text-white'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Опишите вашу задачу..."
                className="min-w-0 flex-1 p-2 bg-transparent border border-gray-600 rounded focus:border-primary outline-none"
              />
              <button onClick={handleSend} className="px-4 py-2 bg-primary text-black rounded hover:bg-primary/80">
                →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
