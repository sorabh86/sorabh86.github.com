import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faPalette, faServer, faTools } from "@fortawesome/free-solid-svg-icons";

// Tool categories
const tools = [
  {
    category: "Design & Wireframing",
    icon: faPalette,
    items: ["Figma", "Penpot", "Inkscape", "GIMP", "Krita"]
  },
  {
    category: "Frontend & Styling",
    icon: faCode,
    items: ["Tailwind CSS", "Bootstrap", "Foundation", "Bulma"]
  },
  {
    category: "Web Development",
    icon: faServer,
    items: ["Next", "React", "Angular", "Eleventy", "SvelteKit"]
  },
  {
    category: "Icons & Illustrations",
    icon: faTools,
    items: ["Heroicons", "Lucide Icons", "Fontawesome", "Undraw"]
  }
];

const ToolList: React.FC = () => {
  return (
    <div className="bg-so-gray-dark py-16">
      <h1 className="text-3xl font-bold text-center pb-6 mb-6 text-white">Tools & Technologies</h1>
      <div className="container text-center mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.map((tool, index) => (
          <div className="p-4 rounded-full overflow-hidden bg-white text-so-gray-dark"
            key={index}>
            <div className="mb-3 gap-3 border-b-1 border-so-blue pb-3 text-so-blue">
              <h2 className="text-xl font-semibold"><FontAwesomeIcon icon={tool.icon} className="text-blue-500 text-xl mr-2" />{tool.category}</h2>
            </div>
            <ul className="">
              {tool.items.map((item, i) => (
                <li key={i} className="transition-colors duration-500 hover:bg-blue-500 hover:text-white mx-4 py-2 cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToolList;
