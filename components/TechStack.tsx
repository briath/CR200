'use client';

import { motion } from 'framer-motion';

const technologies = [
  { name: 'OpenAI', logo: '🤖' },
  { name: 'LangChain', logo: '🔗' },
  { name: 'LlamaIndex', logo: '🦙' },
  { name: 'Pinecone', logo: '🌲' },
  { name: 'FastAPI', logo: '⚡' },
  { name: 'Docker', logo: '🐳' },
];

export default function TechStack() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Технологический стек
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              className="glass p-6 rounded-xl text-center hover:scale-110 transition-transform"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.1 }}
            >
              <div className="text-4xl mb-2">{tech.logo}</div>
              <p className="text-sm font-medium">{tech.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
