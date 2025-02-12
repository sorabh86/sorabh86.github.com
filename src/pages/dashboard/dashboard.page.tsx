import {
  faBell,
  faChartBar,
  faUsers,
  faClipboard,
  faSignOutAlt,
  faBars,
  faPlus,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, Outlet, redirect, useLocation } from "react-router";

export default function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  // const [activeMenu, setActiveMenu] = useState("dashboard");
  const location = useLocation();

  // const toggleMenu = (menu: string) => {
  //   setActiveMenu(activeMenu === menu ? "" : menu);
  //   redirect(menu)
  // };

  // const isActive = (path:string) => location.pathname.startsWith(path);

  // Mock user data
  const currentUser = {
    name: "Admin User",
    email: "admin@example.com",
    avatar: "/sorabh-profile.jpg",
  };

  // useEffect(() => {
  //   console.log(location.pathname);
  //   setActiveMenu(location.pathname)

  // });

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`relative bg-gray-900 text-white shadow-lg h-screen p-6 transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-26"
          }`}
      >
        {/* Toggle Sidebar Button */}
        <button
          className="text-white focus:outline-none mb-4 text-lg"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>

        {/* Sidebar Links */}
        <nav className="flex flex-col space-y-2">
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
              className={`flex items-center w-full p-2 rounded-lg cursor-pointer hover:bg-gray-700`}
            >
              <FontAwesomeIcon icon={faClipboard} className="w-5 h-5 mr-3" />
              {isSidebarOpen && "Posts"}
            </Link>

            {/* Posts Submenu */}
            {/* {activeMenu === "posts" && ( */}
            {location.pathname.startsWith("/dashboard/posts") && (
              <div className="pl-6">
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

          {/* Users Menu */}
          <div>
            {/* onClick={() => toggleMenu("users")} */}
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

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Bar */}
        <header className="bg-gray-950 shadow-md flex justify-between items-center p-4 text-dark">
          <h1 className="text-xl font-semibold">
            <FontAwesomeIcon icon={faChartBar} className="w-5 h-5 mr-3" />
            Dashboard
          </h1>

          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative p-2 hover:text-gray-300">
              <FontAwesomeIcon icon={faBell} />
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
                3
              </span>
            </button>

            {/* User Profile */}
            <div className="flex items-center space-x-2">
              <img
                src={currentUser.avatar}
                alt="User"
                className="w-8 h-8 rounded-full"
              />
              <div className="hidden md:block">
                <p className="text-sm font-medium">{currentUser.name}</p>
                <p className="text-xs text-gray-400">{currentUser.email}</p>
              </div>
            </div>

            {/* Sign Out Button */}
            <button className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600">
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
              Sign Out
            </button>
          </div>
        </header>

        {/* Dashboard Content - Show default only at /dashboard */}
        <div className="p-6 text-black">
          {location.pathname === "/dashboard" ? (
            <>
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h2 className="text-xl font-semibold">Total Users</h2>
                  <p className="text-3xl">150</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h2 className="text-xl font-semibold">Total Posts</h2>
                  <p className="text-3xl">500</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h2 className="text-xl font-semibold">Total Categories</h2>
                  <p className="text-3xl">10</p>
                </div>
              </div>

              {/* Quick Links */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Link
                  to="/dashboard/users"
                  className="bg-white p-6 rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
                >
                  <h2 className="text-xl font-semibold">Manage Users</h2>
                  <p className="text-gray-600">View, edit, and delete users</p>
                </Link>
                <Link
                  to="/dashboard/posts"
                  className="bg-white p-6 rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
                >
                  <h2 className="text-xl font-semibold">Manage Posts</h2>
                  <p className="text-gray-600">View, edit, and delete posts</p>
                </Link>
                <Link
                  to="/dashboard/categories"
                  className="bg-white p-6 rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
                >
                  <h2 className="text-xl font-semibold">Manage Categories</h2>
                  <p className="text-gray-600">View, edit, and delete categories</p>
                </Link>
              </div>

              {/* Recent Activity */}
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                <ul>
                  <li className="mb-2">New user "John Doe" registered.</li>
                  <li className="mb-2">Post "React Tips" was published.</li>
                  <li className="mb-2">Category "Technology" was updated.</li>
                </ul>
              </div>
            </>
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </div>
  );
}
