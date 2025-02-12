import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router'

const tools = [
  {
    category: "Design",
    items: ["Vector", "Banner", "Logo", "Mockup", "PSD", "HTML", "CSS", "SVG", "Icons", "Games"]
  },
  {
    category: "Website",
    items: ["Static", "Dynamic", "CMS", "Blog", "Portfolio", "Ecommerce", "Hospital", "Real Estate", "Society", "Micro Services", "REST API", "Docker"]
  },
  {
    category: "Languages",
    items: ["Core PHP", "WordPress", "AngularJS", "React", "SQL", "NodeJS", "Java", "Spring", "JavaScript", "jQuery"]
  },
  {
    category: "Databases",
    items: ["MariaDB", "MySQL", "SQLite", "PostgreSQL", "Firebase", "MSSQL", "MongoDB", "Oracle"]
  }
];

interface Props { }

function Aboutme({ }: Props) {

  return (
    <div className="aboutme my-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-center">
        <article className="p-6 text-white flex flex-col items-center">
          <h2 className="text-center text-3xl font-bold text-orange-500 py-14">About Me</h2>
          <div className="flex flex-row flex-wrap gap-8">

            <div className="grow">
              <img src="/sorabh-profile.jpg" alt="Sorabh" className="rounded-lg w-fit shadow-lg border-4 border-gray-700" />
            </div>

            <div className="text-so-gray-light">
              <h5 className="pb-3 text-xl">
                <a className="text-orange-500 hover:text-white transition-colors duration-500 flex items-center gap-2" href="https://github.com/sorabh86" target='_blank' > <FontAwesomeIcon icon={faGithub} /> sorabh86 </a>
              </h5>
              <p className="pb-3 font-thin">
                <span className="text-md">At your service</span>,<br /> <span className='text-2xl py-4 block italic text-blue-300'>Software Engineer!</span>
              </p>
              <p className="pb-3">We empower clients with SDLC knowledge, ensuring they actively contribute and help shape the best features for their projects.</p>

              <p className="pb-3">Simple websites are history. Today, businesses need innovation, efficiency, and seamless experiences and we deliver!</p>

              {/* <p className="pb-5">We specialize in crafting unforgettable digital experiences. Our passion lies in designing and building solutions that strike the perfect balance between users, business goals, and technology, delivering performance-driven and scalable applications.</p> */}

              <p className="pb-6 text-amber-300">Let’s build something extraordinary together! </p>
              <Link className="block btn-orange w-fit" to="/about"> Read More... </Link>
            </div>
          </div>
        </article>

        <article className="p-6 bg-white text-gray-900 rounded-l-4xl ml-10">
          <h2 className="text-center text-3xl font-bold text-so-blue py-4 place-self-auto ">Expertise</h2>
          <div className="flex flex-wrap justify-center">
            {tools.map((tool, index) => (
              <div key={index} className="p-4 rounded-2xl text-black">
                <h3 className="text-md font-semibold border-y-1 border-so-blue py-2 text-center text-so-blue mb-4">{tool.category}</h3>
                <ul className="list-inside">
                  {tool.items.map((item, i) => (
                    <li key={i} className="hover:text-blue-500 mx-4 py-2 transition-colors duration-500 cursor-pointer">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className='flex flex-col'>
              <strong className="block self-stretch text-amber-300 bg-so-black-8 py-8 rounded-b-full mb-4 shadow-md shadow-so-orange">DESIGN</strong>
              {designs.map((item) => (
                <a key={item} href="#" className="block self-stretch text-so-orange px-6 py-2 hover:bg-so-gray-dark hover:text-white transition-all duration-500">{item}</a>
              ))}
            </div>

            <div className='flex flex-col'>
              <strong className="block self-stretch text-amber-300 bg-so-black-8 py-8 rounded-b-full mb-4 shadow-md shadow-so-orange">WEBSITES</strong>
              {websites.map((item) => (
                <a key={item} href="#" className="block self-stretch text-so-orange px-6 py-2 hover:bg-so-gray-dark hover:text-white transition-all duration-500">{item}</a>
              ))}
            </div>

            <div className='flex flex-col'>
              <strong className="block self-stretch text-amber-300 bg-so-black-8 py-8 rounded-b-full mb-4 shadow-md shadow-so-orange">LANGUAGES</strong>
              {languages.map((item) => (
                <a key={item} href="#" className="block self-stretch text-so-orange px-6 py-2 hover:bg-so-gray-dark hover:text-white transition-all duration-500">{item}</a>
              ))}
            </div>

            <div className='flex flex-col'>
              <strong className="block self-stretch text-amber-300 bg-so-black-8 py-8 rounded-b-full mb-4 shadow-md shadow-so-orange">DATABASES</strong>
              {databases.map((item) => (
                <a key={item} href="#" className="block self-stretch text-so-orange px-6 py-2 hover:bg-so-gray-dark hover:text-white transition-all duration-500">{item}</a>
              ))}
            </div>

          </div> */}
        </article>

      </div>
    </div>
  )
}

export default Aboutme
