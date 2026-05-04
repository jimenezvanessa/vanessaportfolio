import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Project, LogMeta, Log } from '@/types';

const projectsPath = path.join(process.cwd(), 'src', 'data', 'projects.json');
const logsPath = path.join(process.cwd(), 'content', 'logs');

export function getProjects(): Project[] {
  const fileContents = fs.readFileSync(projectsPath, 'utf8');
  const data = JSON.parse(fileContents);
  return data.projects as Project[];
}

export function getProjectById(id: string): Project | undefined {
  const projects = getProjects();
  return projects.find(p => p.id === id);
}

export function getAllTechStacks(): string[] {
  const projects = getProjects();
  const techStacks = new Set<string>();
  projects.forEach(p => p.techStack.forEach(tech => techStacks.add(tech)));
  return Array.from(techStacks).sort();
}

export function getAllCategories(): string[] {
  const projects = getProjects();
  const categories = new Set<string>();
  projects.forEach(p => categories.add(p.category));
  return Array.from(categories);
}

export function getLogMetas(): LogMeta[] {
  const files = fs.readdirSync(logsPath);
  const metas: LogMeta[] = [];

  files.forEach(file => {
    if (file.endsWith('.mdx') || file.endsWith('.md')) {
      const filePath = path.join(logsPath, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);
      
      metas.push({
        slug: file.replace(/\.mdx?$/, ''),
        title: data.title,
        date: data.date,
        description: data.description,
        week: data.week,
      });
    }
  });

  return metas.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getLogBySlug(slug: string): Log | undefined {
  const files = fs.readdirSync(logsPath);
  const fileName = files.find(f => f.replace(/\.mdx?$/, '') === slug);
  
  if (!fileName) return undefined;

  const filePath = path.join(logsPath, fileName);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title,
    date: data.date,
    description: data.description,
    week: data.week,
    content,
  };
}

export function getAllLogSlugs(): string[] {
  const files = fs.readdirSync(logsPath);
  return files
    .filter(f => f.endsWith('.mdx') || f.endsWith('.md'))
    .map(f => f.replace(/\.mdx?$/, ''));
}