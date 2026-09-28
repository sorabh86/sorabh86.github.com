import { lazy } from "react";

export const DashboardPage = lazy(() => import('../dashboard/dashboard.page'));
export const PostCategoryPage = lazy(() => import('../dashboard/posts.category.page'));
export const PostsPage = lazy(() => import('../dashboard/posts.page'));
export const UsersPage = lazy(() => import('../dashboard/users.page'));
export const MessagesPage = lazy(() => import('../dashboard/messages.page'));

export const AddPost = lazy(() => import('../dashboard/components/add-posts'));
export const AddUser = lazy(() => import('../dashboard/components/add-user'));

export const ProfilePage = lazy(() => import('../dashboard/profile.page'));
export const TasksPage = lazy(() => import('../dashboard/tasks.page'));
export const SupportPage = lazy(() => import('../dashboard/support.page'));