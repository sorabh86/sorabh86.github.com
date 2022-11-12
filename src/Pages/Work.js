import React from 'react'
import { Container } from 'react-bootstrap'
import Footer from '../Components/footer/Footer'
import SNabbar from "../Components/Header"

export default function Work() {
  return (
    <>
        <SNabbar active="work" />
        <Container>
            <h1 className='sos-heading sos-o-text mt-4'>Portfolio</h1>
        </Container>
        <Footer />
    </>
  )
}
