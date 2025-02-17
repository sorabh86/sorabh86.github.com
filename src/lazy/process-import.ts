import { lazy } from 'react';

export const ProcessPage = lazy(() => import('../pages/process.page'));
export const WorkPage = lazy(() => import('../pages/work.page'));
export const CMSDevelopment = lazy(() => import('../pages/process-page/cms-development'));
export const LogoDevelopment = lazy(() => import('../pages/process-page/logodevelopment'));
export const WebsiteDesign = lazy(() => import('../pages/process-page/webdesign'));
export const WebDevelopment = lazy(() => import('../pages/process-page/webdevelopment'));
