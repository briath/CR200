import { promises as fs } from 'fs';
import path from 'path';

export type BlogContentBlock =
  | {
      type: 'paragraph';
      value: string;
    }
  | {
      type: 'image';
      value: string;
      alt?: string;
    };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  coverImage?: string;
  coverAlt?: string;
  featured?: boolean;
  content: BlogContentBlock[];
};

export type CreateBlogPostInput = Omit<BlogPost, 'readTime'> & {
  readTime?: string;
};

const blogDirectory = path.join(process.cwd(), 'content', 'blog');
const publicBlogDirectory = path.join(process.cwd(), 'public', 'blog');

async function ensureBlogDirectories() {
  await fs.mkdir(blogDirectory, { recursive: true });
  await fs.mkdir(publicBlogDirectory, { recursive: true });
}

function isBlogPost(value: unknown): value is BlogPost {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Partial<BlogPost>;
  return Boolean(
    candidate.slug &&
      candidate.title &&
      candidate.excerpt &&
      candidate.date &&
      Array.isArray(candidate.tags) &&
      Array.isArray(candidate.content),
  );
}

async function readPostFile(filePath: string) {
  const raw = await fs.readFile(filePath, 'utf8');
  const parsed = JSON.parse(raw) as unknown;

  if (!isBlogPost(parsed)) {
    throw new Error(`Invalid blog post schema in ${filePath}`);
  }

  return parsed;
}

export function formatBlogDate(date: string) {
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));
}

export function estimateReadTime(content: BlogContentBlock[]) {
  const words = content
    .filter((block) => block.type === 'paragraph')
    .reduce((count, block) => count + block.value.trim().split(/\s+/).filter(Boolean).length, 0);

  return `${Math.max(3, Math.ceil(words / 180))} мин`;
}

export function slugifyTitle(value: string) {
  const transliterationMap: Record<string, string> = {
    а: 'a',
    б: 'b',
    в: 'v',
    г: 'g',
    д: 'd',
    е: 'e',
    ё: 'e',
    ж: 'zh',
    з: 'z',
    и: 'i',
    й: 'y',
    к: 'k',
    л: 'l',
    м: 'm',
    н: 'n',
    о: 'o',
    п: 'p',
    р: 'r',
    с: 's',
    т: 't',
    у: 'u',
    ф: 'f',
    х: 'h',
    ц: 'ts',
    ч: 'ch',
    ш: 'sh',
    щ: 'sch',
    ъ: '',
    ы: 'y',
    ь: '',
    э: 'e',
    ю: 'yu',
    я: 'ya',
  };

  return value
    .toLowerCase()
    .split('')
    .map((character) => transliterationMap[character] ?? character)
    .join('')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}

export async function getBlogPosts() {
  await ensureBlogDirectories();
  const entries = await fs.readdir(blogDirectory);
  const posts = await Promise.all(
    entries
      .filter((entry) => entry.endsWith('.json'))
      .map((entry) => readPostFile(path.join(blogDirectory, entry))),
  );

  return posts.sort((left, right) => right.date.localeCompare(left.date));
}

export async function getBlogPostBySlug(slug: string) {
  try {
    return await readPostFile(path.join(blogDirectory, `${slug}.json`));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return null;
    }

    throw error;
  }
}

export async function findStagedCover(slug: string) {
  await ensureBlogDirectories();
  const files = await fs.readdir(publicBlogDirectory);
  const matched = files.find((file) => file.startsWith(`${slug}-cover.`));

  return matched ? `/blog/${matched}` : undefined;
}

export async function createBlogPost(input: CreateBlogPostInput) {
  await ensureBlogDirectories();

  const slug = input.slug.trim();
  const filePath = path.join(blogDirectory, `${slug}.json`);

  try {
    await fs.access(filePath);
    throw new Error('BLOG_POST_ALREADY_EXISTS');
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
      throw error;
    }
  }

  const post: BlogPost = {
    ...input,
    slug,
    title: input.title.trim(),
    excerpt: input.excerpt.trim(),
    readTime: input.readTime?.trim() || estimateReadTime(input.content),
    tags: input.tags.map((tag) => tag.trim()).filter(Boolean),
    content: input.content,
  };

  await fs.writeFile(filePath, `${JSON.stringify(post, null, 2)}\n`, 'utf8');

  return post;
}
