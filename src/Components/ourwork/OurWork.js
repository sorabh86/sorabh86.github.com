import React from 'react'
import { Container } from 'react-bootstrap'
import "./ourwork.css"

export default function OurWork() {
  return (
    <>
        <Container className='our-work mt-5 mb-5'>
            <h4 className="sos-heading sos-text mb-5 text-center">Our Work</h4>
            <ul className="portfolio">           
                <li className="box">
                    <a href="img/image-blank.png" className="magnifier" ><img alt="" src="img/work/1.jpg" /></a>
                </li> 
                <li className="box">
                    <a href="img/image-blank.png" className="magnifier" ><img alt="" src="img/work/2.jpg" /></a>
                </li> 
                <li className="box">
                    <a href="img/image-blank.png" className="magnifier" ><img alt="" src="img/work/3.jpg" /></a>
                </li> 
                <li className="box">
                    <a href="img/image-blank.png" className="magnifier" ><img alt="" src="img/work/4.jpg" /></a>
                </li> 
                <li className="box">
                    <a href="img/image-blank.png" className="magnifier" ><img alt="" src="img/work/5.jpg" /></a>
                </li> 
                <li className="box">
                    <a href="img/image-blank.png" className="magnifier" ><img alt="" src="img/work/6.jpg" /></a>
                </li> 
                <li className="box">
                    <a href="img/image-blank.png" className="magnifier" ><img alt="" src="img/work/7.jpg" /></a>
                </li> 
                <li className="box">
                    <a href="img/image-blank.png" className="magnifier" ><img alt="" src="img/work/8.jpg" /></a>
                </li>                       
            </ul>
        </Container>
        <div className='solutions bg-light border border-dash pt-5 pb-5'>
            <Container>
                <h2 className="text-center sos-heading sos-text">We made solutions for your business</h2>
                <h4 className='text-center pb-4'><i>Please send us your business requirements, consultancy meetings is totally free.</i></h4>
                <div className="solution-cards">
                    <div className='card'>
                        <div className="card-body">
                            <span className="sos-icons fa fa-shopping-cart"></span>
                            <h5 className='sos-text text-center'>E commerce</h5>
                            <p>Those who wanted to sell there range of selected products on web.</p>
                        </div>
                    </div>
                    <div className='card'>
                        <div className="card-body">
                            <span className="sos-icons fa fa-address-card"></span>
                            <h5 className='sos-text text-center'>Professional Portfolio</h5>
                            <p>Professional Portfolio with custom features addon i.e Followers, Subscribers, Testominals, Bulk Email, Event Organizer.</p>
                        </div>
                    </div>
                    <div className='card'>
                        <div className="card-body">
                            <span className="sos-icons fa fa-comments"></span>
                            <h5 className='sos-text text-center'>Blog Post</h5>
                            <p>Peoples interested to make community and being touch with there updates.</p>
                        </div>
                    </div>
                    <div className='card'>
                        <div className="card-body">
                            <i className="sos-icons fa fa-newspaper-o"></i>
                            <h5 className='sos-text text-center'>News</h5>
                            <p>Website that gives you news updates, daily news notifications etc.</p>
                        </div>
                    </div>
                    <div className='card'>
                        <div className="card-body">
                            <i className="sos-icons fa fa-hospital-o"></i>
                            <h5 className='sos-text text-center'>Hospital Management</h5>
                            <p>Staff, Appointment Management.</p>
                        </div>
                    </div>
                    <div className='card'>
                        <div className="card-body">
                            <i className="sos-icons fa fa-home"></i>
                            <h5 className='sos-text text-center'>Real Estate</h5>
                            <p>Management System.</p>
                        </div>
                    </div>
                    <div className='card'>
                        <div className="card-body">
                            <i className="sos-icons fa fa-bank"></i>
                            <h5 className='sos-text text-center'>Banking</h5>
                            <p>Banking System, Transaction Management System.</p>
                        </div>
                    </div>
                    <div className='card'>
                        <div className="card-body">
                            <h4 className='text-center'><i>and many more based on your business.</i></h4>
                            <div className="text-center">
                                <a href="mailto:ssorabh.ssharma@hotmail.com" className="btn btn-primary sos-bg">Email US</a>
                            </div>
                        </div>
                    </div>

                </div>
               
            </Container>
        </div>
    </>
  )
}
