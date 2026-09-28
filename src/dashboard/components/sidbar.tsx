import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { Link, useLocation } from 'react-router';
import { dashboardMenus } from '../../constants/menus.data';

function Sidbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const menus = dashboardMenus;

  return (
    <aside
      className={`sticky top-0 overflow-y-auto bg-gray-900 text-white shadow-lg h-screen p-4 transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-26"}`} >
      <button
        className="text-white focus:outline-none mb-4 text-lg"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>

      <nav className="flex flex-col">
        {menus.map((mainLink, key) => (
          <div key={key} className="dashboard-link flex flex-col gap-2">
            <Link key={key}
              to={mainLink.link}
              className={`flex gap-2 items-center p-2 rounded-lg ${location.pathname === mainLink.link ? "bg-blue-500" : "hover:bg-gray-700"
                } transition`}
            >
              <FontAwesomeIcon icon={mainLink.icon} className="w-5 h-5 mr-3" />
              {isSidebarOpen && mainLink.label}
            </Link>
            {location.pathname.startsWith(mainLink.link) &&
              <div className="pl-6 flex flex-col gap-2">
                {mainLink?.children?.map((subLink, key) => (
                  <Link key={key}
                    to={subLink.link}
                    className={`flex items-center p-2 rounded-lg ${location.pathname === subLink.link ? "bg-blue-500" : "hover:bg-gray-700"
                      } transition`}
                  >
                    <FontAwesomeIcon icon={subLink.icon} className="w-5 h-5 mr-3" />
                    {isSidebarOpen && subLink.label}
                  </Link>
                ))}
              </div>
            }
          </div>
        ))}
      </nav>
    </aside>
  )
}

export default Sidbar
