import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPencilRuler, faLaptopCode, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const DesignProcess = () => {
  const steps = [
    {
      id: 1,
      title: "Research & Planning",
      description: "Understanding client needs, analyzing competitors, and defining project goals.",
      icon: faSearch,
      color: "text-blue-500",
    },
    {
      id: 2,
      title: "Wireframing & Prototyping",
      description: "Creating visual concepts and interactive prototypes for better user experience.",
      icon: faPencilRuler,
      color: "text-purple-500",
    },
    {
      id: 3,
      title: "UI/UX Design & Development",
      description: "Designing and developing user-friendly, responsive, and modern interfaces.",
      icon: faLaptopCode,
      color: "text-green-500",
    },
    {
      id: 4,
      title: "Testing & Deployment",
      description: "Ensuring functionality, performance, and launching the website successfully.",
      icon: faCheckCircle,
      color: "text-yellow-500",
    },
  ];

  return (
    <div className="bg-gray-50 py-12">
      <section className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Design Process</h2>
        <p className="text-gray-600 text-lg mb-8">
          From research to prototyping, our streamlined process ensures the best results.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.id} className="bg-white p-6 rounded-lg shadow-lg text-center">
              <FontAwesomeIcon icon={step.icon} className={`text-4xl ${step.color} mb-4`} />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DesignProcess;
