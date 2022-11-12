import React, { useRef, useState } from 'react'
import { Alert, Button, Card, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../Contexts/AuthContext'
import Footer from './footer/Footer'
import Header from "./Header"


export default function Signup() {
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
            console.log(e);
            setError('Failed to create an account, ' + e.code)
        }

        setLoading(false);
    }

    return (
        <div className='signup'>
            <Header />
            <div className="m-auto">
                <Card className="mt-2 mb-2">
                    <Card.Header className='bg-transparent'>
                        <h2 className="sos-heading sos-text text-center">Sign Up</h2>
                        {error && <Alert variant='danger'>{error}</Alert>}
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
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
                            <Form.Group>
                                <Button disabled={loading} className='w-100' type="submit">Sign Up</Button>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                    <Card.Footer className='bg-transparent'>
                        Already have an account?  <Link to="/login" >Login</Link>
                    </Card.Footer>
                </Card>
            </div>
            <Footer />
        </div>
    )
}
