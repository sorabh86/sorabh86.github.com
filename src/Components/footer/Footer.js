import React from 'react'
import './footer.css'
import Ecd from '../../Assets/images/ecd-logo.png'

export default function Footer() {
  return (
    <footer className='w-100 bg-dark text-light mt-auto'>
        <div className="container">
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
                    <a className='donate-btn bg-orange' href="#">Donate for <span className="fa fa-coffee"></span></a>
                </div>
                <p className="text-center pt-3 border-top border-warning">© Copyright to Sorabh86, 2022 </p>
            </div>
        </div>
    </footer>
  )
}
