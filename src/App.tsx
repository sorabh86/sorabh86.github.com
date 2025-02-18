// src/App.tsx

// import React from 'react'
import { Suspense, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import ScrollToTop from './components/scroll-top'
// import WelcomePage from './pages/welcome.page';
import { AddPost, DashboardPage, PostCategoryPage, 
  PostsPage, UsersPage , AddUser
} from './lazy/dashboard-import';
import { WelcomePage, AboutPage, BlogPage, 
  ContactPage, ErrorPage, LoginPage, SignupPage
} from './lazy/common-import';
import { ProcessPage, WorkPage, CMSDevelopment, 
  LogoDevelopment, WebsiteDesign, WebDevelopment
} from './lazy/process-import';
import Loading from './components/loading';
import IndexPage from './pages/index.page';
import sorabhStore from './store/sorabh-store';
import { logos } from './constants/logo.data';

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
            <Route path="logo" element={<LogoDevelopment logos={logos} />} />
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
