'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const posts = [
  {
    id: 1,
    title: 'Как AI-агенты революционизируют бизнес-процессы',
    excerpt: 'Узнайте, как искусственный интеллект меняет подход к автоматизации в компаниях любого размера.',
    date: '2024-03-15',
    readTime: '5 мин',
    slug: 'ai-agents-revolution',
  },
  {
    id: 2,
    title: 'ROI от внедрения AI в отдел продаж',
    excerpt: 'Анализ реальных кейсов и расчет окупаемости инвестиций в AI-автоматизацию продаж.',
    date: '2024-03-10',
    readTime: '7 мин',
    slug: 'roi-ai-sales',
  },
  {
    id: 3,
    title: 'Будущее поддержки клиентов: от чат-ботов к полноценным AI-агентам',
    excerpt: 'Эволюция технологий поддержки и что ожидать в ближайшие годы.',
    date: '2024-03-05',
    readTime: '6 мин',
    slug: 'future-customer-support',
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          className="text-5xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Блог
        </motion.h1>

        <div className="space-y-8">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              className="glass p-6 rounded-xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-semibold hover:text-primary transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <div className="text-sm text-gray-400">
                  {post.readTime}
                </div>
              </div>
              <p className="text-gray-300 mb-4">{post.excerpt}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">{post.date}</span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  Читать далее →
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}