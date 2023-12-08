export interface Project {
  id: number;
  name: string;
  description: string;
  tags: string[];
  thumbnailPath?: string;
}

export interface ProjectDetails{
  id: number;
  name: string;
  description: string;
  links: string[];
  tags: string[];
  numberOfImages: number;
  thumbnailPaths: string[];
  imagePaths: string[];
}

export interface RouteData {
  animation?: string;
}
