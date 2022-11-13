import React from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Footer from '../Components/footer/Footer'
import Header from "../Components/Header"

export default function AboutMe() {
  return (
    <div className='aboutme'>
      <Header active='about'/>
      <div className='bg-dark text-light'>
        <Container className='p-5'>
          <h2 className='sos-heading sos-o-text text-center pt-0 mb-3'><span className="fa fa-id-badge"></span> About Me</h2>
          <div className="row">
            <figure className="profile col-lg-4">
              <img className="img-responsive w-100" src="img/sorabh-profile.jpg " alt="Sorabh" />
            </figure>
            <div className="inner-1 col-lg-8">
              <h3 className='pb-3'><a className='sos-o-text' href="http://sorabh86.github.io"><span className="fa fa-github"></span> sorabh86</a></h3>
              <div className="txt-1"><b>At your service,</b><br /> Professional Software Engineers!!!<br /> We help our client to understand full System Development Life Cycle (SDLC), and they contribute and guide us on features.</div>
              <p>Days of Building Simple Websites are gone, clients are demanding more, they are expecting better and best, Here our roles
                starts, we create unforgettable brand experiences. Our passion is helping design and build solutions that strike to the perfect
                balance between users, business, and technology..</p>
              <ul className='pb-3'>
                <li>Software Developer with over 10 years of experience.</li>
                <li>Have interest in designing and crafting efficient modern software's, and learning new technologies and tools if need arises.</li>
              </ul>
              <div className="d-flex gap-4">
                <a className="nav-link sos-o-text" href="tel:919891464750"><i className="fa fa-phone-square"></i> 9891464750</a>
                <a className="nav-link sos-o-text" href="tel:919891464750"><i className="fa fa-phone-square"></i> 7838138004</a>
                <a className="nav-link sos-o-text" href="skype:ssorabh.ssharma?call"><i className="fa fa-skype"></i> Talk on Skype</a>
                <a className="nav-link sos-o-text" href="mailto:ssorabh.ssharma@hotmail.com"><i className="fa fa-envelope"></i> Send Email</a>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <div className='expertise'>
        <Container className="p-5">
          <h2 className='sos-heading sos-o-text text-center pt-0 mb-2'>Expertise</h2>
          <div className="Languages mb-5">
            <h3 className='sos-text mb-3'><span className="fa fa-code"></span> Languages</h3>
            <p><strong>Proficient in</strong> HTML, CSS, JavaScript (Vanilla, ES5, ES6, Babel), TypeScript, Bash, PHP, SQL, XML, JSON, Java, Python, C#, C, C++.</p>
            <p><strong>Familiar with</strong> Object Oriented Programming, OOJS, MVC, Web Services, RESTAPI, Sockets, Spring Boot, Wordpress, CodeIgniter, Angular/AngularJS, ReactJS, VueJS, Node.js, Express, Canvas, jQuery, Three.js, Twitter Bootstrap, Foundation Framework, Unity3D, Godot.</p>
          </div>
          <div className="Softwares">
            <h3 className='sos-text mb-3'><span className="fa fa-language"></span> Softwares</h3>
            <p><strong>Server:</strong> Apache2, Ngnix, Node.js, AWS, Apache Tomcat.</p>
            <p><strong>Database:</strong> MySQL, MariaDB, MongoDB, SQLLite.</p>
            <p><strong>Software:</strong> Docker, Container, VSCode, Sublime text, Git Bash, Adobe Photoshop (alt Gimp), Adobe Illustrator (alt Inkscape), Blender2.9, Ms Office (alt LibreOffice), Greenshot, Dia Diagram, Eclipse, Netbeans, STS4, IntelliJ, kedenlive, Natron, Figma, OBS Studio.</p>
            <p><strong>Platforms:</strong> Microsoft Windows(All Versions), Linux(Ubuntu | All Debian Distributions)</p>
          </div>
        </Container>
      </div>
      <div className='experience bg-light border-top border-bottom border-top-5 border-bottom-5 border-info '>
        <Container className="p-5">
          <h2 className='sos-heading sos-o-text text-center pt-0 mb-2'>Experience</h2>
          <div className="row">
            <div className="col-lg-6 mb-4">
              <div className="company h-100">
                <h3 className='sos-text mb-3'><span className="fa fa-user-circle"></span> Web Developer <small><i>(July 2019  Present)</i></small></h3>
                <p><strong>Self Employed Freelancer</strong></p> 
                <div className="p-3">
                  <p>Worked on various online sites, seeking new projects to work.</p>
                  <p>Developing & Defining SDLC workflow for a Project, and continue developing ER Diagram, DFD, different Modules & sub-modules, Mockup Pages for layouts based on client requirements.</p>
                  <p>Develop custom product designing software in HTML5, REST Services for communication.</p>
                  <p>Programming PHP Services, manage there database to communicate with application.</p>
                  <p>Mean Stack Development (using VueJS, ReactJS, Angular, Node.js, Express, MySQL, MongoDB).</p>
                  <p>Lamp Stack Development (using Apache2 or NginX, PHP, MySQL).</p>
                  <p>Lean Docker, that can be used to setup micro services using AWS, Azure, Google Cloud Virtual machine.</p>
                  <p>Learning new technologies in passing time, game development is good for learning algorithms and coding logic’s.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 mb-4">
              <div className="company h-100">
                <h3 className='sos-text mb-3'><span className="fa fa-user-circle"></span> APP-TEAM LEAD <small><i>(June 2013 – July 2019)</i></small></h3>
                <p><strong>WebEsperto | Exabyte Informatics Pvt Ltd</strong></p> 
                <div className="p-3">
                  <p>Primary responsibilities include to guide team member, to deliver project in time.</p>
                  <p>Full Stack Development, Follow up Software Development Life Cycle.</p>
                  <p>FrontHand Development using AngularJS, jQuery, HTML5, CSS3, JavaScript.</p>
                  <p>Design and Develop Wordpress Plugins & Themes.</p>
                  <p>Coding UI-UX functionality & animate elements using JavaScript, jQuery, CSS3, etc.</p>
                  <p>Custom module, plugin development & Custom theme designing on various popular open source PHP framework, like WordPress, OpenCart, Magento1.X only.</p>
                  <p>Worked on e-commerce projects.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 mb-4">
              <div className="company h-100">
                <h3 className='sos-text mb-3'><span className="fa fa-user-circle"></span> SENIOR DEVELOPER <small><i>(December 2011 – November 2012)</i></small></h3>
                <p><strong>Logic IT Solution Pvt Ltd</strong></p> 
                <div className="p-3">
                  <p>Prepare existing online 3D image rendering engine pov-ray, export models using blender, programming with Flash Builder to preview on web browser.</p>
                  <p>Develop online product designer application for various products like Cup, Tshirts, etc, programming user friendly interface, integrate with various famous open source framwork of     PHP, Manage database structure, Analysis and generate ER Diagram, and REST service routes to communicate with application.</p>
                  <p>Programming to develop various useful OOPS components and ActionScript API.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="company mb-4">
                <h3 className='sos-text mb-3'><span className="fa fa-user-circle"></span> SENIOR FLEX DEVELOPER <small><i>(March 2010 – December 2011)</i></small></h3>
                <p><strong>Sparx IT Solutions Pvt Ltd</strong></p> 
                <div className="p-3">
                  <p>Provided object-oriented Rich Application, programming and implementation support to customer online printing software, written in ActionScript 3.0, Flex Builder.</p>
                  <p>Prepare user manual documentation of customer.</p>
                  <p>Problem-solving on existing Application, update code to new technology.</p>
                  <p>Develop web games based on Flash Application for in-house projects.</p>
                  <p>Worked on developing ActionScript reusable components, object handler, secure uploading files, etc.</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <div className='education'>
        <Container className="p-5">
          <h2 className='sos-heading sos-o-text text-center pt-0 mb-2'>Education</h2>
          <div className="certificates row">
            <div className='sos-text mb-3 col-xl-4'>
              <p className="degree">
                <span className="fa fa-certificate"></span> 
                <strong> MCA (Master Of Computer Application)</strong> <span className='year'>Year 2019</span><br/>
                <i> IGNOU (UNIVERSAL INSTITUTE OF COMPUTER & TECHNOLOGY), Sector 62, Noida</i>
              </p>
            </div>
            <div className='sos-text mb-3 col-xl-4'>
              <p className="degree">
                <span className="fa fa-certificate"></span> 
                <strong> PGDCA (Post Graduate Diploma in Computer Application)</strong>  <span className='year'>Year 2019</span><br/>
                <i> IGNOU (UNIVERSAL INSTITUTE OF COMPUTER & TECHNOLOGY), Sector 62, Noida</i>
              </p>
            </div>
            <div className='sos-text mb-3 col-xl-4'>
              <p className="degree">
                <span className="fa fa-certificate"></span> 
                <strong> CWDD (Certification in Web Design & Development)</strong>  <span className='year'>Year 2010</span><br/>
                <i> UNIQUE COMPUTER CENTER, Seelampur, Delhi</i>
              </p>
            </div>
            <div className='sos-text mb-3 col-xl-4'>
              <p className="degree">
                <span className="fa fa-certificate"></span> 
                <strong> B.A. (Bachelor in Art)</strong>  <span className='year'>Year 2007</span><br/>
                <i> CCS UNIVERSITY (MEERUT LAJPAT RAI COLLEGE), Sahibabad, U.P.</i>
              </p>
            </div>
            <div className='sos-text mb-3 col-xl-4'>
              <p className="degree">
                <span className="fa fa-certificate"></span> 
                <strong> DCA (Diploma in Computer Application)</strong>  <span className='year'>Year 2005</span><br/>
                <i> CCS UNIVERSITY (MEERUT LAJPAT RAI COLLEGE), Sahibabad, U.P.</i>
              </p>
            </div>
            <div className='sos-text mb-3 col-xl-4'>
              <p className="degree">
                <span className="fa fa-certificate"></span> 
                <strong> 12TH (Senior Secondary School)</strong>  <span className='year'>Year 2004</span><br/>
                <i> CBSE BOARD, DELHI</i>
              </p>
            </div>
            <div className='sos-text mb-3 col-xl-4'>
              <p className="degree">
                <span className="fa fa-certificate"></span> 
                <strong> 10TH (High School)</strong>  <span className='year'>Year 2002</span><br/>
                <i> CBSE BOARD, DELHI</i>
              </p>
            </div>
          </div>
        </Container>
      </div>
      <Footer />
    </div>
  )
}
