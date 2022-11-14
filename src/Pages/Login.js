import React, { useRef, useState } from 'react'
import { Alert, Button, Card, Form, Spinner } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';
import Logo from "../Assets/images/logo.png"


export default function Login() {
    const emailRef = useRef();
    const passRef = useRef();

    const {login, loading, setLoading, setCurrentUser} = useAuth()
    const [error, setError] = useState('')
    const navigate = useNavigate()

    async function handleSubmit(e) {
      e.preventDefault();

      try {
        setError('');
        setLoading(true);
        setCurrentUser(await login(emailRef.current.value, passRef.current.value))
          
        navigate("/dashboard");
      } catch(ex) {
        // const message = ex.code.split('/').join(' ').split('-').join(' ');
        setError('Failed to login');
        console.log(ex);
      }
      
      setLoading(false);
    }

  return (
    <div className='login'>
        <div className="text-center bg-dark p-5 mb-2">
          <Link className='text-center mb-3' to="/"><img src={Logo} alt="Sorabh86" /></Link>
        </div>
        <Card className='mt-5'>
          <Card.Header className='bg-transparent card-header border-0'>
            <h2 className="text-blue text-center fs-1 fw-bold">Login</h2>
            {error!='' && <Alert variant='danger'>{error}</Alert>}
          </Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className='mb-2'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef}  />
                    </Form.Group>
                    <Form.Group className='mb-2'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passRef}  />
                    </Form.Group>
                    <Button disabled={loading} className='btn btn-primary m-auto d-block mt-4 ps-5 pe-5' type="submit">
                        {loading && <Spinner as="span" size="sm" role="status"
                            aria-hidden="true"/>} Login
                    </Button>
                </Form>
            </Card.Body>
            <Card.Footer className='bg-transparent text-center border-0'>
              Do not have account? <Link to="/signup" >Register</Link>
            </Card.Footer>
        </Card>
    </div>
  )
}
