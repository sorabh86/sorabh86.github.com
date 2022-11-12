import React from 'react'
import "bootstrap";
import Navbar from "../Components/Header"
import FlexSlider from '../Components/flexslider/FlexSlider';
import OurWork from '../Components/ourwork/OurWork';
import Footer from '../Components/footer/Footer';
import { Link } from 'react-router-dom';

export default function Welcome() {
  return (
    <>
      <Navbar active="home"/>
      <FlexSlider />
      <OurWork />
      <div className="about-me container">
        <div className="row">
          <article className="col-xl-6 p-5 bg-dark text-light">
            <h3 className='sos-heading sos-o-text text-center pt-0 mb-2'>About Me</h3>
            <div className="d-flex gap-4">
              <figure className="profile">
                <img className="img-responsive" src="img/sorabh-profile.jpg " alt="Sorabh" />
              </figure>
              <div className="inner-1">
                <h5><a className='sos-o-text' href="http://sorabh86.github.io"><span className="fa fa-github"></span> sorabh86</a></h5>
                <div className="txt-1"><b>At your service,</b><br/> Professional Software Engineers!!!<br/> We help our client to understand full System Development Life Cycle (SDLC), and they contribute and guide us on features.</div>
                  <p>Days of Building Simple Websites are gone, clients are demanding more, they are expecting better and best, Here our roles
      starts, we create unforgettable brand experiences. Our passion is helping design and build solutions that strike to the perfect
      balance between users, business, and technology..</p>
                <Link className='btn btn-warning text-bold' to="/about">Read More...</Link>
              </div>
            </div>
          </article>
          <article className="col-xl-6">
            <h3 className='sos-heading sos-text pt-0 mb-2 text-center'>Expertise</h3>
            <div className="d-flex justify-content-around">
              <div className="sos-expertise">
                <strong className='sos-text'>DESIGN</strong>
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
