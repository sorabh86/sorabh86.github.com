// import React from 'react'
import { fa1, fa2, fa3, fa4, fa5, fa6, fa7, faCheck, faHandshake, faPhone, faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router'

interface Props { }

function Fullstack({}: Props) {

  return (
    <div className="fullstack slogan text-so-gray-light lg:mx-10 sm:mx-4 mb-10">
      <div className='slogan-head text-so-blue mb-6'>
        <h2 className="slogan-heading sos-text">Full Stack Developer</h2>
      </div>
      <div className='grid grid-cols-12 gap-4 p-4 pb-1'>
        <div className='lg:col-span-4 md:col-span-full sm:col-span-full col-span-full border-1 border-so-gray p-4 rounded-2xl text-lg font-thin'>
          <h3 className='text-amber mt-4 mb-5 text-3xl pb-2 text-amber-300 text-shadow-white text-center'>Who is a <span className="whitespace-nowrap"><FontAwesomeIcon className='text-2xl relative top-[-10px] text-so-gray-light  pr-1' icon={faQuoteLeft} />Full</span> Stack <span className="whitespace-nowrap">Developer<FontAwesomeIcon className=' relative top-[-10px] pl-1 pr-2 text-2xl text-so-gray-light' icon={faQuoteRight} />?</span></h3>
          <p>Professional skilled in both frontend and backend technologies, capable of developing complete web applications from start to finish. They handle everything from UI/UX design to database management, ensuring seamless functionality and performance.</p>
          <p>Full Stack Developers work with various tech stacks, including:</p>
          <ul className='flex flex-col gap-1 list-disc ml-4 mb-5'>
            <li><span className="text-amber-300">Frontend:</span> HTML, CSS, JavaScript (React, Angular, Vue)</li>
            <li><span className="text-amber-300">Backend:</span> Node.js, Express, Wordpress, Codeigniter, Laravel, Django, Flask, Spring Boot</li>
            <li><span className="text-amber-300">Databases:</span> MySQL, PostgreSQL, MongoDB, Firebase</li>
            <li><span className="text-amber-300">Version Control:</span> Git, GitHub, GitLab</li>
            <li><span className="text-amber-300">DevOps & Deployment:</span> Docker, Kubernetes, AWS, CI/CD</li>
          </ul>
        </div>
        <div className='lg:col-span-8 md:col-span-full col-span-full'>
          <h3 className='text-center text-amber-300 text-3xl mt-4 mb-6'>Key Stages of Full Stack Development</h3>
          <ol className='stages'>
            <li className='stages-item'>
              <FontAwesomeIcon className='bg-so-gray text-3xl rounded-2xl px-7 py-5' icon={fa1} />
              <div>
                <h4 className='text-blue text-amber-300 pb-2 font-thin  tracking-widest'>Requirement Gathering & Analysis</h4>
                <ul className='list-disc ml-5'>
                  <li>Understand client needs and define functional requirements.</li>
                  <li>Choose the right technology stack based on project goals.</li>
                </ul>
              </div>
            </li>
            <li className='stages-item'>
              <FontAwesomeIcon className='bg-so-gray text-3xl rounded-2xl px-7 py-5' icon={fa2} />
              <div>
                <h4 className='text-blue text-amber-300 pb-2 font-thin  tracking-widest'>Frontend Development</h4>
                <ul className='list-disc ml-5'>
                  <li>Create user-friendly UI/UX using HTML, CSS, JavaScript.</li>
                  <li>Implement interactive features using frameworks like React, Angular, or Vue.</li>
                  <li>Ensure responsiveness and cross-browser compatibility.</li>
                </ul>
              </div>
            </li>
            <li className='stages-item'>
              <FontAwesomeIcon className='bg-so-gray text-3xl rounded-2xl px-7 py-5' icon={fa3} />
              <div>
                <h4 className='text-blue text-amber-300 pb-2 font-thin  tracking-widest'>Backend Development</h4>
                <ul className='list-disc ml-5'>
                  <li>Develop APIs and business logic using Node.js, Django, Flask, or Spring Boot.</li>
                  <li>Implement authentication, authorization, and security best practices.</li>
                  <li>Optimize server-side performance for scalability.</li>
                </ul>
              </div>
            </li>
            <li className='stages-item'>
              <FontAwesomeIcon className='bg-so-gray text-3xl rounded-2xl px-7 py-5' icon={fa4} />
              <div>
                <h4 className='text-blue text-amber-300 pb-2 font-thin  tracking-widest'>Database Management</h4>
                <ul className='list-disc ml-5'>
                  <li>Design and implement relational (MySQL, PostgreSQL) or NoSQL (MongoDB, Firebase) databases.</li>
                  <li>Ensure efficient data storage, retrieval, and security.</li>
                </ul>
              </div>
            </li>
            <li className='stages-item'>
              <FontAwesomeIcon className='bg-so-gray text-3xl rounded-2xl px-7 py-5' icon={fa5} />
              <div>
                <h4 className='text-blue text-amber-300 pb-2 font-thin  tracking-widest'>Integration & Testing</h4>
                <ul className='list-disc ml-5'>
                  <li>Connect frontend and backend through RESTful APIs or GraphQL.</li>
                  <li>Write and execute unit, integration, and end-to-end tests.</li>
                  <li>Debug and fix issues before deployment.</li>
                </ul>
              </div>
            </li>
            <li className='stages-item'>
              <FontAwesomeIcon className='bg-so-gray text-3xl rounded-2xl px-7 py-5' icon={fa6} />
              <div>
                <h4 className='text-blue text-amber-300 pb-2 font-thin  tracking-widest'>Deployment & DevOps</h4>
                <ul className='list-disc ml-5'>
                  <li>Deploy applications using Docker, Kubernetes, AWS, or Vercel/Netlify.</li>
                  <li>Implement CI/CD pipelines for smooth updates and scalability.</li>
                </ul>
              </div>
            </li>
            <li className='stages-item'>
              <FontAwesomeIcon className='bg-so-gray text-3xl rounded-2xl px-7 py-5' icon={fa7} />
              <div>
                <h4 className='text-blue text-amber-300 pb-2 tracking-widest'>Maintenance & Optimization</h4>
                <ul className='list-disc ml-5'>
                  <li>Monitor performance and fix bugs for smooth user experience.</li>
                  <li>Regularly update security patches and improve application efficiency.</li>
                </ul>
              </div>
            </li>
          </ol>
        </div>
      </div>
      <div className='flex flex-col md:flex-row mt-10 gap-4 justify-center text-white items-center'>
        <p className='flex flex-col justify-start my-5 px-4 text-2xl font-thin'>
          <span className='mb-2'>
            <FontAwesomeIcon className='text-green-500 text-3xl mr-5' icon={faCheck} /> Have a project idea? 
          </span>
          <span className=' mb-2'>
            <FontAwesomeIcon className='text-green-500 text-3xl mr-5' icon={faCheck} />Need a skilled Full Stack Developer?<br /> 
          </span>
          <span className='pt-3 '>
            <FontAwesomeIcon className='text-amber-300 text-3xl mr-5' icon={faPhone} /><span className="font-bold italic">Reach out today!</span>
          </span>
        </p>
        <Link to="/contact" className="btn-blue w-fit flex justify-center items-center font-black">
          <FontAwesomeIcon className='pr-2 text-3xl' icon={faHandshake} /> Contact Us
        </Link>
      </div>
    </div>
  )
}

export default Fullstack
