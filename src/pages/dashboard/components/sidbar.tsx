import { faBars, faChartBar, faClipboard, faFolder, faList, faPlus, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { Link, useLocation } from 'react-router';

interface Props { }

function Sidbar({ }: Props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const location = useLocation();

  return (
    <aside
      className={`sticky top-0 overflow-y-auto bg-gray-900 text-white shadow-lg h-screen p-4 transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-26"}`} >
      <button
        className="text-white focus:outline-none mb-4 text-lg"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>

      <nav className="flex flex-col space-y-1">
        <Link
          to="/dashboard"
          className={`flex items-center p-2 rounded-lg ${location.pathname === "/dashboard" ? "bg-blue-500" : "hover:bg-gray-700"
            } transition`}
        >
          <FontAwesomeIcon icon={faChartBar} className="w-5 h-5 mr-3" />
          {isSidebarOpen && "Dashboard"}
        </Link>

        

        {/* Posts Menu */}
        <div className="post-link">
          {/* onClick={() => toggleMenu("posts")} */}
          <Link to="/dashboard/posts"
            className={`flex items-center w-full p-2 rounded-lg cursor-pointer  ${location.pathname.startsWith("/dashboard/posts") ? "bg-blue-500":''} hover:bg-gray-700`}
          >
            <FontAwesomeIcon icon={faClipboard} className="w-5 h-5 mr-3" />
            {isSidebarOpen && "Posts"}
          </Link>
          
          {location.pathname.startsWith("/dashboard/posts") && (
            <div className="pl-6">
              <Link
                to="/dashboard/posts/category"
                className={`flex items-center p-2 rounded-lg ${location.pathname === "/dashboard/posts/category" ? "bg-blue-500" : "hover:bg-gray-700"
                  } transition`}
              >
                <FontAwesomeIcon icon={faFolder} className="w-5 h-5 mr-3" />
                {isSidebarOpen && "Category"}
              </Link>

              <Link
                to="/dashboard/posts"
                className={`block p-2 rounded-lg ${location.pathname === "/dashboard/posts" ? "bg-blue-500" : "hover:bg-gray-700"
                  }`}
              >
                <FontAwesomeIcon icon={faList} className="w-4 h-4 mr-2" />
                {isSidebarOpen && "All Posts"}
              </Link>
              <Link
                to="/dashboard/posts/add"
                className={`block p-2 rounded-lg ${location.pathname === "/dashboard/posts/add" ? "bg-blue-500" : "hover:bg-gray-700"
                  }`}
              >
                <FontAwesomeIcon icon={faPlus} className="w-4 h-4 mr-2" />
                {isSidebarOpen && "Add Post"}
              </Link>
            </div>
          )}
        </div>

        <div>
          <Link to="/dashboard/users"
            className={`flex items-center w-full p-2 rounded-lg cursor-pointer hover:bg-gray-700`}
          >
            <FontAwesomeIcon icon={faUsers} className="w-5 h-5 mr-3" />
            {isSidebarOpen && "Users"}
          </Link>

          {/* Users Submenu */}
          {location.pathname.startsWith("/dashboard/users") && (
            <div className="pl-6">
              <Link
                to="/dashboard/users"
                className={`block p-2 rounded-lg ${location.pathname === "/dashboard/users" ? "bg-blue-500" : "hover:bg-gray-700"
                  }`}
              >
                <FontAwesomeIcon icon={faList} className="w-4 h-4 mr-2" />
                {isSidebarOpen && "All Users"}
              </Link>
              <Link
                to="/dashboard/users/add"
                className={`block p-2 rounded-lg ${location.pathname === "/dashboard/users/add" ? "bg-blue-500" : "hover:bg-gray-700"
                  }`}
              >
                <FontAwesomeIcon icon={faPlus} className="w-4 h-4 mr-2" />
                {isSidebarOpen && "Add User"}
              </Link>
            </div>
          )}
        </div>
      </nav>
    </aside>
  )
}

export default Sidbar
