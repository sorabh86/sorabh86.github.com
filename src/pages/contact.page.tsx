import { FormEvent, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelopeCircleCheck, faLocationPin, faMobile, faPersonCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { Timestamp } from 'firebase/firestore';
import { Message } from '../types/default-type';
import sorabhStore from '../store/sorabh-store';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};


const ContactPage = () => {

  const {isLoading, sendMessage, setLoading} = sorabhStore();
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    setSuccess(false);
    setMessage('');

    const formData = new FormData(e.target as HTMLFormElement);
    const message: Message = {
      name: formData.get('name') as string,
      phone: formData.get('phone') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
      created: Timestamp.now()
    };

    const res = await sendMessage(message);
    
    setSuccess(res.success);
    if(!res.success) {
      setMessage('Failed to send message. Please try again.');
    } else {
      (e.target as HTMLFormElement).reset();
      setMessage('Message sent successfully!');
    }

    setLoading(false);
  };

  return (
    <div className='contact-page page'>

      <div className="py-12 bg-white text-center">
        <motion.h1 className="text-4xl font-bold text-orange-400 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}>
          Contact Us
        </motion.h1>
        <p className='text-gray-600 text-lg'>Have a Project? Let’s Talk!</p>
      </div>

      <div className="text-white py-12">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 px-6">

          <motion.form initial="hidden" whileInView="visible"
            variants={fadeInUp} transition={{ duration: 0.6 }}
            onSubmit={handleSubmit} className="p-6 rounded-lg shadow-lg">
            
            {message && <p className={`${success ? 'bg-green-100 border border-green-400 text-green-700' :
                'bg-red-100 border border-red-400 text-red-700'} px-6 py-4 rounded-lg mb-4`}>{message}</p>}

            <div className="mb-4">
              <label className="block text-xs font-medium mb-2">Name</label>
              <input name='name' type="text" required
                className="w-full p-3 rounded-lg border border-gray-600 text-white bg-black focus:outline-none focus:ring-2 focus:ring-orange-400" />
            </div>

            <div className="mb-4">
              <label className="block text-xs font-medium mb-2">Phone No.</label>
              <input name="phone" type="text" required
                className="w-full p-3 rounded-lg border border-gray-600 text-white bg-black focus:outline-none focus:ring-2 focus:ring-orange-400" />
            </div>

            <div className="mb-4">
              <label className="block text-xs font-medium mb-2">Email</label>
              <input name='email' type="email" required
                className="w-full p-3 rounded-lg border border-gray-600 text-white bg-black focus:outline-none focus:ring-2 focus:ring-orange-400" />
            </div>

            <div className="mb-4">
              <label className="block text-xs font-medium mb-2">Message</label>
              <textarea name='message' required rows={5}
                className="w-full p-3 rounded-lg border border-gray-600 text-white bg-black focus:outline-none focus:ring-2 focus:ring-orange-400"></textarea>
            </div>

            <button type="submit" disabled={isLoading}
              className={`bg-orange-500 cursor-pointer rounded-lg w-full py-3 text-white font-semibold`}>
              {isLoading ? 'Sending...' : 'Send'}
            </button>
          </motion.form>

          <motion.div initial="hidden" whileInView="visible"
            variants={fadeInUp} transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col text-2xl items-center justify-center">
            <div className='bg-black px-10 py-8 rounded-2xl'>
              <p className="border-l-4 border-orange-500 pl-4 mb-2">
                <FontAwesomeIcon className='text-green-500 w-10' icon={faPersonCircleCheck} /> Sorabh86
              </p>
              <p className="border-l-4 border-orange-500 pl-4 mb-2">
                <FontAwesomeIcon className='text-orange-500 w-10' icon={faLocationPin} /> New Delhi, India
              </p>
              <p className="border-l-4 border-orange-500 pl-4 mb-2">
                <FontAwesomeIcon className='text-gray-500 w-10' icon={faEnvelopeCircleCheck} /> example@email.com
              </p>
              <p className="border-l-4 border-orange-500 pl-4 mb-2">
                <FontAwesomeIcon className='text-blue-500 w-10' icon={faMobile} /> +91 12345 67890
              </p>
            </div>
          </motion.div>

        </div>
      </div>

    </div>
  );
};

export default ContactPage;
