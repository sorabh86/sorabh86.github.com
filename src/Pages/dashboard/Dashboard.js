import React from 'react'
import { Card, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Contexts/AuthContext';
import './Dashboard.css';

export default function Dashboard() {
    const navigate = useNavigate();
    const {currentUser, logout, sendemailverification} = useAuth()

    async function handleLogout() {
        await logout()
        navigate("/login")
    }

  return (
    <div className='dashboard'>
        <Navbar bg="dark" variant="dark" expand='lg'>
            <Container>
                <Navbar.Brand as={Link} to="/dashboard">Dashboard</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" >
                    <i className="fa fa-bars"></i>
                </Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <Nav.Link>home</Nav.Link>
                    </Nav>
                    <Nav className='ms-auto'>
                        <NavDropdown title={<><span className="fa fa-user"></span> User</>} id="user-options" renderMenuOnMount="true">
                            <NavDropdown.Item as={Link} to="/dashboard/profile">Profile</NavDropdown.Item>
                            <NavDropdown.Item onClick={handleLogout}>Sign Out</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <Container>
            <Card>
                <Card.Body>
                    {currentUser && <p>{currentUser.email} 
                    <button className='btn btn-link' onClick={()=>{sendemailverification(currentUser)}}>verify</button></p>}
                    
                </Card.Body>
            </Card>
        </Container>
    </div>
  )
}
