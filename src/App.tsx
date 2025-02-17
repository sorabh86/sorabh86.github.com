// src/App.tsx

// import React from 'react'
import React, { Suspense, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import ScrollToTop from './components/scroll-top'
import WelcomePage from './pages/welcome.page';
import { AddPost, DashboardPage, PostCategoryPage, PostsPage, UsersPage } from './lazy/dashboard-import';
import Loading from './components/loading';
import IndexPage from './pages/index.page';
import sorabhStore from './store/sorabh-store';
import AddUser from './pages/dashboard/components/add-user';
// import { generateUsers } from './db/seed-users';
// import { users } from './constants/users';
// import PrivateRoute from './db/private-route';

const AboutPage = React.lazy(() => import('./pages/about.page'));
const BlogPage = React.lazy(() => {
  return new Promise<typeof import("./pages/blog.page")>((resolve) => {
    setTimeout(() => resolve(import('./pages/blog.page')), 5); 
  });
});
const ContactPage = React.lazy(() => import('./pages/contact.page'));
const ErrorPage = React.lazy(() => import('./pages/error.page'));
const LoginPage = React.lazy(() => import('./pages/login.page'));
const ProcessPage = React.lazy(() => import('./pages/process.page'));
const SignupPage = React.lazy(() => import('./pages/signup.page'));
const WorkPage = React.lazy(() => import('./pages/work.page'));
const CMSDevelopment = React.lazy(() => import('./pages/process-page/cms-development'));
const LogoDevelopment = React.lazy(() => import('./pages/process-page/logodevelopment'));
const WebsiteDesign = React.lazy(() => import('./pages/process-page/webdesign'));
const WebDevelopment = React.lazy(() => import('./pages/process-page/webdevelopment'));

function App() {
  // const isLoading = sorabhStore((state) => state.isLoading );
  const {isLoading} = sorabhStore();
  const location = useLocation();

  useEffect(() => {
    // generateUsers(users)
  }, [])

  return (
    <Suspense key={location.pathname} fallback={<Loading />}>{/* force loading content */}
      {/* <button className='fixed left-12 top-12 z-10 bg-amber-950 p-8' 
        onClick={() => setState({isLoading:!getState().isLoading})}
        onClick={() => {setLoading(!isLoading); console.log('heelo'); }}
        > click </button> */}
      <Routes > 
        <Route path="/*" element={<IndexPage />} >
          <Route path="" element={<WelcomePage />} />
          <Route path="about" element={ <AboutPage /> } />
          <Route path="work" element={ <WorkPage /> } />
          <Route path="blog" element={ <BlogPage /> } />

          <Route path="process/*" element={<ProcessPage />} >
            <Route path="web" element={<WebDevelopment />} />
            <Route path="design" element={<WebsiteDesign />} />
            <Route path="cms" element={<CMSDevelopment />} />
            <Route path="logo" element={<LogoDevelopment />} />
          </Route>

          <Route path="contact" element={<ContactPage />} />
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
      <ScrollToTop />
      {isLoading && <Loading />}
    </Suspense>
  )
}

export default App
