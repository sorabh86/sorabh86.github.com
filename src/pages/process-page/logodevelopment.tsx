import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPalette,
  faLightbulb,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { logoData } from "../../constants/logo.data";

const LogoDevelopment = () => {
  const logos = logoData

  return (
    <div className="logo-design">
      <div className="bg-gray-50 py-10 text-center">

        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          🎨 Logo Development
        </h2>
        <p className="text-gray-600 text-lg">
          Create unique, professional, and memorable logos that define your
          brand identity.
        </p>
      </div>

      <section className="container mx-auto px-6 text-center py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <FontAwesomeIcon
              icon={faPalette}
              className="text-4xl text-blue-500 mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Creative Designs
            </h3>
            <p className="text-gray-600">
              Our designers craft logos that reflect your brand's personality and
              values.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <FontAwesomeIcon
              icon={faLightbulb}
              className="text-4xl text-yellow-500 mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Unique Concepts
            </h3>
            <p className="text-gray-600">
              We brainstorm unique ideas to ensure your logo stands out.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="text-4xl text-green-500 mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Professional Quality
            </h3>
            <p className="text-gray-600">
              High-quality logos designed to make a lasting impression.
            </p>
          </div>
        </div>
      </section>

      <div className="bg-gray-50 text-so-gray-dark py-10">

        <section className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Our Logo Design Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Discovery
              </h3>
              <p className="">
                We learn about your brand, goals, and target audience.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-yellow-600 font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Concept Design
              </h3>
              <p className="text-gray-600">
                Our team creates multiple logo concepts for your review.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Refinement
              </h3>
              <p className="text-gray-600">
                We refine the chosen concept based on your feedback.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 font-bold text-xl">4</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Delivery
              </h3>
              <p className="text-gray-600">
                You receive the final logo files in all required formats.
              </p>
            </div>
          </div>
        </section>
      </div>

      <section className="container mx-auto py-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          Our Portfolio
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {logos.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center">
              <img
                src={item.image}
                alt="Logo 1"
                className=" h-32 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600">
                {item.content}
              </p>
            </div>
          ))}

        </div>
      </section>
    </div>
  );
};

export default LogoDevelopment;