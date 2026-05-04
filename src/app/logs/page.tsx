import Link from 'next/link';
import { getLogMetas } from '@/lib/data';
import { LogMeta } from '@/types';

export default function LogsPage() {
  const logs = getLogMetas();

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Logs</h1>
        <p className="text-foreground-muted text-lg">
          Weekly learning logs from my internship at Makerspace Innovative Hub.
        </p>
      </header>

      <div className="space-y-6">
        {logs.map((log, index) => (
          <LogCard key={log.slug} log={log} index={index} />
        ))}
      </div>
    </div>
  );
}

function LogCard({ log, index }: { log: LogMeta; index: number }) {
  return (
    <Link
      href={`/logs/${log.slug}`}
      className="group block p-6 rounded-xl border border-border bg-card hover:border-accent/50 hover:shadow-xl hover:shadow-accent/10 hover:-translate-y-2 transition-all duration-300"
      style={{ animationDelay: `${0.1 * index}s` }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-sm px-3 py-1 bg-gradient-to-r from-accent to-accent-secondary text-white rounded-full font-medium">
              Week {log.week}
            </span>
            <span className="text-sm text-foreground-muted">{log.date}</span>
          </div>
          <h2 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">{log.title}</h2>
          <p className="text-foreground-muted text-sm">{log.description}</p>
        </div>
        <svg className="w-6 h-6 text-foreground-muted group-hover:text-accent group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}