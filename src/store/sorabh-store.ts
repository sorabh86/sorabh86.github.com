// src/store/sorabh-store.ts
import { create, type StateCreator } from "zustand";
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

interface IStore {
  isLoading: boolean;
  error?: string;
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

const store: StateCreator<IStore> = (set) => ({
  isLoading: false,
  setLoading: (loading) =>
    set((state) => {
      state.isLoading = loading;
      return state;
    }),

  post_cat: post_cat,
  posts: posts,
  prod_cat: proj_cat,
  projects: projects,
  experiences: experiences,
  educations: educations,
  addPost: (post) =>
    set((state) => {
      if (!state.posts) return state;
      state.posts = [...state.posts, post];
      return state;
    }),
  removePost: (id) =>
    set((state) => {
      if (!state.posts) return state;
      state.posts = state.posts.filter((post) => post.id !== id);
      return state;
    }),
  updatePost: (id, updatedData) =>
    set((state) => {
      if (!state.posts) return state;
      const post = state.posts.find((item) => item.id === id);
      if (post) {
        Object.assign(post, updatedData);
      }
      return state;
    }),

  sendMessage: async (message) => {
    try {
      const [{ addDoc, collection }, { db }] = await Promise.all([
        import("firebase/firestore"),
        import("../db/firebase"),
      ]);
      set((state) => {
        state.isLoading = true;
        state.error = "";
        return state;
      });
      await addDoc(collection(db, "messages"), message);
      return { success: true };
    } catch (error: unknown) {
      const firebaseError = error as { code?: string; message?: string };
      const messageText = typeof firebaseError.code === 'string'
        ? firebaseError.code.replace('auth/', '').replace(/-/g, ' ')
        : firebaseError.message ?? 'Unknown error';
      return { success: false, error: messageText };
    } finally {
      set((state) => {
        state.isLoading = false;
        return state;
      });
    }
  },
});

const sorabhStore = create<IStore>()(store);

export default sorabhStore;
export const { getState, setState, subscribe } = sorabhStore;
