import React, { FormEvent } from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode, faEnvelopeCircleCheck, faLocationPin, faMobile, faPersonCircleCheck, faRocket, faUsers } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};
const fadeInDown = {
  hidden: { opacity: 0, y: 0 },
  visible: { opacity: 1, y: 20 },
};

interface Props { }

function ContactPage({ }: Props) {

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const values = Object.fromEntries(formData.entries());
    console.log("Form submitted", values);
  };

  return (
    <div className='contact-page page'>
      <Header active='contact' />
      <div className="text-white py-12">
        <motion.h1
          initial="hidden"
          whileInView="visible"
          variants={fadeInDown}
          transition={{ duration: 0.6 }} 
          className="text-4xl font-bold text-center text-orange-400 mb-6">Contact Us</motion.h1>
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 px-6">

          <motion.form
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6 }} 
            onSubmit={(e) => handleSubmit(e)} className="p-6 rounded-lg shadow-lg">

            <div className="mb-4">
              <label className="block text-lg font-medium mb-2">Name</label>
              <input
                name='name'
                type="text"
                required
                className="w-full p-3 rounded-lg border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg font-medium mb-2">Phone No.</label>
              <input
                name="phone"
                type="text"
                required
                className="w-full p-3 rounded-lg border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg font-medium mb-2">Email</label>
              <input
                name='email'
                type="email"
                required
                className="w-full p-3 rounded-lg border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg font-medium mb-2">Message</label>
              <textarea
                name='message'
                required
                rows={5}
                className="w-full p-3 rounded-lg border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-orange-500 text-white font-semibold btn-orange"
            >
              Send
            </button>
          </motion.form>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col text-2xl items-center justify-center">
            <div className='bg-black px-10 py-8 rounded-2xl'>
              <p className="border-l-4 border-so-orange pl-4 mb-2"><FontAwesomeIcon className='text-green-500 w-10' icon={faPersonCircleCheck} /> Sorabh86</p>
              <p className="border-l-4 border-so-orange pl-4 mb-2"><FontAwesomeIcon className='text-so-orange w-10' icon={faLocationPin} /> New Delhi, India</p>
              <p className="border-l-4 border-so-orange pl-4 mb-2"><FontAwesomeIcon className='text-so-gray w-10' icon={faEnvelopeCircleCheck} /> example@email.com</p>
              <p className="border-l-4 border-so-orange pl-4 mb-2"><FontAwesomeIcon className='text-so-blue w-10' icon={faMobile} /> +91 12345 67890</p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            className="text-4xl font-bold text-gray-800 mb-6"
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            Why Choose Us?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <motion.div
              className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center"
              initial="hidden"
              whileInView="visible"
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <FontAwesomeIcon icon={faRocket} className="text-orange-500 text-5xl mb-4" />
              <h3 className="text-xl font-semibold text-gray-800">Innovative Solutions</h3>
              <p className="text-gray-600 mt-2">
                We deliver cutting-edge technology tailored to your needs.
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center"
              initial="hidden"
              whileInView="visible"
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <FontAwesomeIcon icon={faCode} className="text-blue-500 text-5xl mb-4" />
              <h3 className="text-xl font-semibold text-gray-800">Quality Development</h3>
              <p className="text-gray-600 mt-2">
                Clean, efficient, and scalable code to power your business.
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center"
              initial="hidden"
              whileInView="visible"
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <FontAwesomeIcon icon={faUsers} className="text-green-500 text-5xl mb-4" />
              <h3 className="text-xl font-semibold text-gray-800">Customer First</h3>
              <p className="text-gray-600 mt-2">
                Your satisfaction drives our success. We prioritize your needs.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Our Process Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            className="text-4xl font-bold text-gray-800 mb-6"
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            Our Process
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {/* Step 1 */}
            <motion.div
              className="p-6 border-l-4 border-orange-500 bg-gray-100 rounded-xl shadow-md"
              initial="hidden"
              whileInView="visible"
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold text-gray-800">Planning & Research</h3>
              <p className="text-gray-600 mt-2">
                Understanding your vision and mapping out the best strategy.
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              className="p-6 border-l-4 border-blue-500 bg-gray-100 rounded-xl shadow-md"
              initial="hidden"
              whileInView="visible"
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-lg font-semibold text-gray-800">Development</h3>
              <p className="text-gray-600 mt-2">
                Crafting a functional, scalable, and robust solution.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              className="p-6 border-l-4 border-green-500 bg-gray-100 rounded-xl shadow-md"
              initial="hidden"
              whileInView="visible"
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h3 className="text-lg font-semibold text-gray-800">Launch & Support</h3>
              <p className="text-gray-600 mt-2">
                Delivering, optimizing, and maintaining your project.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ContactPage
