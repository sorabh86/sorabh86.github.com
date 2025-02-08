import React from 'react'
import { Container } from 'react-bootstrap';
import { Link, Outlet, useParams } from 'react-router-dom'
import Footer from '../Components/footer/Footer';
import Header from "../Components/header/Header"

export default function Process() {
    const params = useParams()['*'];
  return (
    <div className='process-page'>
        <Header active="process"/>
        {params==='' && <div className="bg-light pb-5">
            <Container>
                <h1 className="sos-heading sos-text">Services</h1>
                <p className='alert alert-info text-center'>Design & Development in progress...</p>
                <div className='row'>
                    <Link className='col-lg-4 text-center' to='/process/web'>
                          <h2><i className="fa fa-sitemap sos-o-text"></i></h2>
                          <h6 className="sos-o-text"> Web Application Development</h6>
                    </Link>
                    <Link className='col-lg-4 text-center' to='/process/cms'>
                        <h2><i className="fa fa-gear sos-o-text bg-white p-1 rounded-circle"></i></h2>
                        <h6 className="sos-o-text">CMS Development</h6>
                    </Link>
                    <Link className='col-lg-4 text-center' to='/process/logo'>
                          <h2><i className="fa fa-heart sos-o-text"></i></h2>
                          <h6 className="sos-o-text">Logo Development</h6>
                    </Link>
                </div>  
            </Container>
        </div>}
        <Container className='mt-5 mb-5'>
          <Outlet className="m-0" />
        </Container>
        <Footer />
    </div>
  )
}
