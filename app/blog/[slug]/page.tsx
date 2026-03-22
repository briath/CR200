'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const posts = {
  'ai-agents-revolution': {
    title: 'Как AI-агенты революционизируют бизнес-процессы',
    content: `
      <p>Искусственный интеллект уже давно вышел за рамки научной фантастики и стал неотъемлемой частью современного бизнеса. AI-агенты - это следующий шаг в эволюции автоматизации, который обещает перевернуть представление о том, как работают компании.</p>

      <h2>Что такое AI-агенты?</h2>
      <p>AI-агенты - это программные системы, способные автономно выполнять задачи, принимать решения и взаимодействовать с пользователями или другими системами. В отличие от простых скриптов, агенты обладают:</p>
      <ul>
        <li>Способностью к обучению</li>
        <li>Адаптацией к новым ситуациям</li>
        <li>Самостоятельным принятием решений</li>
        <li>Интеграцией с множеством систем</li>
      </ul>

      <h2>Преимущества для бизнеса</h2>
      <p>Внедрение AI-агентов дает компаниям значительные конкурентные преимущества:</p>
      <ul>
        <li><strong>24/7 доступность:</strong> Агенты работают круглосуточно</li>
        <li><strong>Снижение затрат:</strong> Автоматизация рутинных задач</li>
        <li><strong>Повышение качества:</strong> Исключение человеческих ошибок</li>
        <li><strong>Масштабируемость:</strong> Легкое увеличение мощностей</li>
      </ul>

      <h2>Будущее AI-агентов</h2>
      <p>Мы стоим на пороге новой эры, где AI-агенты станут неотъемлемой частью каждого бизнес-процесса. Компании, которые первыми внедрят эти технологии, получат значительное преимущество на рынке.</p>
    `,
    date: '2024-03-15',
    readTime: '5 мин',
  },
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  const post = posts[slug as keyof typeof posts];

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.article
          className="glass p-8 rounded-xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Link href="/blog" className="text-primary hover:text-primary/80 mb-6 inline-block">
            ← Назад к блогу
          </Link>

          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <div className="flex gap-4 text-sm text-gray-400">
              <span>{post.date}</span>
              <span>{post.readTime}</span>
            </div>
          </header>

          <div
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </motion.article>
      </div>
    </div>
  );
}