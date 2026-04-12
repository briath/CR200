# AI Agents

Лендинг для бизнеса, который предлагает услуги по внедрению AI-агентов для продаж, поддержки и внутренних процессов.

## Технологии

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion

## Локальный запуск

```bash
npm install
npm run dev
```

Сайт будет доступен по адресу `http://localhost:3000`.

## Production build

```bash
npm run lint
npm run build
npm start
```

## Docker

```bash
docker compose --env-file .env.local up --build -d
```

Остановка:

```bash
docker compose --env-file .env.local down
```

## Переменные окружения

Основные:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_CONTACT_EMAIL`
- `NEXT_PUBLIC_CONTACT_PHONE`
- `NEXT_PUBLIC_CONTACT_ADDRESS`
- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_ADMIN_CHAT_ID`

Опционально:

- `TELEGRAM_BLOG_WEBHOOK_SECRET`
- `NEXT_PUBLIC_GTM_ID`
- `NEXT_PUBLIC_YANDEX_METRIKA_ID`

Шаблон лежит в [`.env.example`](./.env.example).

## Блог и публикация через Telegram

Статьи хранятся в `content/blog/*.json`, а изображения для карточек и страниц лежат в `public/blog/`.

Чтобы бот публиковал новые статьи:

1. Настройте webhook на `/api/telegram/blog`.
2. При желании задайте секрет через `TELEGRAM_BLOG_WEBHOOK_SECRET`.
3. Отправьте боту `/blog_help`, чтобы получить шаблон.

Шаблон статьи:

```text
/publish
title: Как AI-агенты ускоряют продажи
slug: ai-sales-speed
excerpt: Короткий анонс для карточки блога.
tags: AI, Продажи, Автоматизация
readTime: 6 мин
coverAlt: AI-агент анализирует заявки в CRM
content:
Первый абзац статьи.

Второй абзац статьи.

Третий абзац статьи.
```

Чтобы прикрепить обложку:

1. Отправьте фото с подписью `/blog_cover ai-sales-speed`
2. Потом отправьте команду `/publish` с таким же `slug`

Изображения внутри текста тоже поддерживаются через блок:

```text
image: /blog/my-inline-image.jpg | Подпись к изображению
```

## Что уже подготовлено

- форма отправки заявок в Telegram
- антиспам-защита: honeypot, проверка времени заполнения, rate limit на API
- блог с файловым хранилищем, обложками и Telegram-публикацией
- SEO: sitemap, robots, metadata, Open Graph, Twitter card
- юридические страницы
- Docker-конфиг для локального запуска и проверки
