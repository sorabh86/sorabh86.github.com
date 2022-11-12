import React from 'react'
import { Container } from 'react-bootstrap'
import Footer from '../Components/footer/Footer'
import SNabbar from "../Components/Header"

export default function Contact() {
  return (
    <>
        <SNabbar active="contact"/>
        <Container>
            <h1 className='sos-heading sos-o-text mt-4'>Contact Us</h1>
        </Container>
        <Footer />
    </>
  )
}
