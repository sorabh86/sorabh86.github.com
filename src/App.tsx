import React, { useEffect } from "react"
import { AuthProvider, useAuth } from "./Contexts/AuthContext"
import Welcome from "./Pages/Welcome"
import Work from "./Pages/Work"
import Blog from "./Pages/Blog"
import Process from "./Pages/Process"
import Contact from "./Pages/Contact"
import Dashboard from "./Pages/dashboard/Dashboard"
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import "font-awesome/css/font-awesome.min.css"
import AboutMe from "./Pages/AboutMe"
import { DbProvider } from "./Contexts/DbContext"
import ErrorPage from "./Pages/ErrorPage"
import { Link, Route, Routes } from "react-router"
import SLoader from './Components/loader/SLoader'
import logo from './assets/logo.png';

function App() {
  return (
    <AuthProvider>
      <DbProvider>
        <img src={logo} />
        <Routes>
          <Route path="/" element={<Welcome />} />
          {/* <Route path="/dashboard/*" element={<Dashboard />}>
            <Route path="profile" element={<Link to="/">Profile</Link>} />
            <Route path="posts" element={<Link to="/">Posts</Link>} />
            <Route path="posts/new" element={<Link to="/">New Posts</Link>} />
            <Route path="posts/:id" element={<Link to="/">Edit Posts</Link>} />
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/work" element={<Work />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/process/*" element={<Process />} >
            <Route path="web" element={<span>Web Development</span>} />
            <Route path="cms" element={<span>CMS Development</span>} />
            <Route path="logo" element={<span>LOGO Development</span>} />
          </Route>
          <Route path="/about" element={<AboutMe />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<ErrorPage />} /> */}
        </Routes>
        <SLoader />
      </DbProvider>
    </AuthProvider>
  )
}

export default App;
