import React from 'react'
import './footer.css'
import Ecd from '../../Assets/images/ecd-logo.png'

export default function Footer() {
  return (
    <footer className='w-100 bg-dark text-light mt-auto'>
        <div className="container">
            <div className="row d-flex justify-content-between">
                <ul className="list-social text-center col-xl-6  d-xl-flex justify-content-start">
                    <li><a className="icons" href="https://www.facebook.com/expertcodedesigncom-271624916582712/">
                        <i className="fa fa-facebook"></i> facebook
                    </a></li>
                    <li><a className="icons" href="https://www.linkedin.com/company/expertcodedesign">
                        <i className="fa fa-linkedin"></i> linkedin
                    </a></li>
                    <li><a className="icons" href="https://twitter.com/sorabh86">
                        <i className="fa fa-twitter"></i> twitter
                    </a></li>
                    <li><a className="icons" href="#">
                        <i className="fa fa-google-plus"></i> google+</a>
                    </li>
                </ul>
                <div className="privacy text-center col-xl-6 d-xl-flex justify-content-end">
                    <img className='pe-3' src={Ecd} alt="Expert Code Design Logo" />
                    <a className='sos-join sos-o-bg mt-auto mb-auto' href="#">Donate for <span className="fa fa-coffee"></span></a>
                </div>
                <p className="border-white border-top-3 fs-6 m-0 d-block text-center p-2">© Copyright to Sorabh86, 2022 </p>
            </div>
        </div>
    </footer>
  )
}
