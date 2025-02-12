import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faHeartbeat,
  faUniversity,
  faCreditCard,
  faBuilding,
  faCar,
  faFilm,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

const industries = [
  { name: "E-Commerce", icon: faShoppingCart, color: "text-blue-500" },
  { name: "Healthcare", icon: faHeartbeat, color: "text-red-500" },
  { name: "FinTech", icon: faCreditCard, color: "text-green-500" },
  { name: "Education", icon: faUniversity, color: "text-purple-500" },
  { name: "Corporate", icon: faBuilding, color: "text-gray-700" },
  { name: "Automobile", icon: faCar, color: "text-orange-500" },
  { name: "Entertainment", icon: faFilm, color: "text-pink-500" },
  { name: "Social Networking", icon: faUsers, color: "text-teal-500" },
];

const Industries = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">🌍 Industries We Serve</h2>
        <p className="text-lg text-gray-600 mb-8">
          Empowering businesses across various industries with innovative web solutions.
        </p>

        {/* Industry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {industries.map((industry, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center"
            >
              <FontAwesomeIcon icon={industry.icon} className={`${industry.color} text-4xl mb-4`} />
              <h3 className="text-xl font-semibold text-gray-800">{industry.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Industries;
