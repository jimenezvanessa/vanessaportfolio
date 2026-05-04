export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  completionDate: string;
  category: 'Frontend' | 'Fullstack' | 'Tool' | 'Research';
  githubUrl: string;
  demoUrl?: string;
  image?: string;
}

export interface LogMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  week: number;
}

export interface Log extends LogMeta {
  content: string;
}