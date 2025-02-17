import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCogs,
  faChartLine,
  faImages,
  faTools,
  faSearch,
  faClipboardList,
  faPhoneVolume,
} from "@fortawesome/free-solid-svg-icons";
import DesignProcess from "../../components/design-process";
import UIUXPrinciples from "../../components/uiux-principles";
import DesignShowcase from "../../components/design-showcase";
import SeoPerformance from "../../components/seo-performance";
import ToolList from "../../components/tool-list";
import { Project } from "../../types/default-type";
import { getState } from "../../store/sorabh-store";

const WebsiteDesign = () => {
  const projects = getState().projects as Project[];

  return (
    <div className="bg-gray-50 py-12">
      <section className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">🎨 Website Designing</h2>
        <p className="text-gray-600 text-lg mb-8">
          Create stunning, user-friendly, and high-performing website designs that enhance your brand presence.
        </p>
      </section>
      
      <section className="bg-so-gray-dark py-16">
        <div className="container mx-auto px-6 ">

          <h2 className="text-3xl font-bold text-center mb-8">Design Approach</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex flex-col items-center bg-white p-6 rounded-full">
              <FontAwesomeIcon icon={faCogs} className="text-4xl text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Design Process</h3>
              <p className="text-gray-600">Research to prototyping</p>
            </div>
            <div className="flex flex-col items-center bg-white p-6 rounded-full">
              <FontAwesomeIcon icon={faChartLine} className="text-4xl text-purple-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">UI/UX Principles</h3>
              <p className="text-gray-600">Seamless experiences.</p>
            </div>
            <div className="flex flex-col items-center bg-white p-6 rounded-full">
              <FontAwesomeIcon icon={faImages} className="text-4xl text-green-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Design Showcase</h3>
              <p className="text-gray-600">Innovation and creativity.</p>
            </div>
            <div className="flex flex-col items-center bg-white p-6 rounded-full">
              <FontAwesomeIcon icon={faTools} className="text-4xl text-orange-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Tools & Technologies</h3>
              <p className="text-gray-600">Industry-leading tools.</p>
            </div>
            <div className="flex flex-col items-center bg-white p-6 rounded-full">
              <FontAwesomeIcon icon={faSearch} className="text-4xl text-yellow-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">SEO & Performance</h3>
              <p className="text-gray-600">SEO rankings.</p>
            </div>
            {/* Case Studies */}
            <div className="flex flex-col items-center bg-white p-6 rounded-full">
              <FontAwesomeIcon icon={faClipboardList} className="text-4xl text-red-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Case Studies</h3>
              <p className="text-gray-600">Transformed businesses.</p>
            </div>
          </div>
        </div>
      </section>
      <DesignProcess />
      <UIUXPrinciples />
      <DesignShowcase showcaseItems={projects} />
      <ToolList />
      <SeoPerformance />
      
      <section className="container mx-auto px-6 mt-16 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Elevate Your Online Presence?</h3>
        <p className="text-gray-600 mb-6">Let's create a website that captivates your audience and drives results!</p>
        <button className="btn-blue px-6 py-2">
          Get in Touch <FontAwesomeIcon icon={faPhoneVolume} className="ml-2" />
        </button>
      </section>
    </div>
  );
};

export default WebsiteDesign;
