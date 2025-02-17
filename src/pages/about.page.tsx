// import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faSkype } from '@fortawesome/free-brands-svg-icons'
import { faCertificate, faCode, faEnvelope, faIdBadge, faLaptopCode, faPhoneSquare, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import sorabhStore, { getState } from '../store/sorabh-store'
import { Education, Experience } from '../types/default-type'

interface Props { }

function AboutPage({ }: Props) {
  const experiences = sorabhStore(state => state.experiences as Experience[]);

  const educationData = getState().educations as Education[];

  return (
    <div className="about-page page">

      <div className=" lg:px-20 py-12 bg-white text-center text-so-gray text-lg">
        <h2 className="text-3xl font-bold text-orange-500 mb-4">
          <FontAwesomeIcon icon={faIdBadge} /> About Me
        </h2>
        <p>Blending Development, Design & Innovation</p>
      </div>

      <section className="bg-gray-900 text-white py-10">
        <div className="container mx-auto px-6 lg:px-20">



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

    </div>
  )
}

export default AboutPage
