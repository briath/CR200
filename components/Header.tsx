'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const navItems = [
  { href: '/', label: 'Главная' },
  { href: '/services', label: 'Услуги' },
  { href: '/cases', label: 'Кейсы' },
  { href: '/blog', label: 'Блог' },
  { href: '/contact', label: 'Контакты' },
];

export default function Header() {
  return (
    <motion.header
      className="fixed top-0 w-full z-30 glass backdrop-blur-md"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-primary">
            AI Agents
          </Link>

          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/contact"
            className="px-6 py-2 bg-primary text-black font-semibold rounded-lg hover:bg-primary/80 transition-colors"
          >
            Связаться
          </Link>
        </div>
      </div>
    </motion.header>
  );
}