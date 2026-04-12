'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function CostCalculator() {
  const [tasks, setTasks] = useState(50);
  const [integrations, setIntegrations] = useState(2);
  const [agentType, setAgentType] = useState('basic');

  const calculateCost = () => {
    const baseCost = 50000;
    const taskCost = tasks * 500;
    const integrationCost = integrations * 15000;
    const typeMultiplier = agentType === 'advanced' ? 1.5 : agentType === 'premium' ? 2 : 1;
    return Math.round((baseCost + taskCost + integrationCost) * typeMultiplier);
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Предварительная оценка проекта
        </motion.h2>
        <div className="glass p-8 rounded-xl">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Количество сценариев автоматизации: {tasks}
                </label>
                <input
                  type="range"
                  min="10"
                  max="200"
                  value={tasks}
                  onChange={(e) => setTasks(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Количество интеграций: {integrations}
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={integrations}
                  onChange={(e) => setIntegrations(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Тип решения</label>
                <select
                  value={agentType}
                  onChange={(e) => setAgentType(e.target.value)}
                  className="w-full p-2 bg-transparent border border-gray-600 rounded"
                >
                  <option value="basic">Пилот</option>
                  <option value="advanced">Рабочий MVP</option>
                  <option value="premium">Полноценное внедрение</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="text-center mb-6">
                <p className="text-2xl font-bold text-primary mb-2">Ориентир по бюджету</p>
                <p className="text-4xl font-bold text-accent">
                  {calculateCost().toLocaleString('ru-RU')} ₽
                </p>
              </div>
              <a
                href="/contact"
                className="px-8 py-4 bg-accent text-black font-semibold rounded-lg hover:bg-accent/80 transition-colors"
              >
                Получить точную оценку
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
