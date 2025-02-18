// src/App.tsx
// import React from 'react'
import { Suspense } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import ScrollToTop from './components/scroll-top'
import { AddPost, DashboardPage, PostCategoryPage, 
  PostsPage, UsersPage , AddUser
} from './lazy/dashboard-import';
import { ErrorPage, LoginPage, SignupPage
} from './lazy/common-import';
import Loading from './components/loading';
import IndexPage from './pages/index.page';
import sorabhStore from './store/sorabh-store';
import { menuData } from './constants/menus.data';

function App() {
  
  const {isLoading} = sorabhStore();
  const location = useLocation();

  const mainMenu = menuData;


  return (
    <Suspense key={location.pathname} fallback={<Loading />}>{/* force loading content */}
      <Routes > 
        <Route path="/*" element={<IndexPage />} >
          {mainMenu.map((menu, key)=>(
            <Route key={key} path={menu.relink} element={menu.component} >
              {menu.children && menu.children.map((submenu, key) => (
                <Route key={key} path={submenu.relink} element={submenu.component} />
              ))}
            </Route>
          ))}
          <Route path="signup" element={<SignupPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />

        {/* <PrivateRoute> */}
        <Route path="/dashboard/*" element={<DashboardPage />}>
          <Route path="profile/*" element={<p>Profile</p>} />
          <Route path="posts/*" element={<PostsPage />} >
            <Route path="add" element={<AddPost />} />
            <Route path="edit/:id" element={<AddPost />} />
            <Route path="category/*" element={<PostCategoryPage />} />
          </Route>
          <Route path="users/" element={<UsersPage />} />
          <Route path="users/add/" element={<AddUser />} />
          <Route path="users/edit/:userId" element={<AddUser />} />
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
