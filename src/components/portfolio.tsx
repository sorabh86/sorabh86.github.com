import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faStar } from "@fortawesome/free-solid-svg-icons";
import { Project } from "../types/default-type";

interface IProp {
  projects: Project[]
}

const Portfolio = ({projects}:IProp) => {

  return (
    <div className="bg-gray-50 py-12">
      {/* Introduction Section */}
      <section className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4"> Portfolio </h2>
        <p className="text-gray-600 text-lg mb-8">
          Showcasing our successful projects and the impact we've made for our clients.
        </p>
      </section>

      {/* Project Showcase Section */}
      <section className="container mx-auto px-6 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {project.category}
                  </span>
                  <div className="flex items-center">
                    {[...Array(project.rating)].map((_, i) => (
                      <FontAwesomeIcon
                        key={i}
                        icon={faStar}
                        className="text-yellow-400"
                      />
                    ))}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <button className="text-blue-500 hover:text-blue-600 flex items-center">
                  <span>View Project</span>
                  <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      
    </div>
  );
};

export default Portfolio;