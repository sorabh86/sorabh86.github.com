import React from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faSkype } from '@fortawesome/free-brands-svg-icons'
import { faCertificate, faCode, faEnvelope, faIdBadge, faLaptopCode, faPhoneSquare, faUserCircle } from '@fortawesome/free-solid-svg-icons'

interface Props { }

function AboutPage({}: Props) {
  const experiences = [
    {
      title: "Web Developer",
      company: "Self Employed Freelancer",
      period: "July 2019 - Present",
      details: [
        "Worked on various online sites, seeking new projects to work.",
        "Developed & defined SDLC workflow, ER Diagram, DFD, Mockups.",
        "Developed custom product designing software in HTML5, REST services.",
        "Backend programming in PHP, database management.",
        "MEAN & LAMP Stack Development.",
        "Explored Docker for microservices using AWS, Azure, Google Cloud.",
        "Learning new technologies, game development for logic building.",
      ],
    },
    {
      title: "App-Team Lead",
      company: "WebEsperto | Exabyte Informatics Pvt Ltd",
      period: "June 2013 - July 2019",
      details: [
        "Guided team members to ensure timely project delivery.",
        "Full-stack development, following SDLC best practices.",
        "Frontend development using AngularJS, jQuery, HTML5, CSS3.",
        "Designed and developed WordPress plugins & themes.",
        "Animated UI/UX elements using JavaScript, jQuery, CSS3.",
        "Developed custom modules & themes for WordPress, OpenCart, Magento 1.x.",
        "Worked on various e-commerce projects.",
      ],
    },
    {
      title: "Senior Developer",
      company: "Logic IT Solution Pvt Ltd",
      period: "December 2011 - November 2012",
      details: [
        "Prepared online 3D image rendering engine (POV-Ray), exported models via Blender.",
        "Developed an online product designer for items like cups, T-shirts.",
        "Integrated with PHP frameworks, managed database structure & REST APIs.",
        "Developed reusable OOP components & ActionScript APIs.",
      ],
    },
    {
      title: "Senior Flex Developer",
      company: "Sparx IT Solutions Pvt Ltd",
      period: "March 2010 - December 2011",
      details: [
        "Developed object-oriented rich applications in ActionScript 3.0 & Flex.",
        "Wrote user manuals and documentation.",
        "Problem-solved and upgraded existing applications.",
        "Developed Flash-based web games for in-house projects.",
        "Built reusable ActionScript components for secure file uploads & more.",
      ],
    },
  ];

  const educationData = [
    {
      degree: "MCA (Master Of Computer Application)",
      year: "2022",
      institute: "IGNOU (Universal Institute of Computer & Technology), Sector 62, Noida",
    },
    {
      degree: "PGDCA (Post Graduate Diploma in Computer Application)",
      year: "2019",
      institute: "IGNOU (Universal Institute of Computer & Technology), Sector 62, Noida",
    },
    {
      degree: "CWDD (Certification in Web Design & Development)",
      year: "2010",
      institute: "UNIQUE COMPUTER CENTER, Seelampur, Delhi",
    },
    {
      degree: "B.A. (Bachelor in Arts)",
      year: "2007",
      institute: "CCS University (Meerut Lajpat Rai College), Sahibabad, U.P.",
    },
    {
      degree: "DCA (Diploma in Computer Application)",
      year: "2005",
      institute: "CCS University (Meerut Lajpat Rai College), Sahibabad, U.P.",
    },
    {
      degree: "12TH (Senior Secondary School)",
      year: "2004",
      institute: "CBSE Board, Delhi",
    },
    {
      degree: "10TH (High School)",
      year: "2002",
      institute: "CBSE Board, Delhi",
    },
  ];

  return (
    <div className="about-page page">
      <Header active='about' />

      <section className="bg-gray-900 text-white py-10">
        <div className="container mx-auto px-6 lg:px-20">

          <h2 className="text-center text-3xl font-bold text-orange-500 flex items-center justify-center gap-2 mb-10">
            <FontAwesomeIcon icon={faIdBadge} /> About Me
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="flex justify-center">
              <img
                src="/sorabh-profile.jpg"
                alt="Sorabh"
                className="rounded-lg w-full max-w-100 shadow-lg border-4 border-gray-700"
              />
            </div>

            <div className="lg:col-span-2">
              <h3 className="text-xl font-semibold mb-3">
                <a href="https://github.com/sorabh86" className="btn-so-link"> <FontAwesomeIcon icon={faGithub} /> sorabh86 </a>
              </h3>
              <p className="text-lg leading-relaxed mb-4">
                <span className='text-sm'>At your service</span> <br />
                <span className="text-emerald-300 italic font-thin text-2xl block">Software Engineer</span> <br />
                We help clients understand the full <span className="text-amber-300">System Development Life Cycle (SDLC)</span> and guide them through feature development.
              </p>
              <p className="text-gray-300 mb-4">
                Simple websites are no longer enough! Clients expect <span className="text-amber-300">better and best</span> solutions. We specialize in <span className="text-amber-300">creating unforgettable brand experiences</span> that balance users, business, and technology.
              </p>

              <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
                <li>Software Developer with over <span className="text-amber-300">10 years</span> of experience.</li>
                <li>Passionate about designing and crafting efficient modern software.</li>
                <li>Always eager to learn <span className="text-amber-300">new technologies</span> and tools.</li>
              </ul>

              <div className="flex flex-wrap gap-4 text-orange-400">
                <a href="tel:919891464750" className="btn-so-link">
                  <FontAwesomeIcon icon={faPhoneSquare} /> 9891464750
                </a>
                <a href="tel:919891464750" className="btn-so-link">
                  <FontAwesomeIcon icon={faPhoneSquare} /> 7838138004
                </a>
                <a href="skype:ssorabh.ssharma?call" className="btn-so-link">
                  <FontAwesomeIcon icon={faSkype} /> Talk on Skype
                </a>
                <a href="mailto:ssorabh.ssharma@hotmail.com" className="btn-so-link">
                  <FontAwesomeIcon icon={faEnvelope} /> Send Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white text-so-gray-dark py-10">
        <div className="container mx-auto px-6 lg:px-20">
          <h2 className="text-center text-3xl font-bold text-orange-500 flex items-center justify-center gap-2 mb-6"> Expertise </h2>

          <div className="space-y-6">
            {/* Languages */}
            <div className='so-languages'>
              <h3 className="text-xl font-semibold text-orange-400 flex items-center gap-2 mb-3">
                <FontAwesomeIcon icon={faCode} /> Languages
              </h3>
              <p className='mb-4'>
                <strong>Proficient in:</strong> HTML, CSS, JavaScript (Vanilla, ES5, ES6, Babel), TypeScript, Bash, PHP, SQL, XML, JSON, Java, Python, C#, C, C++.
              </p>
              <p>
                <strong>Familiar with:</strong> Object Oriented Programming, OOJS, MVC, Web Services, REST API, Sockets, Spring Boot, WordPress, CodeIgniter, Angular/AngularJS, ReactJS, VueJS, Node.js, Express, Canvas, jQuery, Three.js, Bootstrap, Foundation, Unity3D, Godot.
              </p>
            </div>

            <div className='so-software-tools'>
              <h3 className="text-xl font-semibold text-orange-400 flex items-center gap-2 mb-3">
                <FontAwesomeIcon icon={faLaptopCode} /> Softwares & Tools
              </h3>
              <p className="mb-2"><strong>Server:</strong> Apache2, Nginx, Node.js, AWS, Apache Tomcat.</p>
              <p className="mb-2"><strong>Database:</strong> MySQL, MariaDB, MongoDB, SQLite.</p>
              <p className="mb-2">
                <strong>Software:</strong> Docker, Container, VSCode, Sublime Text, Git Bash, Adobe Photoshop (alt: GIMP), Adobe Illustrator (alt: Inkscape), Blender, Microsoft Office (alt: LibreOffice), Greenshot, Dia Diagram, Eclipse, NetBeans, STS4, IntelliJ, Kdenlive, Natron, Figma, OBS Studio.
              </p>
              <p className="mb-2"><strong>Platforms:</strong> Microsoft Windows (All Versions), Linux (Ubuntu | All Debian Distributions).</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-so-gray-light text-so-gray-dark py-10 border-t-1 border-so-gray">
        <div className="container mx-auto px-6 lg:px-20">
          <h2 className="text-center text-3xl font-bold text-orange-500 flex items-center justify-center gap-2 mb-6"> Experience </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {experiences.map((exp, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
                <h3 className="text-xl font-semibold text-orange-400 flex items-center gap-2 mb-2">
                  <FontAwesomeIcon icon={faUserCircle} /> {exp.title}
                  <small className="text-gray-400 italic">({exp.period})</small>
                </h3>
                <p className="text-lg font-semibold">{exp.company}</p>
                <ul className="mt-3 space-y-2">
                  {exp.details.map((detail, i) => (
                    <li key={i} className="border-l-4 border-orange-500 pl-3">{detail}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white text-so-gray-dark py-10 border-t-1 border-gray">
        <div className="container mx-auto px-6 lg:px-20">
          <h2 className="text-center text-3xl font-bold text-orange-500 flex items-center justify-center gap-2 mb-6"> Education </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {educationData.map((edu, index) => (
              <div key={index} className="p-5 border-1 border-so-gray-light rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                <h3 className="text-lg font-semibold text-orange-400 flex items-center gap-2 mb-2">
                  <FontAwesomeIcon icon={faCertificate} /> {edu.degree}
                </h3>
                <p className="font-medium">{edu.year}</p>
                <p className="text-sm italic">{edu.institute}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default AboutPage
