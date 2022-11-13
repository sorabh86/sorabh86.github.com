import React from 'react'
import { Card, Container } from 'react-bootstrap'
import Footer from '../Components/footer/Footer'
import SNabbar from "../Components/Header"

export default function Work() {
  return (
    <div className='work-page'>
        <SNabbar active="work" />
        <Container>
            <h1 className='sos-heading sos-o-text mt-4'>Works</h1>
            <Card className='mb-3  bg-secondary text-light text-center shadow-lg'>
              <Card.Body>
                <p className='m-0'>Design & Development in progress...</p>
              </Card.Body>
            </Card>
        </Container>
        <Footer className='m-auto' />
    </div>
  )
}
