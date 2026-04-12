import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Пользовательское соглашение',
  description: 'Условия использования сайта AI Agents и порядок взаимодействия с посетителями.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen px-4 py-20">
      <div className="mx-auto max-w-4xl glass rounded-2xl p-6 sm:p-8">
        <h1 className="text-4xl font-bold mb-6">Пользовательское соглашение</h1>
        <div className="space-y-5 text-gray-300 leading-8">
          <p>
            Используя сайт AI Agents, пользователь соглашается с настоящими условиями и обязуется
            предоставлять достоверную информацию при заполнении форм.
          </p>
          <p>
            Материалы сайта носят информационный характер и не являются публичной офертой, если иное
            прямо не указано отдельно.
          </p>
          <p>
            Мы оставляем за собой право обновлять содержание сайта, перечень услуг, условия
            взаимодействия и настоящие положения без предварительного уведомления.
          </p>
          <p>
            Все материалы сайта, включая тексты, структуру страниц и элементы интерфейса, защищены
            законодательством об интеллектуальной собственности.
          </p>
          <p>
            Для обсуждения проекта, условий сотрудничества или уточнения деталей можно связаться по
            адресу:
            {' '}
            <a
              href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@ai-agents.com'}`}
              className="text-primary"
            >
              {process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@ai-agents.com'}
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
