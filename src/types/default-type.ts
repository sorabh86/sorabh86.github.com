import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Timestamp } from "firebase/firestore";
import { ReactNode } from 'react'

export interface PostCategory {
  id: number;
  title: string;
}

export interface Post {
  id: number | string;
  title: string;
  content: string;
  cat_id?: number;
  category: string;
  author: string;
  date: string;
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
  rating?: number;
  live?: string;
  github?: string;
}

export interface MyWorkItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  live: string;
  github: string;
  sortOrder: number;
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
  id?: string;
  name:string;
  email:string;
  phone:string;
  address:string;
  role:USER_ROLES;
  create_date?:Timestamp;
  last_login?:Timestamp;
}
export interface UserCredentials extends User {
  password: string;
}
export type UserSortKey = | 'name' | 'email' | 'role' | 'create_date' | 'last_login' | 'id';

export interface ResultObject {
  success:boolean,
  error?:string,
  data?:unknown
}

export interface Faq {
  question:string;
  answer:string;
}

export interface Plan {
  id:number;
  name:string;
  price:string;
  features:string[];
  recommended:boolean;
}

export interface Logo {
  image:string;
  title:string;
  content:string;
}
export interface DashboardMenu {
  icon:IconDefinition;
  label:string;
  link:string;
  children?:DashboardMenu[]
}

export interface Menu {
  label:string;
  link:string;
  relink:string;
  component: ReactNode;
  children?:Menu[]
}
