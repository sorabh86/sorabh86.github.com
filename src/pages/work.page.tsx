import /* React, */ { useState } from 'react'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { getState } from '../store/sorabh-store'
import { Project, ProjectCategory } from '../types/default-type'

interface Props { }

function WorkPage({ }: Props) {
  const projects = getState().projects as Project[];
  const categories = getState().prod_cat as ProjectCategory[];

  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter((proj) => proj.category === activeCategory);

  return (
    <div className="work-page page">

      <div className="bg-gray-50 py-12 text-center">
        <motion.h1
          className="text-4xl font-bold text-orange-400 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          My Works
        </motion.h1>
        <p className="text-gray-600 text-lg">Crafting Excellence Through Creativity</p>
      </div>

      <div className="container mx-auto text-center py-12">
        {/* Category Filters */}
        <div className="flex justify-center space-x-4 mb-8">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${activeCategory === category.title
                  ? "bg-orange-500 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              onClick={() => setActiveCategory(category.title)}
            >
              {category.title}
            </button>
          ))}
        </div>

        {/* Project Showcase */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredProjects.length > 0 ? (
            filteredProjects.map((work) => (
              <motion.div
                key={work.id}
                className="bg-gray-900 text-white p-4 rounded-lg shadow-lg transition transform hover:scale-105"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="h-40 bg-gray-700 rounded-lg mb-4 flex items-center justify-center">
                  <img src={work.image} />
                </div>
                <h3 className="text-xl font-semibold">{work.title}</h3>
                <p className="text-gray-400 text-sm">{work.category} Project</p>
                <div className="mt-3 flex space-x-3">
                  {work.github && (
                    <a href={work.github} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
                      <FontAwesomeIcon icon={faGithub} className="text-xl" />
                    </a>
                  )}
                  <a href={work.live} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-600">
                    <FontAwesomeIcon icon={faExternalLinkAlt} className="text-xl" />
                  </a>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500">No projects available in this category.</p>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default WorkPage
