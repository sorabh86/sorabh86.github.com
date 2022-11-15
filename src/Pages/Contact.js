import React, { useRef } from 'react'
import { Button, Container, Form, Row } from 'react-bootstrap'
import Footer from '../Components/footer/Footer'
import Header from "../Components/header/Header"

export default function Contact() {
  const nameRef = useRef()
  const phoneRef = useRef()
  const emailRef = useRef()
  const messageRef = useRef()

  return (
    <div className='contact-page'>
        <Header active="contact"/>
        <div className='bg-dark text-light'>
          <h1 className='sos-heading sos-o-text mt-4'>Contact Us</h1>
          <Container>
              <Row>
                <Form className='row col-lg-6 mb-5'>
                  <Form.Group className='mb-3'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" ref={nameRef} required/>
                  </Form.Group>
                  <Form.Group className='mb-3'>
                    <Form.Label>Phone No.</Form.Label>
                    <Form.Control type="text" ref={phoneRef} required/>
                  </Form.Group>
                  <Form.Group className='mb-3'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} required/>
                  </Form.Group>
                  <Form.Group className='mb-3'>
                    <Form.Label>Message</Form.Label>
                    <textarea name="message" className='form-control' required 
                      ref={messageRef} rows='6' />
                  </Form.Group>
                  <Form.Group className='mb-3'>
                    <Button className='btn bg-blue' type="submit">Send</Button>
                  </Form.Group>
                </Form>
                <div className="col-lg-6">

                </div>
              </Row>
          </Container>
        </div>
        <Footer />
    </div>
  )
}
