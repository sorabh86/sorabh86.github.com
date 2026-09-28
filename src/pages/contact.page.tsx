import { FormEvent, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelopeCircleCheck, faLocationPin, faPersonCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { Timestamp } from 'firebase/firestore';
import { Message } from '../types/default-type';
import sorabhStore from '../store/sorabh-store';
import FAQs from '../components/faqs';
import { softwareEngineerFacts } from '../constants/faqs.data';

const contactEmail = 'ssorabh.ssharma@gmail.com';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const sendContactEmail = async (message: Message) => {
  const response = await fetch(`https://formsubmit.co/ajax/${contactEmail}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      _subject: 'Contact Message',
      name: message.name,
      phone: message.phone,
      email: message.email,
      message: message.message,
    }),
  });

  const result = await response.json() as { success?: boolean | string };
  if (!response.ok || (result.success !== true && result.success !== 'true')) {
    throw new Error('Email delivery failed');
  }
};

const ContactPage = () => {

  const {sendMessage} = sorabhStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    e.preventDefault();
    setSuccess(false);
    setMessage(null);
    setIsSubmitting(true);

    try {
      const formData = new FormData(form);
      const submission: Message = {
        name: (formData.get('name') as string).trim(),
        phone: (formData.get('phone') as string).trim(),
        email: (formData.get('email') as string).trim(),
        message: (formData.get('message') as string).trim(),
        created: Timestamp.now(),
      };

      const [archiveResult, emailResult] = await Promise.allSettled([
        sendMessage(submission),
        sendContactEmail(submission),
      ]);
      const archived = archiveResult.status === 'fulfilled' && archiveResult.value.success;
      const emailed = emailResult.status === 'fulfilled';

      if (emailed && archived) {
        setSuccess(true);
        setMessage('Your message has been sent. Thanks for reaching out.');
        form.reset();
      } else if (emailed) {
        setSuccess(true);
        setMessage('Your email was sent, but we could not save an archive copy.');
        form.reset();
      } else if (archived) {
        setMessage(`Your message was saved, but email delivery failed. You can reach me directly at ${contactEmail}.`);
      } else {
        setMessage(`We could not send or save your message. Please email ${contactEmail} directly.`);
      }
    } catch {
      setMessage(`Something went wrong. Please email ${contactEmail} directly.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='contact-page page'>

      <div className="bg-white px-6 py-14 text-center">
        <motion.h1 className="mb-4 text-4xl font-bold text-orange-500"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}>
          Let's talk
        </motion.h1>
        <p className='text-lg text-gray-600'>Tell me what you are building, or just say hello.</p>
      </div>

      <div className="bg-gray-100 px-6 py-12">
        <div className="container mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-[1.2fr_0.8fr]">

          <motion.form initial="hidden" whileInView="visible"
            variants={fadeInUp} transition={{ duration: 0.6 }}
            onSubmit={handleSubmit} className="rounded-lg border border-gray-200 bg-white p-6 text-gray-900 shadow-sm sm:p-8">
            
            <h2 className="mb-6 text-2xl font-semibold">Send a message</h2>

            {message && <p role={success ? 'status' : 'alert'} aria-live="polite"
              className={`${success ? 'border-green-300 bg-green-50 text-green-800' :
                'border-red-300 bg-red-50 text-red-800'} mb-6 rounded-md border px-4 py-3 text-sm`}>
              {message}
            </p>}

            <div className="mb-4">
              <label htmlFor="contact-name" className="mb-2 block text-sm font-medium">Name</label>
              <input id="contact-name" name='name' type="text" autoComplete="name" maxLength={100} required
                className="w-full rounded-md border border-gray-300 bg-white p-3 text-gray-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200" />
            </div>

            <div className="mb-4">
              <label htmlFor="contact-phone" className="mb-2 block text-sm font-medium">Phone number</label>
              <input id="contact-phone" name="phone" type="tel" autoComplete="tel" maxLength={30} required
                className="w-full rounded-md border border-gray-300 bg-white p-3 text-gray-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200" />
            </div>

            <div className="mb-4">
              <label htmlFor="contact-email" className="mb-2 block text-sm font-medium">Email</label>
              <input id="contact-email" name='email' type="email" autoComplete="email" maxLength={254} required
                className="w-full rounded-md border border-gray-300 bg-white p-3 text-gray-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200" />
            </div>

            <div className="mb-4">
              <label htmlFor="contact-message" className="mb-2 block text-sm font-medium">Message</label>
              <textarea id="contact-message" name='message' required rows={5} maxLength={5000}
                className="w-full resize-y rounded-md border border-gray-300 bg-white p-3 text-gray-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"></textarea>
            </div>

            <button type="submit" disabled={isSubmitting}
              className="w-full cursor-pointer rounded-md bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 disabled:cursor-wait disabled:opacity-60">
              {isSubmitting ? 'Sending...' : 'Send message'}
            </button>
          </motion.form>

          <motion.div initial="hidden" whileInView="visible"
            variants={fadeInUp} transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center rounded-lg bg-[#212529] p-8 text-white sm:p-10">
            <div>
              <p className="mb-8 text-sm font-semibold uppercase text-orange-400">Contact details</p>
              <p className="mb-6 flex items-center gap-4 text-lg">
                <FontAwesomeIcon className='w-6 text-green-400' icon={faPersonCircleCheck} /> Sorabh86
              </p>
              <p className="mb-6 flex items-center gap-4 text-lg">
                <FontAwesomeIcon className='w-6 text-orange-400' icon={faLocationPin} /> New Delhi, India
              </p>
              <a href={`mailto:${contactEmail}`} className="flex items-center gap-4 break-all text-base text-gray-200 underline decoration-orange-400 underline-offset-4 hover:text-white">
                <FontAwesomeIcon className='w-6 shrink-0 text-orange-400' icon={faEnvelopeCircleCheck} /> {contactEmail}
              </a>
              <p className="mt-10 border-t border-white/15 pt-6 text-sm leading-6 text-gray-300">
                Share a few details and I’ll get back to you as soon as I can.
              </p>
            </div>
          </motion.div>

        </div>
      </div>

      <FAQs faqData={softwareEngineerFacts} />

    </div>
  );
};

export default ContactPage;
