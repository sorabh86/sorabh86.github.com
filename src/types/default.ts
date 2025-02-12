export interface PostCategory {
  id:number
  title:string
}

export interface Post {
  id:number
  title:string
  content:string
  cat_id?:number;
  category:string
  author:string
  date:string
}

export interface ProjectCategory {
  id:number;
  title:string;
  description?: string;
}

export interface Project {
  id:number
  image:string
  title:string
  description:string
  cat_id?:number
  category:string
  live:string;
  github:string;
}