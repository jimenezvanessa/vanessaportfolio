import Link from 'next/link';
import Image from 'next/image';
import { getProjects, getLogMetas } from '@/lib/data';
import { Project, LogMeta } from '@/types';

export default function Home() {
  const projects = getProjects();
  const featuredProjects = projects.slice(0, 3);
  const logs = getLogMetas();

  return (
    <>
      <div className="max-w-6xl mx-auto px-6">
        <HeroSection />
        <FeaturedProjects projects={featuredProjects} />
        <TimelineSection logs={logs} />
        <SkillsSection />
        <CertificatesSection />
        <ContactSection />
      </div>
    </>
  );
}

function HeroSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
            Open to work
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in">
            Hi, I&apos;m <span className="neon-text">Vanessa</span>
          </h1>
          <p className="text-lg text-foreground-muted mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            A passionate frontend developer specializing in React, TypeScript, and modern web technologies. 
            Currently building amazing things at Makerspace Innovative Hub.
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Link 
              href="/work" 
              className="px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-all hover:scale-105 shadow-lg shadow-accent/25"
            >
              View Work
            </Link>
            <Link 
              href="/logs" 
              className="px-6 py-3 border border-border rounded-lg font-medium hover:border-accent hover:text-accent transition-all"
            >
              Read Logs
            </Link>
            <a 
              href="https://github.com/jimenezvanessa"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-border rounded-lg font-medium hover:border-accent hover:text-accent transition-all flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
          </div>
        </div>
        
        <div className="flex justify-center md:justify-end animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            <div className="absolute inset-0 bg-gradient-to-br from-accent via-accent-secondary to-accent-tertiary rounded-3xl opacity-30 blur-2xl"></div>
            <div className="relative h-full rounded-2xl overflow-hidden border border-border">
              <Image 
                src="/profile.jpg" 
                alt="Vanessa" 
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
                loading="eager"
              />
            </div>
          </div>
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
      className="group block p-6 rounded-xl border border-border bg-card hover:border-accent/50 hover:shadow-xl hover:shadow-accent/10 hover:-translate-y-2 transition-all duration-300"
      style={{ animationDelay: `${0.1 * index}s` }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent/20 to-accent-secondary/20 flex items-center justify-center">
          <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </div>
        <svg className="w-5 h-5 text-foreground-muted group-hover:text-accent transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">{project.title}</h3>
      <p className="text-foreground-muted text-sm mb-4 line-clamp-2">{project.description}</p>
      <div className="flex flex-wrap gap-2">
        {project.techStack.slice(0, 3).map(tech => (
          <span key={tech} className="text-xs px-2.5 py-1 bg-accent/10 text-accent rounded-full">
            {tech}
          </span>
        ))}
        {project.techStack.length > 3 && (
          <span className="text-xs px-2.5 py-1 bg-foreground-muted/10 text-foreground-muted rounded-full">
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
      
      <div className="mt-8 p-6 bg-gradient-to-r from-accent/10 via-accent-secondary/10 to-accent-tertiary/10 border border-border rounded-xl text-center">
        <p className="text-foreground-muted">
          Currently interning at <span className="text-accent font-semibold">Makerspace Innovative Hub</span>
        </p>
      </div>
    </section>
  );
}

function TimelineItem({ log, index }: { log: LogMeta; index: number }) {
  const isEven = index % 2 === 0;
  
  return (
    <div className={`relative flex items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
      <div className="absolute left-4 w-10 h-10 bg-gradient-to-br from-accent to-accent-secondary rounded-full flex items-center justify-center text-white font-semibold md:left-1/2 md:-translate-x-1/2 z-10 shadow-lg shadow-accent/30">
        {log.week}
      </div>
      
      <div className={`ml-14 md:ml-0 md:w-1/2 ${isEven ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
        <Link 
          href={`/logs/${log.slug}`}
          className="block p-5 rounded-xl border border-border bg-card hover:border-accent/50 hover:shadow-lg hover:-translate-y-1 transition-all"
        >
          <p className="text-xs text-accent font-medium mb-2">{log.date}</p>
          <h3 className="font-semibold mb-2">{log.title}</h3>
          <p className="text-sm text-foreground-muted line-clamp-2">{log.description}</p>
        </Link>
      </div>
    </div>
  );
}

function SkillsSection() {
  const skills = [
    { name: "React", level: 90, color: "from-accent to-pink-500" },
    { name: "TypeScript", level: 85, color: "from-accent-secondary to-blue-500" },
    { name: "Next.js", level: 80, color: "from-accent-tertiary to-cyan-500" },
    { name: "Tailwind CSS", level: 90, color: "from-emerald-500 to-green-500" },
    { name: "JavaScript", level: 85, color: "from-yellow-500 to-orange-500" },
    { name: "Node.js", level: 70, color: "from-green-500 to-emerald-500" },
  ];

  return (
    <section className="py-16">
      <h2 className="text-2xl font-semibold mb-8">Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills.map((skill, index) => (
          <div key={skill.name} className="p-5 rounded-xl border border-border bg-card">
            <div className="flex justify-between mb-3">
              <span className="font-medium">{skill.name}</span>
              <span className="text-foreground-muted text-sm">{skill.level}%</span>
            </div>
            <div className="h-2 bg-border rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000`}
                style={{ width: `${skill.level}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CertificatesSection() {
  const certificates = [
    {
      id: 1,
      title: "Frontend Development",
      image: "/certificates/frontend-development.png",
    },
    {
      id: 2,
      title: "Responsive Web Design",
      image: "/certificates/responsive-web-design.png",
    },
  ];

  return (
    <section className="py-16">
      <h2 className="text-2xl font-semibold mb-8">Certificates</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            className="group relative rounded-xl border border-border bg-card overflow-hidden hover:border-accent/50 hover:shadow-lg hover:-translate-y-1 transition-all"
          >
            <div className="aspect-video relative">
              <Image
                src={cert.image}
                alt={cert.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain"
              />
            </div>
            <div className="p-4 border-t border-border">
              <h3 className="font-semibold">{cert.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ContactSection() {
  const contactInfo = {
    email: "jimenezvanessac.27@gmail.com",
    phone: "+639068540366",
    resume: "https://www.canva.com/design/DAGlLDXGCqU/YqSo8c__3uJY-f6YiznjqA/edit",
  };

  return (
    <section className="py-16">
      <h2 className="text-2xl font-semibold mb-8">Get In Touch</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <a
          href={`mailto:${contactInfo.email}`}
          className="p-6 rounded-xl border border-border bg-card hover:border-accent/50 hover:shadow-lg hover:-translate-y-1 transition-all flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
            <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-foreground-muted">Email</p>
            <p className="font-medium">{contactInfo.email}</p>
          </div>
        </a>

        <a
          href={`tel:${contactInfo.phone}`}
          className="p-6 rounded-xl border border-border bg-card hover:border-accent/50 hover:shadow-lg hover:-translate-y-1 transition-all flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
            <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-foreground-muted">Phone</p>
            <p className="font-medium">{contactInfo.phone}</p>
          </div>
        </a>

        <a
          href={contactInfo.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="p-6 rounded-xl border border-border bg-card hover:border-accent/50 hover:shadow-lg hover:-translate-y-1 transition-all flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
            <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-foreground-muted">Resume / CV</p>
            <p className="font-medium">View Document</p>
          </div>
        </a>
      </div>
    </section>
  );
}