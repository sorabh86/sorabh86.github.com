import React, { useRef, useState } from 'react'
import { Alert, Button, Card, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../Contexts/AuthContext'
import Footer from '../Components/footer/Footer'
import Header from "../Components/header/Header"


export default function Signup() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passRef = useRef();
    const cpassRef = useRef();
    const { signup, loading, setLoading } = useAuth();
    const [error, setError] = useState('')

    async function handleSubmit(e) {
        e.preventDefault();

        if (passRef.current.value !== cpassRef.current.value) {
            return setError('Password do not match')
        }

        try {
            setError('')
            setLoading(true);
            await signup(emailRef.current.value, passRef.current.value);
        } catch (e) {
            const message = e.code.split('/').join(' ').split('-').join(' ')
            setError('Failed to create an account, ' + message)
            console.log(message);
        }

        setLoading(false);
    }

    return (
        <div className='signup'>
            <Header />
            <div className="mt-5 mb-5">
                <Card className="mt-2 mb-2">
                    <Card.Header className='bg-transparent border-0'>
                        <h2 className="text-success text-center fs-1 fw-bold">Sign Up</h2>
                        {error!='' && <Alert variant='danger'>{error}</Alert>}
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className='mb-2'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" ref={nameRef} required />
                            </Form.Group>
                            <Form.Group className='mb-2'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" ref={emailRef} required />
                            </Form.Group>
                            <Form.Group className='mb-2'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" ref={passRef} required />
                            </Form.Group>
                            <Form.Group className='mb-2'>
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" ref={cpassRef} required />
                            </Form.Group>
                            <Button disabled={loading} className='btn btn-success m-auto d-block mt-4 ps-5 pe-5' type="submit">Sign Up</Button>
                        </Form>
                    </Card.Body>
                    <Card.Footer className='bg-transparent border-0 text-center'>
                        Already have an account?  <Link to="/login" >Login</Link>
                    </Card.Footer>
                </Card>
            </div>
            <Footer />
        </div>
    )
}
