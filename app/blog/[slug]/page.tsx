import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { formatBlogDate, getBlogPostBySlug } from '@/lib/blog';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [{ url: post.coverImage, alt: post.coverAlt || post.title }] : undefined,
    },
  };
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <article className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-[0_30px_90px_rgba(4,8,18,0.4)]">
          {post.coverImage ? (
            <div className="relative h-[260px] overflow-hidden sm:h-[340px] lg:h-[420px]">
              <Image src={post.coverImage} alt={post.coverAlt || post.title} fill className="object-cover" sizes="100vw" priority />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,15,25,0.08),rgba(11,15,25,0.82))]" />
            </div>
          ) : null}

          <div className="p-6 sm:p-8 lg:p-10">
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-primary transition hover:gap-3">
              <span aria-hidden="true">←</span>
              Назад к блогу
            </Link>

            <header className="mt-6 border-b border-white/10 pb-8">
              <div className="mb-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">{post.title}</h1>

              <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-slate-400">
                <span>{formatBlogDate(post.date)}</span>
                <span>{post.readTime}</span>
              </div>
            </header>

            <div className="mt-8 space-y-6 text-base leading-8 text-slate-200 sm:text-lg">
              {post.content.map((block, index) => {
                if (block.type === 'image') {
                  return (
                    <figure
                      key={`${block.value}-${index}`}
                      className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5"
                    >
                      <div className="relative aspect-[16/9]">
                        <Image src={block.value} alt={block.alt || post.title} fill className="object-cover" sizes="100vw" />
                      </div>
                      {block.alt ? <figcaption className="px-5 py-4 text-sm text-slate-400">{block.alt}</figcaption> : null}
                    </figure>
                  );
                }

                return <p key={`${index}-${block.value.slice(0, 24)}`}>{block.value}</p>;
              })}
            </div>

            <div className="mt-10 rounded-[1.5rem] border border-primary/20 bg-primary/10 p-6 text-slate-100">
              <p className="text-sm uppercase tracking-[0.24em] text-primary/90">Следующий шаг</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">Хотите такой же сценарий под ваш бизнес?</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                Разберём ваш процесс, покажем, где AI-агент даст быстрый эффект, и предложим формат пилота без лишней
                архитектурной тяжести.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex rounded-full border border-primary/30 bg-primary/15 px-5 py-3 text-sm font-medium text-primary transition hover:border-primary/50 hover:bg-primary/20"
              >
                Обсудить внедрение
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
