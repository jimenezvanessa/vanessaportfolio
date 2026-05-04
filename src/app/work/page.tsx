import { getProjects, getAllTechStacks, getAllCategories } from '@/lib/data';
import WorkClient from './WorkClient';

export default function WorkPage() {
  const projects = getProjects();
  const techStacks = getAllTechStacks();
  const categories = getAllCategories();

  return <WorkClient projects={projects} techStacks={techStacks} categories={categories} />;
}