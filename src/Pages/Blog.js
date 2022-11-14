import React from 'react'
import { Container } from 'react-bootstrap'
import Footer from '../Components/footer/Footer'
import Header from "../Components/header/Header"

export default function Blog() {
  return (
    <>
        <Header active="blog" />
        <div className="bg-dark">
            <Container>
                <h1 className="sos-heading sos-o-text">Blog</h1>
            </Container>
        </div>
        <Footer />
    </>
  )
}
