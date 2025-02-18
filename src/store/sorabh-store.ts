// src/store/sorabh-store.ts
import { create } from "zustand";
import { produce } from "immer";
import {
  Education,
  Experience,
  Message,
  Post,
  PostCategory,
  Project,
  ProjectCategory,
  ResultObject,
} from "../types/default-type";
import { post_cat } from "../constants/post-category.data";
import { posts } from "../constants/posts.data";
import { proj_cat } from "../constants/project-category.data";
import { projects } from "../constants/projects.data";
import { experiences } from "../constants/experiences.data";
import { educations } from "../constants/educations.data";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../db/firebase";

const immer = (config: any) => (set: any, get: any) =>
  config((fn: any) => set(produce(fn)), get);

interface IStore {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  post_cat: PostCategory[] | null;
  posts: Post[] | null;
  prod_cat: ProjectCategory[] | null;
  projects: Project[] | null;
  experiences: Experience[] | null;
  educations: Education[] | null;
  addPost: (post: Post) => void;
  removePost: (id: number) => void;
  updatePost: (id: number, updatedData: Partial<Post>) => void;

  sendMessage: (message: Message) => Promise<ResultObject>;
}

const store = (set: any/* , get: any */): IStore => ({
  isLoading: false,
  setLoading: (loading) =>
    set((state: any) => {
      state.isLoading = loading;
    }),

  post_cat: post_cat,
  posts: posts,
  prod_cat: proj_cat,
  projects: projects,
  experiences: experiences,
  educations: educations,
  addPost: (post) =>
    set((state: any) => {
      state.posts.push(post);
    }),
  removePost: (id) =>
    set((state: any) => {
      state.posts = state.posts.filter((post: Post) => post.id !== id);
    }),
  updatePost: (id, updatedData) =>
    set((state: any) => {
      const post = state.posts.find((post: Post) => post.id === id);
      if (post) {
        Object.assign(post, updatedData);
      }
    }),

  sendMessage: async (message) => {
    try {
      set((state: any) => {
        state.isLoading = true;
        state.error = "";
      });
      await addDoc(collection(db, "messages"), message);
      return { success: true };
    } catch (e: any) {
      const message = e.code.replace("auth/", "").replace(/-/g, " ");
      return { success: false, error: message };
    } finally {
      set((state: any) => {
        state.isLoading = false;
      });
    }
  },
});

const sorabhStore = create<IStore>(immer(store));

export default sorabhStore;
export const { getState, setState, subscribe } = sorabhStore;
