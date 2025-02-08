import React, { useEffect } from 'react'
import { Alert, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Footer from '../Components/footer/Footer'
import Header from "../Components/header/Header"
import Posts from '../Components/posts/Posts'
import { useAuth } from '../Contexts/AuthContext'

export default function Blog() {
  const {posts, getPosts} = useAuth()

  /* useEffect(()=>{
    if(posts) getPosts();
  }, []) */
  return (
    <div className='blog'>
        <Header active="blog" />
        <div className="bg-dark text-secondary pb-4">
            <Container>
                <h1 className="sos-heading sos-o-text">Blog</h1>
                <p className='alert alert-info text-center'>Design & Development in progress... [dummp-data-populated]</p>
                {posts ? <Posts posts={posts} /> : <Alert >
                  <Alert.Heading>No Post Found!</Alert.Heading>
                  <p className='mb-0'>
                    Contact Us now <Link to="/contact" >here</Link>
                  </p>
                  </Alert>}
            </Container>
        </div>
        <Footer />
    </div>
  )
}
