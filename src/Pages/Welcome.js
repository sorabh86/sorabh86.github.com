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
              <div className="expertise-item">
                <strong className='sos-text'>DESIGN</strong>
                <a href="#"><span>Vector</span></a>
                <a href="#"><span>Banner</span></a>
                <a href="#"><span>LOGO</span></a>
                <a href="#"><span>Mockup2PSD</span></a>
                <a href="#"><span>PSD2HTML</span></a>
                <a href="#"><span>HTML</span></a>
                <a href="#"><span>CSS</span></a>
                <a href="#"><span>SVG</span></a>
                <a href="#"><span>ICONS</span></a>
                <a href="#"><span>Games</span></a>
              </div>
              <div className="expertise-item">
                <strong className='sos-text'>WEBSITES</strong>
                <a href="#"><span>Static</span></a>
                <a href="#"><span>Dynamic</span></a>
                <a href="#"><span>CMS</span></a>
                <a href="#"><span>Blog</span></a>
                <a href="#"><span>Portfolio</span></a>
                <a href="#"><span>Ecommerce</span></a>
                <a href="#"><span>Hospital</span></a>
                <a href="#"><span>Real Estate</span></a>
                <a href="#"><span>Society</span></a>
                <a href="#"><span>Micro</span> Services</a>
                <a href="#"><span>REST</span> API</a>
                <a href="#"><span>Docker</span></a>
              </div>
              <div className="expertise-item">
                <strong className='sos-text'>LANGUAGES</strong>
                <a href="#"><span>Core PHP</span></a>
                <a href="#"><span>Wordpress</span></a>
                <a href="#"><span>AngularJS</span></a>
                <a href="#"><span>React</span></a>
                <a href="#"><span>SQL</span></a>
                <a href="#"><span>NodeJS</span></a>
                <a href="#"><span>JAVA</span></a>
                <a href="#"><span>Spring</span></a>
                <a href="#"><span>JavaScript</span></a>
                <a href="#"><span>jQuery</span></a>
              </div>
              <div className="expertise-item">
                <strong className='sos-text'>DATABASES</strong>
                <a href="#"><span>MariaDB</span></a>
                <a href="#"><span>MYSQL</span></a>
                <a href="#"><span>SQLite</span></a>
                <a href="#"><span>PostgresSQL</span></a>
                <a href="#"><span>Firebase</span></a>
                <a href="#"><span>MSSQL</span></a>
                <a href="#"><span>MongoDB</span></a>
                <a href="#"><span>Oracle</span></a>
              </div>
            </div>
          </article>
        </div>
      </div>
      <Footer />
    </>
  )
}
