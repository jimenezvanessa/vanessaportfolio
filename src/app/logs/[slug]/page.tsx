import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getLogBySlug, getAllLogSlugs } from '@/lib/data';
import { MDXRemote } from 'next-mdx-remote/rsc';

export async function generateStaticParams() {
  const slugs = getAllLogSlugs();
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const log = getLogBySlug(slug);
  
  if (!log) {
    return { title: 'Log Not Found' };
  }
  
  return {
    title: `${log.title} | Vanessa's Logs`,
    description: log.description,
  };
}

export default async function LogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const log = getLogBySlug(slug);

  if (!log) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <Link
        href="/logs"
        className="inline-flex items-center gap-2 text-foreground-muted hover:text-accent transition-colors mb-8"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Logs
      </Link>

      <article className="prose prose-slate max-w-none">
        <header className="mb-8 not-prose">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-sm px-3 py-1 bg-accent text-white rounded">
              Week {log.week}
            </span>
            <span className="text-sm text-foreground-muted">{log.date}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">{log.title}</h1>
        </header>

        <div className="prose-headings:font-semibold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-p:text-foreground-muted prose-p:leading-relaxed prose-ul:text-foreground-muted prose-li:text-foreground-muted">
          <MDXRemote source={log.content} />
        </div>
      </article>
    </div>
  );
}