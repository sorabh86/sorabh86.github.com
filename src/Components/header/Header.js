import React, { useEffect, useRef, useState } from 'react'
import { Container, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import jQuery from 'jquery';

import Logo from "../../Assets/images/logo.png"

export default function Nabbar(props) {
    const [expanded, setExpanded] = useState(false);
    const $ = jQuery;

    function mainNavbarExpandHandler(e) {
        // e.preventDefault();
        if(window.innerWidth<=992) {
            setExpanded(!expanded)
        }
    }

    useEffect(()=>{
        const $menu = $('.main-navbar .dropdown'),
            $menuItems = $menu.find('.dropdown-item');
        if(window.innerWidth >= 992) {
            $menu.on('mouseenter',e=>{
                $menu.find('.dropdown-menu').removeAttr('style');
            })
            $menuItems.on('click', (e) => {
                const $this = $(e.target);
                $this.parent().hide();
            });
        } 

    }, [])
  return (
    <div className='sos-navbar'>
        <Navbar bg='dark' className='w-100 sub-navbar'>
            <Container className='p-2'>
                <Row className='w-100'>
                    <Nav className='sos-info col-lg-8 justify-content-center'>
                        <a className='nav-link' href="mailto:ssorabh.ssharma@hotmail.com">
                            <i className="fa fa-envelope"></i><span className='smdt'>Sorabh86</span>
                        </a>
                        <a className='nav-link' href="skype:ssorabh.ssharma?call">
                            <i className="fa fa-skype"></i><span className='smdt'>ssorabh.ssharma</span>
                        </a>
                        {/* <a className='nav-link' href="tel:919891464750"> */}
                        <a className='nav-link' target='blank' href="https://wa.me/919891464750">
                            <i className="fa fa-whatsapp"></i><span className='smdt'>9891464750</span>
                        </a>
                    </Nav>
                    <Nav className="nav ms-auto col-lg-4 justify-content-end">
                        <Link className='nav-link sos-members' to="/login" >Members</Link>
                        <Link className='nav-link sos-join text-white' to="/signup" >Join Us</Link>
                    </Nav>
                </Row>
            </Container>
        </Navbar>
        <Navbar expanded={expanded} expand="lg" className='w-100 main-navbar navbar'>
            <Container>
            <Link className='navbar-brand' to="/">
                <img src={Logo} height="50" />
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={mainNavbarExpandHandler}>
                <i className="fa fa-bars"></i>
            </Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    <Link className={props.active=="home"?"nav-link active":"nav-link"} 
                         to="/" >Home</Link>
                    <Link className={props.active=="about"?"nav-link active":"nav-link"} 
                         to="/about" >About</Link>
                    <Link className={props.active=="work"?"nav-link active":"nav-link"} to="/work">Work</Link>
                    <Link className={props.active=="blog"?"nav-link active":"nav-link"} to="/blog">Blog</Link>
                    <div className="dropdown">
                        <Link className={props.active=="process"?"nav-link active":"nav-link"} to="/process">process</Link>
                        <div className="dropdown-menu">
                            <Link className='dropdown-item' to="/process/web"
                                 onClick={mainNavbarExpandHandler}>Web Application Development</Link>
                            <Link className='dropdown-item' to="/process/cms"
                                 onClick={mainNavbarExpandHandler}>CMS Development</Link>
                            <Link className='dropdown-item' to="/process/logo"
                                 onClick={mainNavbarExpandHandler}>Logo Designing</Link>
                        </div>
                    </div>
                    {/* <NavDropdown active={props.active=="process"} title="process" id="process-dd">
                        <NavDropdown.Item as={Link} to="/process/web">Web Application Development</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/process/cms">CMS Development</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/process/logo">Logo Designing</NavDropdown.Item>
                    </NavDropdown> */}
                    <Link className={props.active=="contact"?"nav-link active":"nav-link"} to="/contact">Contact</Link>
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
      </div>
  )
}
