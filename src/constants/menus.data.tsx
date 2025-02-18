import {
  faChartBar,
  faClipboard,
  faFolder,
  faList,
  faPlus,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { DashboardMenu, Menu } from "../types/default-type";
import {
  AboutPage,
  BlogPage,
  ContactPage,
  WelcomePage,
} from "../lazy/common-import";
import { CMSDevelopment, LogoDevelopment, ProcessPage, WebDevelopment, WebsiteDesign, WorkPage } from "../lazy/process-import";

export const menuData: Menu[] = [
  { label: "Home", link: "/", relink:'', component: <WelcomePage /> },
  { label: "About", link: "/about", relink:'about/', component: <AboutPage /> },
  { label: "Work", link: "/work", relink:'work/', component: <WorkPage /> },
  { label: "Blog", link: "/blog", relink:'blog/', component: <BlogPage /> },
  {
    label: "Process",
    link: "/process",
    relink:'process/*', component: <ProcessPage />,
    children: [
      { label: "Web Development", link: "/process/web", relink:'web/', component: <WebDevelopment /> },
      { label: "Web Design", link: "/process/design", relink:'design/', component: <WebsiteDesign /> },
      { label: "CMS Development", link: "/process/cms", relink:'cms/', component: <CMSDevelopment /> },
      { label: "Logo Designing", link: "/process/logo", relink:'logo/', component: <LogoDevelopment /> },
    ],
  },
  { label: "Contact", link: "/contact", relink:'about', component: <ContactPage /> },
];

export const dashboardMenus: DashboardMenu[] = [
  { icon: faChartBar, label: "Dashboard", link: "/dashboard" },
  {
    icon: faClipboard,
    label: "Posts",
    link: "/dashboard/posts",
    children: [
      { icon: faFolder, label: "Category", link: "/dashboard/posts/category" },
      { icon: faList, label: "All Posts", link: "/dashboard/posts" },
      { icon: faPlus, label: "Add Post", link: "/dashboard/posts/add" },
    ],
  },
  {
    icon: faUsers,
    label: "Users",
    link: "/dashboard/users",
    children: [
      { icon: faList, label: "All Users", link: "/dashboard/users" },
      { icon: faPlus, label: "Add Post", link: "/dashboard/users/add" },
    ],
  },
];
