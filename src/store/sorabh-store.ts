import { create } from "zustand";
import { produce } from "immer";
import { Post, PostCategory, Project, ProjectCategory } from "../types/default";
import { post_cat, posts, proj_cat, projects } from "../constants/default";

const immer = (config:any) => ((set:any, get:any) => (config((fn:any) => set(produce(fn)), get)));

interface IStore {
  post_cat: PostCategory[] | null;
  posts:Post[] | null;
  prod_cat: ProjectCategory[] | null;
  projects:Project[] | null;
  addPost(post: Post):void;
  removePost: (id: number) => void;
  updatePost: (id: number, updatedData: Partial<Post>) => void;
}

const store = (set:any, get:any):IStore => ({
  post_cat: post_cat,
  posts: posts,
  prod_cat: proj_cat,
  projects:projects,
  addPost: (post) => set((state:any) => {
    state.posts.push(post);
  }),
  removePost: (id) => set((state:any) => {
    state.posts = state.posts.filter((post:Post) => post.id !== id);
  }),
  updatePost: (id, updatedData) => set((state:any) => {
    const post = state.posts.find((post:Post) => post.id === id);
    if (post) {
      Object.assign(post, updatedData);
    }
  }),
    
});

const sorabhStore = create<IStore>(immer(store));

export default sorabhStore;
export const { getState, setState, subscribe } = sorabhStore;
