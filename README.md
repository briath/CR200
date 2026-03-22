# AI Agents Company

Высококонверсионный B2B лендинг для компании, разрабатывающей AI-агентов для бизнеса.

## Описание проекта

Современный сайт с темной cyberpunk темой, построенный на Next.js 16 с использованием TypeScript, Tailwind CSS и Framer Motion. Сайт включает:

- Главную страницу с секциями Hero, Проблемы/Решения, Услуги, Технологии, Кейсы, Процесс, Доверие, Калькулятор стоимости, Контактная форма
- Страницы Услуг, Кейсов, Блога, Контактов
- AI Demo Widget (мини-чат)
- Полная SEO оптимизация (sitemap, robots.txt, meta tags)
- Адаптивный дизайн
- Анимации и эффекты

## Технологии

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **React 19**

## Запуск проекта

1. Установите зависимости:
```bash
npm install
```

2. Запустите сервер разработки:
```bash
npm run dev
```

3. Откройте [http://localhost:3000](http://localhost:3000) в браузере.

## Сборка для продакшена

```bash
npm run build
npm start
```

## Структура проекта

```
app/
├── api/contact/          # API для обработки форм
├── blog/                 # Страницы блога
├── cases/                # Страница кейсов
├── contact/              # Контактная страница
├── services/             # Страница услуг
├── globals.css           # Глобальные стили
├── layout.tsx            # Корневой layout
├── page.tsx              # Главная страница
├── robots.ts             # Robots.txt
└── sitemap.ts            # Sitemap.xml

components/
├── AIDemo.tsx            # AI Demo Widget
├── Cases.tsx             # Секция кейсов
├── ContactForm.tsx       # Контактная форма
├── CostCalculator.tsx    # Калькулятор стоимости
├── Header.tsx            # Навигационная панель
├── Hero.tsx              # Hero секция
├── ProblemSolution.tsx   # Проблемы/Решения
├── Process.tsx           # Процесс работы
├── Services.tsx          # Услуги
├── TechStack.tsx         # Технологический стек
└── Trust.tsx             # Доверие и безопасность
```

## Цветовая схема

- Background: #0B0F19
- Primary: #00D1FF
- Secondary: #7B61FF
- Accent: #00FF94

## Запуск с Docker

### Предварительные требования
Установите Docker и Docker Compose на ваш компьютер.

### Сборка и запуск
```bash
# Сборка образа и запуск контейнера
docker-compose up --build

# Или в фоне
docker-compose up -d --build
```

Приложение будет доступно по адресу: http://localhost:3000

### Остановка
```bash
docker-compose down
```

### Только продакшен сборка
```bash
docker build -t ai-agents-site .
docker run -p 3000:3000 ai-agents-site
```
