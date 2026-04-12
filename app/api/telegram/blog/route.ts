import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { createBlogPost, estimateReadTime, findStagedCover, slugifyTitle, type BlogContentBlock } from '@/lib/blog';

export const runtime = 'nodejs';

type TelegramPhotoSize = {
  file_id: string;
};

type TelegramMessage = {
  chat: { id: number };
  from?: { id: number };
  text?: string;
  caption?: string;
  photo?: TelegramPhotoSize[];
};

type TelegramUpdate = {
  message?: TelegramMessage;
  edited_message?: TelegramMessage;
  channel_post?: TelegramMessage;
};

type ParsedDraft = {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  tags: string[];
  readTime?: string;
  coverAlt: string;
  content: BlogContentBlock[];
};

const HELP_TEXT = [
  'Формат публикации статьи:',
  '',
  '/publish',
  'title: Как AI-агенты ускоряют продажи',
  'slug: ai-sales-speed',
  'excerpt: Короткий анонс для карточки блога.',
  'tags: AI, Продажи, Автоматизация',
  'readTime: 6 мин',
  'coverAlt: AI-агент анализирует заявки в CRM',
  'content:',
  'Первый абзац статьи.',
  '',
  'Второй абзац статьи.',
  '',
  'Третий абзац статьи.',
  '',
  'Чтобы добавить обложку, отправьте фото с подписью:',
  '/blog_cover ai-sales-speed',
  '',
  'Потом отправьте саму статью с таким же slug.',
].join('\n');

function getTelegramMessage(update: TelegramUpdate) {
  return update.message || update.edited_message || update.channel_post || null;
}

function escapeTelegram(text: string) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function parseDate(value?: string) {
  return value?.trim() || new Date().toISOString().slice(0, 10);
}

function parseContentBlocks(raw: string) {
  return raw
    .split(/\n\s*\n/g)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      if (block.toLowerCase().startsWith('image:')) {
        const imagePayload = block.slice('image:'.length).trim();
        const [value, alt] = imagePayload.split('|').map((part) => part.trim());

        return {
          type: 'image',
          value,
          alt: alt || undefined,
        } satisfies BlogContentBlock;
      }

      return {
        type: 'paragraph',
        value: block,
      } satisfies BlogContentBlock;
    });
}

function parseDraft(rawInput: string) {
  const normalized = rawInput.replace(/^\/publish(@\w+)?/i, '').trim();
  const lines = normalized.split('\n');
  const fields = new Map<string, string>();
  const contentLines: string[] = [];
  let isReadingContent = false;

  for (const line of lines) {
    if (!isReadingContent && /^content\s*:/i.test(line)) {
      isReadingContent = true;
      const initialContent = line.replace(/^content\s*:/i, '').trim();
      if (initialContent) {
        contentLines.push(initialContent);
      }
      continue;
    }

    if (isReadingContent) {
      contentLines.push(line);
      continue;
    }

    const match = line.match(/^([a-zA-Z]+)\s*:\s*(.+)$/);
    if (match) {
      fields.set(match[1].toLowerCase(), match[2].trim());
    }
  }

  const title = fields.get('title')?.trim();
  const content = parseContentBlocks(contentLines.join('\n').trim());

  if (!title) {
    throw new Error('Укажите поле title.');
  }

  if (content.length === 0) {
    throw new Error('Добавьте content с текстом статьи.');
  }

  const slug = fields.get('slug')?.trim() || slugifyTitle(title);

  if (!slug) {
    throw new Error('Не удалось собрать slug. Укажите его явно.');
  }

  const firstParagraph = content.find((block) => block.type === 'paragraph');
  const excerpt =
    fields.get('excerpt')?.trim() ||
    firstParagraph?.value.slice(0, 180) ||
    'Новая статья в блоге об AI-агентах для бизнеса.';

  return {
    title,
    slug,
    excerpt,
    date: parseDate(fields.get('date')),
    tags: (fields.get('tags') || 'AI-агенты, Автоматизация')
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean),
    readTime: fields.get('readtime')?.trim() || estimateReadTime(content),
    coverAlt: fields.get('coveralt')?.trim() || title,
    content,
  } satisfies ParsedDraft;
}

async function sendTelegramMessage(chatId: number, text: string) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;

  if (!botToken) {
    return;
  }

  await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    }),
  });
}

