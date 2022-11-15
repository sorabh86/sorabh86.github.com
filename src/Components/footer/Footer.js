import React, { useState } from 'react'
import './footer.css'
import Ecd from '../../Assets/images/ecd-logo.png'
import Upi from '../../Assets/images/donate-sorabh86-QR.jpg'

export default function Footer() {
    const [upi, setUpi] = useState(false);
  
    function donateHandle(e) {
        e.preventDefault();
        setUpi(!upi);
    }

    return (
    <footer className='w-100 bg-dark text-light mt-auto'>
        <div className="container pb-3">
            <div className="row d-flex justify-content-between">
                <ul className="list-social text-center col-xl-6  d-xl-flex justify-content-start">
                    <li><a className="icons" href="#/">
                        <i className="fa fa-facebook"></i> facebook
                    </a></li>
                    <li><a className="icons" href="https://www.linkedin.com/company/expertcodedesign">
                        <i className="fa fa-linkedin"></i> linkedin
                    </a></li>
                    <li><a className="icons" href="https://www.github.com/sorabh86">
                        <i className="fa fa-github"></i> Github
                    </a></li>
                    <li><a className="icons" href="#">
                        <i className="fa fa-google-plus"></i> google+</a>
                    </li>
                </ul>
                <div className="privacy text-center col-xl-6 d-xl-flex justify-content-end">
                    <img className='pe-3' src={Ecd} alt="Expert Code Design Logo" />
                    <a className='btn donate-btn bg-orange' href='#' onClick={donateHandle}>Donate for <span className="fa fa-coffee"></span></a>
                </div>
            </div>
        </div>
        <p className="text-center pt-3 mb-0 border-top border-warning">© Copyright to Sorabh86, 2022 </p>
        {<div className={upi?'upi active':'upi'}>
            <div className="upi-inner">
                <a className='btn fs-2' href="#" onClick={donateHandle}>&times; <small>(close)</small></a>
                <img src={Upi} />
            </div>
        </div>}
    </footer>
  )
}
