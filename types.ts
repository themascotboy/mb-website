export interface Project {
  id: number;
  title: string;
  client: string;
  category: string;
  description: string;
  imageUrl: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  imageUrl: string;
  category: string;
}

export interface NavItem {
  label: string;
  path: string;
}