'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const messages = [
  { type: 'bot', text: 'Привет! Я AI-агент. Расскажите о вашем бизнесе, и я помогу рассчитать ROI от автоматизации.' },
];

const responses = {
  'продажи': 'Для отдела продаж я могу автоматизировать квалификацию лидов, отправку персонализированных предложений и follow-up. ROI обычно 300-500% в первый год.',
  'поддержка': 'Для поддержки клиентов я создам чат-бот, который решит 70% запросов автоматически. Сокращение затрат на 40%.',
  'операции': 'Для операционных процессов автоматизирую рутину: обработку документов, отчеты, координацию. Освобождение до 50% времени сотрудников.',
  'default': 'Расскажите подробнее о ваших процессах, и я дам точный расчет преимуществ AI-автоматизации.',
};

export default function AIDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState(messages);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { type: 'user', text: input };
    setChatMessages([...chatMessages, userMessage]);

    // Mock response
    setTimeout(() => {
      const responseText = responses[input.toLowerCase().includes('продаж') ? 'продажи' :
                           input.toLowerCase().includes('поддержк') ? 'поддержка' :
                           input.toLowerCase().includes('операци') ? 'операции' : 'default'];
      const botMessage = { type: 'bot', text: responseText };
      setChatMessages(prev => [...prev, botMessage]);
    }, 1000);

    setInput('');
  };

  return (
    <>
      {/* Chat button */}
      <motion.button
        className="fixed bottom-6 right-6 w-16 h-16 bg-primary text-black rounded-full flex items-center justify-center text-2xl font-bold shadow-lg glow z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        🤖
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 w-80 h-96 glass rounded-xl p-4 z-40 flex flex-col"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">AI Demo</h3>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">✕</button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-3 mb-4">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs p-3 rounded-lg ${msg.type === 'user' ? 'bg-primary text-black' : 'bg-gray-700 text-white'}`}>
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
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Опишите ваш бизнес..."
                className="flex-1 p-2 bg-transparent border border-gray-600 rounded focus:border-primary outline-none"
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