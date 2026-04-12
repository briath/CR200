import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { formatBlogDate, getBlogPosts } from '@/lib/blog';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Блог об AI-автоматизации для бизнеса',
  description:
    'Практические материалы о внедрении AI-агентов, ROI автоматизации, продажах, поддержке и внутренних процессах компании.',
};

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();
  const [featuredPost, ...otherPosts] = blogPosts;

  return (
    <div className="min-h-screen px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(0,209,255,0.18),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(123,97,255,0.18),transparent_30%),linear-gradient(160deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] px-6 py-10 sm:px-10 sm:py-14">
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.07),transparent_36%,transparent_64%,rgba(255,255,255,0.04))]" />
          <div className="relative mx-auto max-w-3xl text-center">
            <p className="mb-4 text-sm uppercase tracking-[0.32em] text-primary/90">Блог</p>
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Материалы о внедрении AI-агентов в бизнес
            </h1>
            <p className="mt-6 text-base leading-8 text-slate-300 sm:text-lg">
              Пишем о том, как компании считают ROI, где автоматизация даёт реальный результат и как запускать AI-сценарии
              без хайпа, но с понятным бизнес-эффектом.
            </p>
          </div>
        </section>

        {featuredPost ? (
          <section className="mt-10">
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group grid overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-[0_30px_80px_rgba(3,8,20,0.45)] transition duration-300 hover:-translate-y-1 hover:border-primary/40 lg:grid-cols-[1.2fr_0.8fr]"
            >
              <div className="relative min-h-[320px] overflow-hidden">
                {featuredPost.coverImage ? (
                  <Image
                    src={featuredPost.coverImage}
                    alt={featuredPost.coverAlt || featuredPost.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority
                  />
                ) : null}
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(11,15,25,0.18),rgba(11,15,25,0.82))]" />
              </div>

              <div className="relative flex flex-col justify-between gap-8 p-6 sm:p-8 lg:p-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,209,255,0.08),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(123,97,255,0.12),transparent_40%)]" />
                <div className="relative">
                  <div className="mb-5 flex flex-wrap items-center gap-3 text-sm text-slate-300">
                    <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-primary">Рекомендуем начать отсюда</span>
                    <span>{formatBlogDate(featuredPost.date)}</span>
                    <span>{featuredPost.readTime}</span>
                  </div>
                  <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">{featuredPost.title}</h2>
                  <p className="mt-5 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">{featuredPost.excerpt}</p>
                </div>

                <div className="relative">
                  <div className="mb-6 flex flex-wrap gap-2">
                    {featuredPost.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-primary transition group-hover:gap-3">
                    Читать статью
                    <span aria-hidden="true">→</span>
                  </span>
                </div>
              </div>
            </Link>
          </section>
        ) : null}

        <section className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {otherPosts.map((post) => (
            <article
              key={post.slug}
              className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04] shadow-[0_24px_64px_rgba(4,9,18,0.32)] transition duration-300 hover:-translate-y-1 hover:border-primary/30"
            >
              <Link href={`/blog/${post.slug}`} className="block h-full">
                <div className="relative h-56 overflow-hidden">
                  {post.coverImage ? (
                    <Image
                      src={post.coverImage}
                      alt={post.coverAlt || post.title}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-[1.05]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,15,25,0.05),rgba(11,15,25,0.7))]" />
                </div>

                <div className="relative p-6">
                  <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-slate-400">
                    <span>{formatBlogDate(post.date)}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="text-2xl font-semibold leading-tight text-white transition group-hover:text-primary">{post.title}</h2>
                  <p className="mt-4 text-sm leading-7 text-slate-300">{post.excerpt}</p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5 text-sm">
                    <span className="text-slate-400">Практический материал</span>
                    <span className="font-medium text-primary">Открыть →</span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}
