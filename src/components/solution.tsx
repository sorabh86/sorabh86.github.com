import {
  faAddressCard,
  faBank,
  faCheck,
  faComment,
  faEnvelope,
  faHome,
  faHospital,
  faNewspaper,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import React from "react";

interface Props {}

function Solution(props: Props) {
  const {} = props;

  return (
    <div className="solutions  bg-[#eee] border-t-1 border-so-gray-light text-so-gray-dark">
      <div className="text-center my-10">
        {/* <FontAwesomeIcon className='text-white text-4xl rounded-full p-6 mb-6 bg-so-orange' icon={faPersonChalkboard} /> */}
        <h2 className="sos-heading text-so-blue text-5xl mb-6">
          Tailored Solutions
        </h2>
        <h3 className="text-2xl pb-4">
          We provide customized digital solutions to help your business thrive.
        </h3>
        <p className="italic pb-4 mb-4">
          Consultation is 100% FREE! Share your requirements, and let’s build the
          perfect solution for you.
        </p>
      </div>
      <div className="our-service">
        {/* <h3 className="title">Services</h3> */}
        <div className="solution-cards">
          <div className="card">
            <FontAwesomeIcon className="card-icon" icon={faShoppingCart} />
            <h5 className="card-title">E-Commerce Solutions</h5>
            <p>
              Launch your online store and sell your products effortlessly. We
              create feature-rich e-commerce platforms for businesses of all
              sizes.
            </p>
          </div>
          <div className="card">
            <FontAwesomeIcon className="card-icon" icon={faAddressCard} />
            <h5 className="card-title">Professional Portfolio Websites</h5>
            <p> Showcase your expertise with a stunning portfolio website. Enhance it with custom features such as: </p>
            <ul>
              <li><FontAwesomeIcon className="text-green-500 mr-2" icon={faCheck} /> Followers & Subscribers</li>
              <li><FontAwesomeIcon className="text-green-500 mr-2" icon={faCheck} /> Testimonials & Reviews</li>
              <li><FontAwesomeIcon className="text-green-500 mr-2" icon={faCheck} /> Bulk Email Marketing</li>
              <li><FontAwesomeIcon className="text-green-500 mr-2" icon={faCheck} /> Event Organizer</li>
            </ul>
          </div>
          <div className="card">
            <FontAwesomeIcon className="card-icon" icon={faComment} />
            <h5 className="card-title">Blog & Community Platforms</h5>
            <p>Build an engaging blog or community website to stay connected with your audience and share updates effortlessly.</p>
          </div>
          <div className="card">
            <FontAwesomeIcon className="card-icon" icon={faNewspaper} />
            <h5 className="card-title">News & Media Websites</h5>
            <p>Create a professional news platform with real-time updates, daily notifications, and a user-friendly experience.</p>
          </div>
          <div className="card">
            <FontAwesomeIcon className="card-icon" icon={faHospital} />
            <h5 className="card-title">Hospital Management Systems</h5>
            <p>Streamline hospital operations with efficient staff and appointment management systems.</p>
          </div>
          <div className="card">
            <FontAwesomeIcon className="card-icon" icon={faHome} />
            <h5 className="card-title">Real Estate Management</h5>
            <p>Manage property listings, clients, and transactions with a powerful real estate management system.</p>
          </div>
          <div className="card">
            <FontAwesomeIcon className="card-icon" icon={faBank} />
            <h5 className="card-title">Banking & Finance Solutions</h5>
            <p>Secure and scalable banking systems, including transaction management, user accounts, and financial reporting.</p>
          </div>
          <div className="card">
              <h5 className="card-title my-12">Need a unique solution?</h5>
              <p className="pb-4"> We develop custom applications tailored to your business requirements.</p>
              <a href="mailto:ssorabh.ssharma@hotmail.com" className="btn-blue block self-center mb-4" >
                <FontAwesomeIcon className="pr-2" icon={faEnvelope} />Get in touch today!
              </a>
              <p className="font-bold text-center text-so-red">Let's bring your ideas to life</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Solution;
