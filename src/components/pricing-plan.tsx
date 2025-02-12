import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faStar, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const PricingPlans = () => {
  const plans = [
    {
      id: 1,
      name: "Basic",
      price: "$19/mo",
      features: ["Responsive Design", "Basic SEO", "Email Support"],
      recommended: false,
    },
    {
      id: 2,
      name: "Standard",
      price: "$49/mo",
      features: ["Everything in Basic", "Advanced SEO", "Priority Support"],
      recommended: true,
    },
    {
      id: 3,
      name: "Premium",
      price: "$99/mo",
      features: ["Everything in Standard", "Custom Integrations", "24/7 Support"],
      recommended: false,
    },
  ];

  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">💰 Pricing Plans</h2>
        <p className="text-lg text-gray-600 mb-8">
          Flexible pricing tailored to your needs. Choose a plan that works for you.
        </p>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white p-6 rounded-lg shadow-lg border ${
                plan.recommended ? "border-blue-500" : "border-gray-200"
              } transition-shadow duration-300 hover:shadow-xl`}
            >
              {plan.recommended && (
                <div className="bg-blue-500 text-white text-sm font-semibold px-4 py-1 rounded-full inline-block mb-4">
                  <FontAwesomeIcon icon={faStar} className="mr-2" />
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-semibold text-gray-800">{plan.name}</h3>
              <p className="text-3xl font-bold text-blue-500 my-4">{plan.price}</p>
              <ul className="text-gray-600 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center justify-center mb-2">
                    <FontAwesomeIcon icon={faCheck} className="text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300">
                Choose Plan <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;
