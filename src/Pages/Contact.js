import React from 'react'
import { Container } from 'react-bootstrap'
import Footer from '../Components/footer/Footer'
import Header from "../Components/header/Header"

export default function Contact() {
  return (
    <>
        <Header active="contact"/>
        <Container>
            <h1 className='sos-heading sos-o-text mt-4'>Contact Us</h1>
        </Container>
        <Footer />
    </>
  )
}
