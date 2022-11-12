import "./App.css"
import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AuthProvider } from "../Contexts/AuthContext"
import Welcome from "../Pages/Welcome"
import Work from "../Pages/Work"
import Blog from "../Pages/Blog"
import Process from "../Pages/Process"
import Contact from "../Pages/Contact"
import Dashboard from "./Dashboard"
import Login from "./Login"
import Signup from "./Signup"
import "font-awesome/css/font-awesome.min.css"

import SNabbar from "./Header"
import Footer from "./footer/Footer"
import AboutMe from "../Pages/AboutMe"

function App() {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route exact path="/" element={<Welcome />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
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
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App;
