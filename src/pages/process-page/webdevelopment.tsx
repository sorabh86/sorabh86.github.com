import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode,
  faDatabase,
  faCloud,
  faClipboardList
} from "@fortawesome/free-solid-svg-icons";
import ClientTestimonials from "../../components/client-testimonials";
import Portfolio from "../../components/portfolio";
import PricingPlans from "../../components/pricing-plan";
import FAQs from "../../components/faqs";
import Industries from "../../components/industries";

const WebDevelopment = () => {
  return (
    <div className="bg-gray-50 py-12">
      <section className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">💻 Website Development</h2>
        <p className="text-gray-600 text-lg mb-8">
          Build robust, scalable, and high-performance web applications that enhance business efficiency.
        </p>
      </section>

      <section className=" bg-so-gray-dark py-16">
        <div className="container mx-auto px-6 ">

          <h2 className="text-3xl font-bold text-center mb-8">Technology Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center bg-white p-6 rounded-full">
              <FontAwesomeIcon icon={faCode} className="text-4xl text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Frontend</h3>
              <p className="text-gray-600 pl-4 border-l-4 border-so-orange mb-2">React/Next</p>
              <p className="text-gray-600 pl-4 border-l-4 border-so-orange mb-2">HTML/CSS</p>
            </div>
            <div className="flex flex-col items-center bg-white p-6 rounded-full">
              <FontAwesomeIcon icon={faDatabase} className="text-4xl text-purple-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Backend</h3>
              <p className="text-gray-600 pl-4 border-l-4 border-so-orange mb-2">Node.js/Express</p>
              <p className="text-gray-600 pl-4 border-l-4 border-so-orange mb-2">PHP/MySQL</p>
            </div>
            <div className="flex flex-col items-center bg-white p-6 rounded-full">
              <FontAwesomeIcon icon={faCloud} className="text-4xl text-green-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Cloud</h3>
              <p className="text-gray-600 pl-4 border-l-4 border-so-orange mb-2">AWS/Firebase</p>
              <p className="text-gray-600 pl-4 border-l-4 border-so-orange mb-2">Apache/Ngnix</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 mt-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Development Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {['Planning', 'Design', 'Development', 'Testing', 'Deployment', 'Maintenance'].map((step, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <FontAwesomeIcon icon={faClipboardList} className="text-4xl text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{step}</h3>
              <p className="text-gray-600">Detailed explanation of {step} phase.</p>
            </div>
          ))}
        </div>
      </section>

      <ClientTestimonials />

      <Portfolio />

      <Industries />

      <PricingPlans />

      <FAQs />

      <section className="container mx-auto px-6 text-center border-t-1 border-so-gray-light pt-10">
        <h3 className="text-2xl font-bold text-gray-900 mb-4"> Ready to Start Your Project? </h3>
        <p className="text-gray-600 mb-6"> Let's create something amazing together. Contact us today! </p>
        <button className="btn-blue">
          Get in Touch
        </button>
      </section>
    </div>
  );
};

export default WebDevelopment;
