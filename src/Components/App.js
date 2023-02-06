import "./App.css"
import React, { useEffect } from "react"
import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import { AuthProvider, useAuth } from "../Contexts/AuthContext"
import Welcome from "../Pages/Welcome"
import Work from "../Pages/Work"
import Blog from "../Pages/Blog"
import Process from "../Pages/Process"
import Contact from "../Pages/Contact"
import Dashboard from "../Pages/dashboard/Dashboard"
import Login from "../Pages/Login"
import Signup from "../Pages/Signup"
import "font-awesome/css/font-awesome.min.css"
import AboutMe from "../Pages/AboutMe"
import Loader from "./Loader"
import { DbProvider } from "../Contexts/DbContext"
import ErrorPage from "../Pages/ErrorPage"

function App() {
  return (
    <AuthProvider>
      <DbProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Welcome />} />
          <Route exact path="/dashboard/*" element={<Dashboard />}>
            <Route exact path="profile" element={<Link to="/">Profile</Link>} />
            <Route exact path="posts" element={<Link to="/">Posts</Link>} />
            <Route exact path="posts/new" element={<Link to="/">New Posts</Link>} />
            <Route exact path="posts/:id" element={<Link to="/">Edit Posts</Link>} />
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/work" element={<Work />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/process/*" element={<Process />} >
            <Route path="web" element={<p>Web Development</p>} />
            <Route path="cms" element={<p>CMS Development</p>} />
            <Route path="logo" element={<p>LOGO Development</p>} />
          </Route>
          <Route path="/about" element={<AboutMe />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<ErrorPage />} />

        </Routes>
      </BrowserRouter>
      <Loader />
      </DbProvider>
    </AuthProvider>
  )
}

export default App;
