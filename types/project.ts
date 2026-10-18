export interface Project {
  id: number;
  title: string;
  location?: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
  github?: string;
  live?: string;
  featured: boolean;
  hidden?: boolean;
}
