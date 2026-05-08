'use client';

import { useState, useMemo } from 'react';
import { Project } from '@/types';

interface WorkClientProps {
  projects: Project[];
  techStacks: string[];
  categories: string[];
}

export default function WorkClient({ projects, techStacks, categories }: WorkClientProps) {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesTech = !selectedTech || project.techStack.includes(selectedTech);
      const matchesCategory = !selectedCategory || project.category === selectedCategory;
      return matchesTech && matchesCategory;
    });
  }, [projects, selectedTech, selectedCategory]);

  const clearFilters = () => {
    setSelectedTech(null);
    setSelectedCategory(null);
  };

  const hasFilters = Boolean(selectedTech || selectedCategory);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Work</h1>
        <p className="text-foreground-muted text-lg">
          A collection of projects showcasing my skills in frontend development.
        </p>
      </header>

      <FilterSection
        techStacks={techStacks}
        categories={categories}
        selectedTech={selectedTech}
        selectedCategory={selectedCategory}
        onSelectTech={setSelectedTech}
        onSelectCategory={setSelectedCategory}
        onClear={clearFilters}
        hasFilters={hasFilters}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-16">
          <p className="text-foreground-muted">No projects match your filters.</p>
          <button
            onClick={clearFilters}
            className="mt-4 text-accent hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}

function FilterSection({
  techStacks,
  categories,
  selectedTech,
  selectedCategory,
  onSelectTech,
  onSelectCategory,
  onClear,
  hasFilters,
}: {
  techStacks: string[];
  categories: string[];
  selectedTech: string | null;
  selectedCategory: string | null;
  onSelectTech: (tech: string | null) => void;
  onSelectCategory: (category: string | null) => void;
  onClear: () => void;
  hasFilters: boolean;
}) {
  return (
    <div className="mb-10 space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-foreground-muted mr-2">Tech:</span>
        {techStacks.map(tech => (
          <button
            key={tech}
            onClick={() => onSelectTech(selectedTech === tech ? null : tech)}
            className={`px-4 py-2 text-sm rounded-full border transition-all ${
              selectedTech === tech
                ? 'bg-accent text-white border-accent shadow-lg shadow-accent/25'
                : 'border-border hover:border-accent hover:text-accent'
            }`}
          >
            {tech}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-foreground-muted mr-2">Category:</span>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => onSelectCategory(selectedCategory === category ? null : category)}
            className={`px-4 py-2 text-sm rounded-full border transition-all ${
              selectedCategory === category
                ? 'bg-accent text-white border-accent shadow-lg shadow-accent/25'
                : 'border-border hover:border-accent hover:text-accent'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {hasFilters && (
        <button
          onClick={onClear}
          className="text-sm text-foreground-muted hover:text-accent transition-colors"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <div
      className="group block p-6 rounded-xl border border-border bg-card hover:border-accent/50 hover:shadow-xl hover:shadow-accent/10 hover:-translate-y-2 transition-all duration-300"
      style={{ animationDelay: `${0.05 * index}s` }}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent/20 to-accent-secondary/20 flex items-center justify-center mb-3">
            <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold group-hover:text-accent transition-colors">{project.title}</h3>
          <span className="text-xs px-2.5 py-1 bg-accent/10 text-accent rounded-full">
            {project.category}
          </span>
        </div>
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground-muted hover:text-accent transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
      
      <p className="text-foreground-muted text-sm mb-4">{project.description}</p>
      
      <div className="flex flex-wrap gap-2">
        {project.techStack.map(tech => (
          <span key={tech} className="text-xs px-2.5 py-1 bg-foreground-muted/10 text-foreground-muted rounded-full">
            {tech}
          </span>
        ))}
      </div>
      
      <div className="flex items-center justify-between mt-4">
        <p className="text-xs text-foreground-muted">
          {new Date(project.completionDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
        </p>
      </div>
    </div>
  );
}