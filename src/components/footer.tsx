import React, { MouseEvent, useState } from 'react'
import Ecd from "../assets/ecd-logo.png";
import Upi from "../assets/donate-sorabh86-QR.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGithub, faGooglePlus, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { }

function Footer(props: Props) {
  const { } = props
  const [upi, setUpi] = useState(false);

  function donateHandle(e:MouseEvent<any>) {
    e.preventDefault();
    setUpi(!upi);
  }

  return (
    <footer className="w-full text-white mt-auto border-t-1 border-so-gray">
      <div className="mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 py-6 px-4">
          <ul className="flex flex-wrap justify-center md:justify-start gap-6">
            <li>
              <a href="#" className="flex items-center justify-center space-x-2 hover:text-blue-400 transition-colors duration-500" >
                <FontAwesomeIcon className='text-xl' icon={faFacebook} />
                <span>Facebook</span>
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/company/expertcodedesign" className="flex items-center space-x-2 hover:text-blue-400 transition-colors duration-500" >
                <FontAwesomeIcon className='text-xl' icon={faLinkedin} />
                <span>LinkedIn</span>
              </a>
            </li>
            <li>
              <a href="https://www.github.com/sorabh86" className="flex items-center gap-2 hover:text-gray-400 transition-colors duration-500" >
                <FontAwesomeIcon className='text-xl' icon={faGithub} />
                <span>GitHub</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-2 hover:text-red-500 transition-colors duration-500" >
                <FontAwesomeIcon className='text-xl' icon={faGooglePlus} />
                <span>Google+</span>
              </a>
            </li>
          </ul>

          <div className="flex items-center space-x-4">
            <img className="h-10" src={Ecd} alt="Expert Code Design Logo" />
            <button onClick={(e) => donateHandle(e)} className="btn-orange flex items-center space-x-2" >
              <span>Donate for</span>
              <i className="fa fa-coffee"></i>
            </button>
          </div>
        </div>

        <p className="text-center py-3  px-4 border-t bg-gray-900 border-gray-700"> © Copyright to Sorabh86, 2022 </p>
      </div>

      <AnimatePresence>
        {upi && (
          <motion.div 
            initial={{ left: -2000 }}
            animate={{ left: 1 }}
            exit={{ left: 2000 }}
            className="fixed inset-0 bg-so-black-8 flex items-center justify-center z-50 w-screen h-screen">
            <div className="bg-white p-6 rounded-lg shadow-lg relative my-10">
              <button onClick={(e) => donateHandle(e)} className="flex gap-2 btn-orange absolute right-4 top-4" >
                <FontAwesomeIcon icon={faClose} />
                <small>close</small>
              </button>
              <img src={Upi} alt="UPI QR Code" className="h-[calc(100vh-150px)]" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  )
}

export default Footer
