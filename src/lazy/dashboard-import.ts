import { lazy } from "react";

export const DashboardPage = lazy(() => import('../dashboard/dashboard.page'));
export const PostCategoryPage = lazy(() => import('../dashboard/posts.category.page'));
export const PostsPage = lazy(() => import('../dashboard/posts.page'));
export const UsersPage = lazy(() => import('../dashboard/users.page'));

export const AddPost = lazy(() => import('../dashboard/components/add-posts'));
export const AddUser = lazy(() => import('../dashboard/components/add-user'));