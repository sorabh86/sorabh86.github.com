import /* React, */ { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import s86logo from "../assets/logo.png";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSkype, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faBars, faCaretDown, faEnvelope, faTimes } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from "framer-motion";
import { menuData } from "../constants/menus.data";

interface Props { }

function Header({ }: Props) {

  const location = useLocation();
  const menus = menuData;

  const [isMobile, setIsMobile] = useState(window.innerWidth < 960);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isProcessOpen, setIsProcessOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      console.log(isMobile);
      setIsMobile(window.innerWidth < 963);
      if (window.innerWidth >= 963) setMenuOpen(false);
      
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="sos-navbar">
      <div className="mx-auto lg:px-5 py-2 bg-gray-900">
        <div className="flex md:flex-row flex-col flex-wrap gap-2 justify-between items-center">
          <nav className="flex md:p-0 flex-row md:mt-0 w-full md:w-auto">
            <a className='grow btn-link text-center border-r-1 border-so-gray text-so-gray-light m-0' href="mailto:ssorabh.ssharma@hotmail.com">
              <FontAwesomeIcon className="text-4xl sm:text-sm pr-2" icon={faEnvelope} />
              <span className='hidden sm:inline-block smdt'>Sorabh86</span>
            </a>
            <a className='grow btn-link text-center border-r-1 border-so-gray text-so-gray-light m-0' href="skype:ssorabh.ssharma?call">
              <FontAwesomeIcon className="text-4xl sm:text-sm pr-2" icon={faSkype} />
              <span className='hidden sm:inline-block smdt'>ssorabh.ssharma</span>
            </a>
            <a className='grow btn-link text-center text-so-gray-light m-0' target='blank' href="https://wa.me/919891464750">
              <FontAwesomeIcon className="text-4xl sm:text-sm pr-2" icon={faWhatsapp} />
              <span className='hidden sm:inline-block smdt'>9891464750</span>
            </a>
          </nav>
          <nav className="flex md:p-0 flex-row md:mt-0 gap-2">
            <Link className="btn-border m-0" to={'/login'}>Members</Link>
            <Link className="btn-orange" to={'/signup'}>Join Us</Link>
          </nav>
        </div>
      </div>

      <nav className="bg-so-blue px-4">
        <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between">
          <Link to="/" className="py-3 lg:py-0 md:py-3 sm:py-3">
            <img src={s86logo} className="h-14" alt="Sorabh86 Logo" />
          </Link>

          {isMobile && (
            <button
              type="button"
              className="p-2 w-10 h-10 rounded-lg text-white hover:bg-so-orange focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-label="Toggle navigation menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} className="w-6 h-6" />
            </button>
          )}

          {(menuOpen || !isMobile) && (
            <div className={`w-full ${isMobile ? "block" : "hidden"} md:block md:w-auto border-t-1 md:border-t-0 text-center`}>
              <div className="flex flex-col md:flex-row md:space-x-8 p-0 md:p-0 rtl:space-x-reverse">
                {menus.map((menu, key) => (
                  <div key={key}
                    className="menu-link relative group m-0"
                    onClick={() => isMobile && setIsProcessOpen(!isProcessOpen)}
                    onMouseEnter={menu.children ? () => !isMobile && setIsProcessOpen(true) : undefined}
                    onMouseLeave={menu.children ? () => !isMobile && setIsProcessOpen(false) : undefined}
                  >
                    <Link to={menu.children?'#':menu.link} className={`block btn-nav font-bold uppercase m-0${location.pathname === menu.link ? ' bg-so-gray-dark' : ''}`}>{menu.label}
                    {menu.children && ( <FontAwesomeIcon className="pl-2" icon={faCaretDown} /> )}
                    </Link>
                    
                    {menu.children && (
                      <AnimatePresence>
                      {isProcessOpen && (
                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="relative md:absolute flex flex-col bg-so-blue p-2 border border-so-gray-light md:w-max rounded-lg drop-shadow-xl z-10">
                          <Link to="/process/web" className={`p-3 hover:bg-so-orange${location.pathname === "/process/web" ? " bg-so-gray-dark" : ""}`}>Web Development</Link>
                          <Link to="/process/design" className={`p-3 hover:bg-so-orange${location.pathname === "/process/design" ? " bg-so-gray-dark" : ""}`}>Web Design</Link>
                          <Link to="/process/cms" className={`p-3 hover:bg-so-orange${location.pathname === "/process/cms" ? " bg-so-gray-dark" : ""}`}>CMS Development</Link>
                          <Link to="/process/logo" className={`p-3 hover:bg-so-orange${location.pathname === "/process/logo" ? " bg-so-gray-dark" : ""}`}>Logo Designing</Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    )}
                  </div>
                ))}
                {/* <Link to="/" className={`btn-nav font-bold uppercase m-0${location.pathname === '/' ? ' bg-so-gray-dark' : ''}`}>Home</Link>
                <Link to="/about" className={`btn-nav font-bold uppercase m-0${location.pathname === '/about' ? ' bg-so-gray-dark' : ''}`}>About</Link>
                <Link to="/work" className={`btn-nav font-bold uppercase m-0${location.pathname === '/work' ? ' bg-so-gray-dark' : ''}`}>Work</Link>
                <Link to="/blog" className={`btn-nav font-bold uppercase m-0${location.pathname === '/blog' ? ' bg-so-gray-dark' : ''}`}>Blog</Link>

                <div className="relative group m-0" onMouseEnter={() => !isMobile && setIsProcessOpen(true)} onMouseLeave={() => !isMobile && setIsProcessOpen(false)}>
                  <button onClick={() => isMobile && setIsProcessOpen(!isProcessOpen)} className={`btn-nav font-bold uppercase m-0${location.pathname.startsWith("/process") ? " bg-so-gray-dark" : ""}`}> Process <FontAwesomeIcon className="pl-2" icon={faCaretDown} /> </button>
                  <AnimatePresence>
                    {isProcessOpen && (
                      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="relative md:absolute left-0 flex flex-col bg-so-blue p-2 border border-so-gray-light md:w-max rounded-lg drop-shadow-xl z-10">
                        <Link to="/process/web" className={`p-3 hover:bg-so-orange${location.pathname === "/process/web" ? " bg-so-gray-dark" : ""}`}>Web Development</Link>
                        <Link to="/process/design" className={`p-3 hover:bg-so-orange${location.pathname === "/process/design" ? " bg-so-gray-dark" : ""}`}>Web Design</Link>
                        <Link to="/process/cms" className={`p-3 hover:bg-so-orange${location.pathname === "/process/cms" ? " bg-so-gray-dark" : ""}`}>CMS Development</Link>
                        <Link to="/process/logo" className={`p-3 hover:bg-so-orange${location.pathname === "/process/logo" ? " bg-so-gray-dark" : ""}`}>Logo Designing</Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link to="/contact" className={`btn-nav font-bold uppercase m-0${location.pathname === "/contact" ? " bg-so-gray-dark" : ""}`}>Contact</Link> */}
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Header;
