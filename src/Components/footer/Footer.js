import React from 'react'
import './footer.css'

export default function Footer() {
  return (
    <footer className='w-100 bg-dark text-light'>
        <div className="container">
            <div className="row">
                <ul className="list-social col-lg-6">
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
                <div className="privacy col-lg-6">
                    <span>© Copyright, 2022</span> 
                    <a className='sos-o-text' href="http://www.expertcodedesign.com">Expert Code Design</a> 
                    <a href="http://twitter.github.com/bootstrap/" target="_blank">Bootstrap</a>
                    <a href="https://www.paypal.me/SorabhSharma">Donate</a>
                </div>
            </div>
        </div>
    </footer>
  )
}