async function downloadTelegramFile(fileId: string, slug: string) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;

  if (!botToken) {
    throw new Error('Не настроен TELEGRAM_BOT_TOKEN.');
  }

  const fileInfoResponse = await fetch(`https://api.telegram.org/bot${botToken}/getFile?file_id=${fileId}`);
  const fileInfo = (await fileInfoResponse.json()) as { ok: boolean; result?: { file_path?: string } };

  if (!fileInfo.ok || !fileInfo.result?.file_path) {
    throw new Error('Не удалось получить файл из Telegram.');
  }

  const filePath = fileInfo.result.file_path;
  const extension = path.extname(filePath) || '.jpg';
  const fileResponse = await fetch(`https://api.telegram.org/file/bot${botToken}/${filePath}`);

  if (!fileResponse.ok) {
    throw new Error('Не удалось скачать изображение из Telegram.');
  }

  const publicBlogDirectory = path.join(process.cwd(), 'public', 'blog');
  await fs.mkdir(publicBlogDirectory, { recursive: true });

  const filename = `${slug}-cover${extension}`;
  const destination = path.join(publicBlogDirectory, filename);
  const bytes = await fileResponse.arrayBuffer();

  await fs.writeFile(destination, Buffer.from(bytes));

  return `/blog/${filename}`;
}

async function storeCoverFromMessage(message: TelegramMessage, slug: string) {
  const largestPhoto = message.photo?.at(-1);

  if (!largestPhoto) {
    throw new Error('Пришлите фото вместе с командой /blog_cover.');
  }

  return downloadTelegramFile(largestPhoto.file_id, slug);
}

function isAdmin(message: TelegramMessage) {
  const adminId = process.env.TELEGRAM_ADMIN_CHAT_ID;

  if (!adminId || !message.from?.id) {
    return false;
  }

  return String(message.from.id) === adminId;
}

function isValidSecret(request: NextRequest) {
  const expectedSecret = process.env.TELEGRAM_BLOG_WEBHOOK_SECRET;

  if (!expectedSecret) {
    return true;
  }

  return request.headers.get('x-telegram-bot-api-secret-token') === expectedSecret;
}

async function handleCoverUpload(message: TelegramMessage) {
  const caption = message.caption || '';
  const slug = caption.replace(/^\/blog_cover(@\w+)?/i, '').trim();

  if (!slug) {
    await sendTelegramMessage(message.chat.id, 'После /blog_cover укажите slug статьи, например: /blog_cover ai-sales-speed');
    return;
  }

  const coverPath = await storeCoverFromMessage(message, slug);
  await sendTelegramMessage(
    message.chat.id,
    `Обложка сохранена.\n\n<b>Slug:</b> ${escapeTelegram(slug)}\n<b>Файл:</b> ${escapeTelegram(coverPath)}`,
  );
}

async function handlePublish(message: TelegramMessage) {
  const raw = message.text || message.caption || '';
  const draft = parseDraft(raw);
  const stagedCover = await findStagedCover(draft.slug);
  const messageCover = message.photo?.length ? await storeCoverFromMessage(message, draft.slug) : undefined;
  const coverImage = messageCover || stagedCover;

  const post = await createBlogPost({
    slug: draft.slug,
    title: draft.title,
    excerpt: draft.excerpt,
    date: draft.date,
    readTime: draft.readTime,
    tags: draft.tags,
    coverAlt: draft.coverAlt,
    coverImage,
    featured: false,
    content: draft.content,
  });

  revalidatePath('/blog');
  revalidatePath(`/blog/${post.slug}`);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ai-agents-company.com';
  await sendTelegramMessage(
    message.chat.id,
    [
      '<b>Статья опубликована</b>',
      '',
      `<b>Заголовок:</b> ${escapeTelegram(post.title)}`,
      `<b>Slug:</b> ${escapeTelegram(post.slug)}`,
      `<b>Ссылка:</b> ${escapeTelegram(`${siteUrl}/blog/${post.slug}`)}`,
    ].join('\n'),
  );
}

export async function POST(request: NextRequest) {
  if (!isValidSecret(request)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const update = (await request.json()) as TelegramUpdate;
  const message = getTelegramMessage(update);

  if (!message) {
    return NextResponse.json({ ok: true });
  }

  if (!isAdmin(message)) {
    await sendTelegramMessage(message.chat.id, 'Публикация доступна только для администратора бота.');
    return NextResponse.json({ ok: true });
  }

  try {
    const source = message.text || message.caption || '';

    if (/^\/blog_help(@\w+)?/i.test(source)) {
      await sendTelegramMessage(message.chat.id, HELP_TEXT);
      return NextResponse.json({ ok: true });
    }

    if (/^\/blog_cover(@\w+)?/i.test(source)) {
      await handleCoverUpload(message);
      return NextResponse.json({ ok: true });
    }

    if (/^\/publish(@\w+)?/i.test(source)) {
      await handlePublish(message);
      return NextResponse.json({ ok: true });
    }

    await sendTelegramMessage(
      message.chat.id,
      'Команда не распознана. Используйте /blog_help, чтобы получить шаблон для публикации статьи.',
    );
    return NextResponse.json({ ok: true });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Не удалось обработать публикацию. Попробуйте ещё раз.';

    await sendTelegramMessage(message.chat.id, `Ошибка публикации:\n${escapeTelegram(errorMessage)}`);
    return NextResponse.json({ ok: true });
  }
}
