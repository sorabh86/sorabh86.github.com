import React from 'react'
import { Route, Routes } from 'react-router'
import WorkPage from './pages/work.page'
import WelcomePage from './pages/welcome.page'
import AboutPage from './pages/about.page'
import ProcessPage from './pages/process.page'
import ContactPage from './pages/contact.page'
import ErrorPage from './pages/error.page'
import SignupPage from './pages/signup.page'
import LoginPage from './pages/login.page'
import BlogPage from './pages/blog.page'
import LogoDevelopment from './process-page/logodevelopment'
import CMSDevelopment from './process-page/cms-development'
import WebsiteDesign from './process-page/webdesign'
import WebDevelopment from './process-page/webdevelopment'
import ScrollToTop from './components/scroll-top'
import DashboardPage from './pages/dashboard/dashboard.page'
import PostsPage from './pages/dashboard/posts.page'
import UsersPage from './pages/dashboard/users.page'
import AddPost from './pages/dashboard/components/add-posts'

function App() {
  

  return (
    <>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/process/*" element={<ProcessPage />} >
            <Route path="web" element={<WebDevelopment />} />
            <Route path="design" element={<WebsiteDesign />} />
            <Route path="cms" element={<CMSDevelopment />} />
            <Route path="logo" element={<LogoDevelopment />} />
          </Route>
          <Route path="/contact" element={<ContactPage />} />

          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard/*" element={<DashboardPage />}>
            <Route path="profile/*" element={<p>Profile</p>} />
            <Route path="posts/*" element={<PostsPage />} >
              <Route path="add" element={<AddPost />} />
              <Route path="edit/:id" element={<AddPost />} />
            </Route>
            <Route path="users" element={<UsersPage />} />
          </Route>

          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <ScrollToTop />
    </>
  )
}

export default App
