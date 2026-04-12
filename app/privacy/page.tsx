import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Политика конфиденциальности',
  description: 'Политика обработки и защиты персональных данных посетителей сайта AI Agents.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen px-4 py-20">
      <div className="mx-auto max-w-4xl glass rounded-2xl p-6 sm:p-8">
        <h1 className="text-4xl font-bold mb-6">Политика конфиденциальности</h1>
        <div className="space-y-5 text-gray-300 leading-8">
          <p>
            Настоящая политика определяет порядок обработки персональных данных, которые пользователь
            передаёт через формы на сайте AI Agents.
          </p>
          <p>
            Мы используем персональные данные исключительно для связи по заявке, обсуждения проекта,
            подготовки коммерческого предложения и исполнения договорных обязательств.
          </p>
          <p>
            Передаваемые данные могут включать имя, email, телефон, название компании и описание
            задачи. Мы не передаём эти данные третьим лицам без законных оснований.
          </p>
          <p>
            Пользователь, отправляя данные через сайт, подтверждает своё согласие на их обработку в
            целях обратной связи и обсуждения услуг.
          </p>
          <p>
            По вопросам обработки персональных данных можно связаться по адресу:
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
