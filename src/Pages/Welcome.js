import React from 'react'
import "bootstrap";
import Header from "../Components/header/Header"
import FlexSlider from '../Components/flexslider/FlexSlider';
import OurWork from '../Components/ourwork/OurWork';
import Footer from '../Components/footer/Footer';
import { Link } from 'react-router-dom';

export default function Welcome() {
  return (
    <>
      <Header active="home"/>
      <FlexSlider />
      <OurWork />
      <div className="about-me container">
        <div className="row">
          <article className="sos-profile col-xl-7 p-4 rounded-3 mt-3 mb-3 pt-5 pb-5 bg-dark text-light">
            <h2 className='sos-heading sos-o-text text-center pt-0 mb-2'>About Me</h2>
            <div className="d-flex gap-4">
              <figure className="profile">
                <img className="img-responsive" src="img/sorabh-profile.jpg " alt="Sorabh" />
              </figure>
              <div className="inner-1 d-flex flex-column justify-content-center">
                <h5 className='pb-3'><a className='sos-o-text text-sm fs-4' href="http://sorabh86.github.io"><span className="fa fa-github"></span> sorabh86</a></h5>
                <div className="txt-1 pb-3"><b>At your service,</b><br/> Professional Software Engineers!!!<br/> We help our client to understand full System Development Life Cycle (SDLC), and they contribute and guide us on features.</div>
                  <p className='pb-3'>Days of Building Simple Websites are gone, clients are demanding more, they are expecting better and best, Here our roles
      starts, we create unforgettable brand experiences. Our passion is helping design and build solutions that strike to the perfect
      balance between users, business, and technology..</p>
                <div>
                  <Link className='btn sos-o-bg text-white text-bold' to="/about">Read More...</Link>
                </div>
              </div>
            </div>
          </article>
          <article className="sos-expertise col-xl-5 pt-5 pb-5">
            <h2 className='sos-heading sos-text pt-0 mb-2 text-center'>Expertise</h2>
            <div className="d-flex justify-content-between ps-3">
              <div className="sos-expertise">
                <strong className='sos-text'>DESIGN</strong>
                <a href="#">Vector</a>
                <a href="#">Banner</a>
                <a href="#">LOGO</a>
                <a href="#">Mockup2PSD</a>
                <a href="#">PSD2HTML</a>
                <a href="#">HTML</a>
                <a href="#">CSS</a>
                <a href="#">SVG</a>
                <a href="#">ICONS</a>
                <a href="#">Games</a>
              </div>
              <div className="sos-expertise">
                <strong className='sos-text'>WEBSITES</strong>
                <a href="#">Static</a>
                <a href="#">Dynamic</a>
                <a href="#">CMS</a>
                <a href="#">Blog</a>
                <a href="#">Portfolio</a>
                <a href="#">Ecommerce</a>
                <a href="#">Hospital</a>
                <a href="#">Real Estate</a>
                <a href="#">Society</a>
                <a href="#">Micro Services</a>
                <a href="#">REST API</a>
                <a href="#">Docker</a>
              </div>
              <div className="sos-expertise">
                <strong className='sos-text'>LANGUAGES</strong>
                <a href="#">Core PHP</a>
                <a href="#">Wordpress</a>
                <a href="#">AngularJS</a>
                <a href="#">React</a>
                <a href="#">SQL</a>
                <a href="#">NodeJS</a>
                <a href="#">JAVA</a>
                <a href="#">Spring</a>
                <a href="#">JavaScript</a>
                <a href="#">jQuery</a>
              </div>
              <div className="sos-expertise">
                <strong className='sos-text'>DATABASES</strong>
                <a href="#">MariaDB</a>
                <a href="#">MYSQL</a>
                <a href="#">SQLite</a>
                <a href="#">PostgresSQL</a>
                <a href="#">Firebase</a>
                <a href="#">MSSQL</a>
                <a href="#">MongoDB</a>
                <a href="#">Oracle</a>
              </div>
            </div>
          </article>
        </div>
      </div>
      <Footer />
    </>
  )
}
