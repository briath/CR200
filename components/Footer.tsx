import Link from 'next/link';

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@ai-agents.com';
const contactPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE || '+7 (495) 123-45-67';
const contactAddress = process.env.NEXT_PUBLIC_CONTACT_ADDRESS || 'Санкт-Петербург';

const navItems = [
  { href: '/services', label: 'Услуги' },
  { href: '/cases', label: 'Кейсы' },
  { href: '/blog', label: 'Блог' },
  { href: '/contact', label: 'Контакты' },
];

const legalItems = [
  { href: '/privacy', label: 'Политика конфиденциальности' },
  { href: '/terms', label: 'Пользовательское соглашение' },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#09111f]">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Link href="/" className="text-2xl font-bold text-primary">
              AI Agents
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-7 text-gray-300">
              Внедряем AI-агентов для продаж, поддержки и операционных процессов. Помогаем
              бизнесу запускать практичную автоматизацию без лишней сложности.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
              Навигация
            </h2>
            <div className="space-y-3">
              {navItems.map((item) => (
                <div key={item.href}>
                  <Link href={item.href} className="text-gray-200 transition-colors hover:text-primary">
                    {item.label}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
              Контакты
            </h2>
            <div className="space-y-3 text-gray-200">
              <div>
                <a href={`mailto:${contactEmail}`} className="transition-colors hover:text-primary break-all">
                  {contactEmail}
                </a>
              </div>
              <div>
                <a href={`tel:${contactPhone}`} className="transition-colors hover:text-primary">
                  {contactPhone}
                </a>
              </div>
              <div className="text-gray-300">{contactAddress}</div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-gray-400 md:flex-row md:items-center md:justify-between">
          <div>© 2026 AI Agents. Все права защищены.</div>
          <div className="flex flex-col gap-2 md:flex-row md:gap-6">
            {legalItems.map((item) => (
              <Link key={item.href} href={item.href} className="transition-colors hover:text-primary">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
