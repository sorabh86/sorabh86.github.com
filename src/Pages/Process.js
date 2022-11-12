import React from 'react'
import { Container } from 'react-bootstrap';
import { Outlet, useParams } from 'react-router-dom'
import Footer from '../Components/footer/Footer';
import SNabbar from "../Components/Header"

export default function Process() {
    const params = useParams("name");
  return (
    <>
        <SNabbar active="process"/>
        <div className="bg-dark">
            <Container>
                <h1 className="sos-heading sos-text">Process</h1>
                <Outlet />
            </Container>
        </div>
        <Footer />
    </>
  )
}
