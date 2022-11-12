import React from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import Logo from "../Assets/images/logo.png"

export default function Nabbar(props) {

  return (
    <div className='sos-navbar'>
        <Navbar bg='dark' className='w-100 sub-navbar'>
            <Container>
                <Nav>
                    <a className='nav-link' href="mailto:ssorabh.ssharma@hotmail.com">
                        <i className="fa fa-envelope"></i> Sorabh86
                    </a>
                    <a className='nav-link' href="skype:ssorabh.ssharma?call">
                        <i className="fa fa-skype"></i> ssorabh.ssharma
                    </a>
                    <a className='nav-link' href="tel:919891464750">
                        <i className="fa fas-phone-square"></i> +919891-464-750
                    </a>
                </Nav>
                <Nav className="nav ms-auto">
                    <Link className='nav-link sos-members' to="/login" >Members</Link>
                    <Link className='nav-link sos-join' to="/signup" >Join Us</Link>
                </Nav>
            </Container>
        </Navbar>
        <Navbar expand="lg" className='w-100 main-navbar navbar'>
            <Container>
            <Link className='navbar-brand' to="/">
                <img src={Logo} height="50" />
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" >
                <i className="fa fa-sitemap"></i>
            </Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    <Link className={props.active=="home"?"nav-link active":"nav-link"} 
                         to="/" >Home</Link>
                    <Link className={props.active=="work"?"nav-link active":"nav-link"} to="/work">Work</Link>
                    <Link className={props.active=="blog"?"nav-link active":"nav-link"} to="/blog">Blog</Link>
                    <NavDropdown active={props.active=="process"} title="Process" id="process-dd">
                        <NavDropdown.Item as={Link} to="/process/web">Web Application Development</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/process/cms">CMS Development</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/process/logo">Logo Designing</NavDropdown.Item>
                    </NavDropdown>
                    <Link className={props.active=="contact"?"nav-link active":"nav-link"} to="/contact">Contact</Link>
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
      </div>
  )
}
