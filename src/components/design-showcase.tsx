import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Project } from "../types/default";

interface Prop {
  showcaseItems:Project[]
}

const DesignShowcase = ({showcaseItems}:Prop) => {

  return (
    <div className="bg-gray-50 py-12">
      <section className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Design Showcase</h2>
        <p className="text-gray-600 text-lg mb-8">
          Explore our past work that highlights innovation and creativity.
        </p>
      </section>

      <section className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {showcaseItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <button className="text-blue-500 hover:text-blue-600 flex items-center">
                <span>View More</span>
                <FontAwesomeIcon icon={faEye} className="ml-2" />
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default DesignShowcase;