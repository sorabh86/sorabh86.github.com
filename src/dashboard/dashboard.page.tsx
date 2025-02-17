import Sidbar from "./components/sidbar";
import {
  faBell,
  faChartBar,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Outlet, useNavigate } from "react-router";
import { useEffect } from "react";
import { auth } from "../db/firebase";
import useUserStore from "../store/users-store";

export default function DashboardPage() {
  const navigate = useNavigate();

  const {currentUser, logout} = useUserStore();

  const handleSignOut = () => {
    logout();
    // console.log(getState().currentUser);
    navigate('/login')
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        logout()
        navigate("/login");
      }
    });
  
    return () => unsubscribe();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidbar />

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

            <div className="flex items-center space-x-2">
              <img
                src='/sorabh-profile.jpg'
                alt="User"
                className="w-8 h-8 rounded-full"
              />
              <div className="hidden md:block">
                <p className="text-sm font-medium">{currentUser?.name || '[name]'}</p>
                <p className="text-xs text-gray-400">{currentUser?.email || '[email]'}</p>
              </div>
            </div>

            <a onClick={handleSignOut} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-800 duration-500 cursor-pointer">
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
              Sign Out
            </a>
          </div>
        </header>

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
