import { lazy } from "react";

export const DashboardPage = lazy(() => import('../pages/dashboard/dashboard.page'));
export const PostCategoryPage = lazy(() => import('../pages/dashboard/posts.category.page'));
export const PostsPage = lazy(() => import('../pages/dashboard/posts.page'));
export const UsersPage = lazy(() => import('../pages/dashboard/users.page'));

export const AddPost = lazy(() => import('../pages/dashboard/components/add-posts'));
