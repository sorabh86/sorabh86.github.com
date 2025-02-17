import { Timestamp } from "firebase/firestore";

export interface PostCategory {
  id: number;
  title: string;
}

export interface Post {
  title: string;
  content: string;
  cat_id?: number;
  category: string;
  author: string;
  date: string;
  [key: string]: any;
}

export interface ProjectCategory {
  id: number;
  title: string;
  description?: string;
}

export interface Project {
  id: number;
  image: string;
  title: string;
  description: string;
  cat_id?: number;
  category: string;
  live: string;
  github: string;
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  details: string[];
}

export interface Education {
  degree: string;
  year: string;
  institute: string;
}

export interface Message {
  name:string;
  phone:string;
  email:string;
  message:string;
  created:Timestamp;
}

export enum USER_ROLES {
  SUBSCRIBER = "subscriber",
  ADMIN = "admin",
}
export interface User {
  name:string;
  email:string;
  password:string;
  phone:string;
  address:string;
  role:USER_ROLES;
  create_date?:Timestamp;
  last_login?:Timestamp;
  [key: string]: any;
}
export type UserSortKey = | 'name' | 'email' | 'role' | 'create_date' | 'last_login' | 'id';

export interface ResultObject {
  success:boolean,
  error?:string,
  data?:any
}
