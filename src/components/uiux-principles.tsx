import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCheck,
  faPaintBrush,
  faUniversalAccess,
  faLightbulb,
} from "@fortawesome/free-solid-svg-icons";

const UIUXPrinciples = () => {
  return (
    <div className="bg-gray-50 py-12">
      {/* Introduction Section */}
      <section className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          UI/UX Principles
        </h2>
        <p className="text-gray-600 text-lg mb-8">
          We focus on usability, aesthetics, and accessibility to create seamless
          and memorable user experiences.
        </p>
      </section>

      {/* Principles Section */}
      <section className="container mx-auto px-6 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Principle 1: Usability */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
            <FontAwesomeIcon
              icon={faUserCheck}
              className="text-4xl text-blue-500 mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Usability
            </h3>
            <p className="text-gray-600">
              Designing intuitive and user-friendly interfaces that are easy to
              navigate and understand.
            </p>
          </div>

          {/* Principle 2: Aesthetics */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
            <FontAwesomeIcon
              icon={faPaintBrush}
              className="text-4xl text-purple-500 mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Aesthetics
            </h3>
            <p className="text-gray-600">
              Creating visually appealing designs that align with your brand and
              engage users.
            </p>
          </div>

          {/* Principle 3: Accessibility */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
            <FontAwesomeIcon
              icon={faUniversalAccess}
              className="text-4xl text-green-500 mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Accessibility
            </h3>
            <p className="text-gray-600">
              Ensuring designs are inclusive and accessible to all users,
              including those with disabilities.
            </p>
          </div>

          {/* Principle 4: Innovation */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
            <FontAwesomeIcon
              icon={faLightbulb}
              className="text-4xl text-yellow-500 mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Innovation
            </h3>
            <p className="text-gray-600">
              Leveraging the latest trends and technologies to create cutting-edge
              user experiences.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UIUXPrinciples;