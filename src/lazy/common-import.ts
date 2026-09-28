import { lazy } from "react";

export const WelcomePage = lazy(() => import('../pages/welcome.page'));
export const AboutPage = lazy(() => import('../pages/about.page'));
export const BlogPage = lazy(() => {
  return new Promise<typeof import("../pages/blog.page")>((resolve) => {
    setTimeout(() => resolve(import('../pages/blog.page')), 5); 
  });
});

export const ErrorPage = lazy(() => import('../pages/error.page'));
export const LoginPage = lazy(() => import('../pages/login.page'));
export const SignupPage = lazy(() => import('../pages/signup.page'));
export const ContactPage = lazy(() => import('../pages/contact.page'));