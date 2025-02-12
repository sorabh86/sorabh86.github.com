import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCogs,
  faLayerGroup,
  faSync,
  faShieldAlt,
  faMobileAlt,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";

const CMSDevelopment = () => {
  return (
    <div className="so-cms bg-gray-50 py-12">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          🖥 CMS Development
        </h2>
        <p className="text-gray-600 text-lg mb-8">
          Develop and customize Content Management Systems (CMS) for seamless
          website management.
        </p>
      </div>

      <section className="bg-so-gray-dark py-16">
        <div className="container mx-auto px-6 ">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <FontAwesomeIcon icon={faCogs} className="text-4xl text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2"> Customizable </h3>
              <p className="text-gray-600"> Tailor-made CMS solutions to fit your unique business needs. </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <FontAwesomeIcon icon={faLayerGroup} className="text-4xl text-purple-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2"> Scalable </h3>
              <p className="text-gray-600"> Build CMS platforms that grow with your business. </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <FontAwesomeIcon icon={faSync} className="text-4xl text-green-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2"> Easy Updates </h3>
              <p className="text-gray-600"> Manage and update your website content effortlessly. </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 mt-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Key Features of Our CMS Development
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <FontAwesomeIcon
              icon={faShieldAlt}
              className="text-4xl text-blue-500 mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Secure & Reliable
            </h3>
            <p className="text-gray-600">
              Robust security features to protect your data and content.
            </p>
          </div>
          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <FontAwesomeIcon
              icon={faMobileAlt}
              className="text-4xl text-purple-500 mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Responsive Design
            </h3>
            <p className="text-gray-600">
              CMS platforms optimized for all devices and screen sizes.
            </p>
          </div>
          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <FontAwesomeIcon
              icon={faChartLine}
              className="text-4xl text-green-500 mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Analytics Integration
            </h3>
            <p className="text-gray-600">
              Track and analyze website performance with built-in analytics.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-6 mt-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Benefits of Custom CMS Development
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Benefit 1 */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 font-bold text-xl">1</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Full Control
            </h3>
            <p className="text-gray-600">
              Complete control over your website's content and functionality.
            </p>
          </div>
          {/* Benefit 2 */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-purple-600 font-bold text-xl">2</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Cost-Effective
            </h3>
            <p className="text-gray-600">
              Save costs with a CMS tailored to your specific needs.
            </p>
          </div>
          {/* Benefit 3 */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-green-600 font-bold text-xl">3</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Improved Efficiency
            </h3>
            <p className="text-gray-600">
              Streamline content management and reduce manual effort.
            </p>
          </div>
          {/* Benefit 4 */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-yellow-600 font-bold text-xl">4</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Future-Proof
            </h3>
            <p className="text-gray-600">
              Easily adapt and scale your CMS as your business evolves.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CMSDevelopment;