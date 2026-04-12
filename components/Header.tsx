'use client';

import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

const navItems = [
  { href: '/services', label: 'Услуги' },
  { href: '/cases', label: 'Кейсы' },
  { href: '/blog', label: 'Блог' },
  { href: '/contact', label: 'Контакты' },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-40 glass backdrop-blur-md"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="text-lg sm:text-xl md:text-2xl font-bold text-primary shrink-0">
            AI Agents
          </Link>

          <nav className="hidden md:flex items-center gap-8">
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

          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/contact"
              className="hidden sm:inline-flex px-4 md:px-6 py-2 bg-primary text-black font-semibold rounded-lg hover:bg-primary/80 transition-colors"
            >
              Обсудить проект
            </Link>

            <button
              type="button"
              className="inline-flex md:hidden items-center justify-center w-11 h-11 rounded-lg border border-white/15 bg-white/5 text-white"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label={isMobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
              aria-expanded={isMobileMenuOpen}
            >
              <span className="text-xl leading-none">{isMobileMenuOpen ? '×' : '☰'}</span>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden border-t border-white/10 bg-[#0f1728]/95 backdrop-blur-xl"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-4 py-4 flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-4 py-3 text-white hover:bg-white/5 hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <Link
                href="/contact"
                className="mt-2 inline-flex justify-center rounded-xl px-4 py-3 bg-primary text-black font-semibold hover:bg-primary/80 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Получить консультацию
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
