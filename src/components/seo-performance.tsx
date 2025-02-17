import { faBolt, faChartLine, faMobileAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import React from 'react'

interface Props {}

function SeoPerformance(props: Props) {
  const {} = props

  return (
    <section className="container mx-auto px-6 mt-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">SEO & Performance</h2>
        <p className="text-gray-600 text-lg mb-8">
          Optimized for speed, responsiveness, and SEO rankings.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <FontAwesomeIcon icon={faChartLine} className="text-4xl text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">SEO-Friendly</h3>
            <p className="text-gray-600">Designed to boost search rankings and increase visibility.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <FontAwesomeIcon icon={faBolt} className="text-4xl text-purple-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Lightning Fast</h3>
            <p className="text-gray-600">Optimized for high-speed performance and quick loading times.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <FontAwesomeIcon icon={faMobileAlt} className="text-4xl text-green-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Mobile Optimized</h3>
            <p className="text-gray-600">Ensuring a seamless experience across all devices.</p>
          </div>
        </div>
      </section>
  )
}

export default SeoPerformance
