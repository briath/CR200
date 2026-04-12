import { NextRequest, NextResponse } from 'next/server';

type ContactPayload = {
  name: string;
  email: string;
  company?: string;
  message: string;
  website?: string;
  startedAt?: number;
  submittedAt?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const requestLog = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const MIN_FILL_TIME_MS = 4000;

function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim() || 'unknown';
  }

  return request.headers.get('x-real-ip') || 'unknown';
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const recentRequests = (requestLog.get(ip) || []).filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);

  if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestLog.set(ip, recentRequests);
    return true;
  }

  recentRequests.push(now);
  requestLog.set(ip, recentRequests);
  return false;
}

function validatePayload(payload: ContactPayload) {
  if (payload.website?.trim()) {
    return 'Не удалось отправить заявку.';
  }

  if (!payload.name?.trim()) {
    return 'Укажите ваше имя.';
  }

  if (!payload.email?.trim() || !emailPattern.test(payload.email)) {
    return 'Укажите корректный email.';
  }

  if (!payload.message?.trim() || payload.message.trim().length < 10) {
    return 'Опишите задачу чуть подробнее, хотя бы в 10 символах.';
  }

  if (payload.startedAt && Date.now() - payload.startedAt < MIN_FILL_TIME_MS) {
    return 'Форма отправлена слишком быстро. Попробуйте ещё раз.';
  }

  return null;
}

function escapeTelegram(text: string) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

async function sendToTelegram(payload: ContactPayload) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_ADMIN_CHAT_ID;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ai-agents-company.com';

  if (!botToken || !chatId) {
    return false;
  }

  const message = [
    '<b>Новая заявка с сайта</b>',
    '',
    `<b>Имя:</b> ${escapeTelegram(payload.name.trim())}`,
    `<b>Email:</b> ${escapeTelegram(payload.email.trim())}`,
    `<b>Компания:</b> ${escapeTelegram(payload.company?.trim() || 'Не указана')}`,
    `<b>Задача:</b> ${escapeTelegram(payload.message.trim())}`,
    `<b>Источник:</b> ${escapeTelegram(siteUrl)}`,
    `<b>Время:</b> ${escapeTelegram(new Date().toLocaleString('ru-RU'))}`,
  ].join('\n');

  const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Telegram responded with status ${response.status}: ${errorText}`);
  }

  return true;
}

export async function POST(request: NextRequest) {
  try {
    const clientIp = getClientIp(request);

    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Слишком много попыток отправки. Попробуйте ещё раз чуть позже.',
        },
        { status: 429 },
      );
    }

    const payload = (await request.json()) as ContactPayload;
    const validationError = validatePayload(payload);

    if (validationError) {
      return NextResponse.json({ success: false, message: validationError }, { status: 400 });
    }

    const delivered = await sendToTelegram(payload);

    if (!delivered) {
      console.warn('Telegram credentials are not configured. Submission was logged only.', payload);
    }

    return NextResponse.json({
      success: true,
      message: delivered
        ? 'Спасибо! Заявка отправлена в Telegram, скоро свяжемся с вами.'
        : 'Спасибо! Заявка сохранена. Подключите Telegram-бота, чтобы получать её автоматически.',
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Не удалось отправить заявку. Попробуйте ещё раз или напишите нам напрямую.',
      },
      { status: 500 },
    );
  }
}
