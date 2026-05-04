import Link from 'next/link';
import { getProjects, getLogMetas } from '@/lib/data';
import { Project, LogMeta } from '@/types';

export default function Home() {
  const projects = getProjects();
  const featuredProjects = projects.slice(0, 3);
  const logs = getLogMetas();

  return (
    <div className="max-w-6xl mx-auto px-6">
      <HeroSection />
      <FeaturedProjects projects={featuredProjects} />
      <TimelineSection logs={logs} />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-3xl">
        <p className="text-accent font-mono text-sm mb-4 animate-fade-in">Frontend Developer</p>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          Building interactive, user-focused experiences
        </h1>
        <p className="text-xl text-foreground-muted mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          I&apos;m Vanessa, a developer specializing in React, TypeScript, and modern web technologies. 
          Currently interning at Makerspace Innovative Hub.
        </p>
        <div className="flex gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <Link 
            href="/work" 
            className="px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-all hover:scale-105"
          >
            View Work
          </Link>
          <Link 
            href="/logs" 
            className="px-6 py-3 border border-border rounded-lg font-medium hover:border-accent hover:text-accent transition-all"
          >
            Read Logs
          </Link>
        </div>
      </div>
    </section>
  );
}

function FeaturedProjects({ projects }: { projects: Project[] }) {
  return (
    <section className="py-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold">Featured Projects</h2>
        <Link href="/work" className="text-accent hover:underline">
          View all →
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <a
      href={project.githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-6 rounded-xl border border-border bg-card hover:border-accent/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-fade-in"
      style={{ animationDelay: `${0.1 * index}s` }}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold">{project.title}</h3>
        <svg className="w-5 h-5 text-foreground-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </div>
      <p className="text-foreground-muted text-sm mb-4 line-clamp-2">{project.description}</p>
      <div className="flex flex-wrap gap-2">
        {project.techStack.slice(0, 3).map(tech => (
          <span key={tech} className="text-xs px-2 py-1 bg-accent/10 text-accent rounded">
            {tech}
          </span>
        ))}
        {project.techStack.length > 3 && (
          <span className="text-xs px-2 py-1 bg-foreground-muted/10 text-foreground-muted rounded">
            +{project.techStack.length - 3}
          </span>
        )}
      </div>
    </a>
  );
}

function TimelineSection({ logs }: { logs: LogMeta[] }) {
  const timelineLogs = logs.slice(0, 4);
  
  return (
    <section className="py-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold">Internship Timeline</h2>
        <Link href="/logs" className="text-accent hover:underline">
          View all →
        </Link>
      </div>
      
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-border md:left-1/2 md:-translate-x-px" />
        
        <div className="space-y-8">
          {timelineLogs.map((log, index) => (
            <TimelineItem key={log.slug} log={log} index={index} />
          ))}
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-card border border-border rounded-lg text-center">
        <p className="text-foreground-muted">
          Currently interning at <span className="text-accent font-medium">Makerspace Innovative Hub</span>
        </p>
      </div>
    </section>
  );
}

function TimelineItem({ log, index }: { log: LogMeta; index: number }) {
  const isEven = index % 2 === 0;
  
  return (
    <div className={`relative flex items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
      <div className="absolute left-4 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white text-sm font-medium md:left-1/2 md:-translate-x-1/2 z-10">
        {log.week}
      </div>
      
      <div className={`ml-12 md:ml-0 md:w-1/2 ${isEven ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
        <Link 
          href={`/logs/${log.slug}`}
          className="block p-4 rounded-lg border border-border bg-card hover:border-accent/50 hover:shadow transition-all"
        >
          <p className="text-xs text-foreground-muted mb-1">{log.date}</p>
          <h3 className="font-medium mb-1">{log.title}</h3>
          <p className="text-sm text-foreground-muted line-clamp-2">{log.description}</p>
        </Link>
      </div>
    </div>
  );
}