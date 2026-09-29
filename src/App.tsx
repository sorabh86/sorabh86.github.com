// src/App.tsx
// import React from 'react'
import { lazy, Suspense } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import ScrollToTop from './components/scroll-top'
import { AddPost, DashboardPage, PostCategoryPage, ProfilePage, PostsPage,
  SupportPage, TasksPage, UsersPage, AddUser, MessagesPage, MyWorkPage, AddWork
} from './lazy/dashboard-import';
import { BlogPostPage, ErrorPage, LoginPage, SignupPage
} from './lazy/common-import';
import Loading from './components/loading';
import IndexPage from './pages/index.page';
import sorabhStore from './store/sorabh-store';
import { menuData } from './constants/menus.data';
import ArcHeader from './components/archeader';
import AdminRoute from './db/admin-route';

const PrivateRoute = lazy(() => import('./db/private-route'));

function App() {
  
  const {isLoading} = sorabhStore();
  const location = useLocation();

  const mainMenu = menuData;


  return (
    <Suspense key={location.pathname} fallback={<Loading />}>{/* force loading content */}
      <ArcHeader />
      <Routes > 
        <Route path="/*" element={<IndexPage />} >
          {mainMenu.map((menu, key)=>(
            <Route key={key} path={menu.relink} element={menu.component} >
              {menu.children && menu.children.map((submenu, key) => (
                <Route key={key} path={submenu.relink} element={submenu.component} />
              ))}
            </Route>
          ))}
          <Route path="blog/:id" element={<BlogPostPage />} />
          <Route path="signup" element={<SignupPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />

        {/* <PrivateRoute> */}
        <Route path="/dashboard/*" element={<PrivateRoute><DashboardPage /></PrivateRoute>}>
          <Route path="profile" element={<ProfilePage />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="support" element={<SupportPage />} />
          <Route element={<AdminRoute />}>
            <Route path="posts/*" element={<PostsPage />} >
              <Route path="add" element={<AddPost />} />
              <Route path="edit/:id" element={<AddPost />} />
            </Route>
            <Route path="posts/category" element={<PostCategoryPage />} />
            <Route path="categories" element={<PostCategoryPage />} />
            <Route path="users/" element={<UsersPage />} />
            <Route path="users/add/" element={<AddUser />} />
            <Route path="users/edit/:userId" element={<AddUser />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="mywork/*" element={<MyWorkPage />}>
              <Route path="add" element={<AddWork />} />
              <Route path="edit/:id" element={<AddWork />} />
            </Route>
          </Route>
        </Route>
        {/* </PrivateRoute> */}

        <Route path="*" element={<ErrorPage />} />
      </Routes>
      {!location.pathname.startsWith('/dashboard') && <ScrollToTop />}
      {isLoading && <Loading />}
    </Suspense>
  )
}

export default App
