import Sidbar from "./components/sidbar";
import { faArrowRight, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import { auth } from "../db/firebase";
import useUserStore from "../store/users-store";
import { USER_ROLES } from "../types/default-type";

export default function DashboardPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const {currentUser, logout} = useUserStore();
  const isAdmin = currentUser?.role === USER_ROLES.ADMIN;

  const handleSignOut = () => {
    logout();
    // console.log(getState().currentUser);
    navigate('/login')
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        logout();
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [logout, navigate]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidbar />

      <div className="flex-1">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 flex justify-between items-center p-4 text-gray-950">
          <h1 className="text-xl font-semibold">
            <span className="hidden sm:inline-block">Dashboard</span>
          </h1>

          <div className="flex items-center space-x-4">
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

            <button type="button" onClick={handleSignOut} className="px-3 py-2 bg-gray-900 text-white rounded hover:bg-gray-700 duration-200">
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
              <span className="hidden sm:inline-block">Sign Out</span>
            </button>
          </div>
        </header>

        <div className="p-2 sm:p-6 text-black">
          {location.pathname === "/dashboard" ? (
            <DashboardOverview name={currentUser?.name} isAdmin={isAdmin} />
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </div>
  );
}

function DashboardOverview({ name, isAdmin }: { name?: string; isAdmin: boolean }) {
  const actions = [
    { to: '/dashboard/profile', title: 'Your profile', description: 'Keep your contact details up to date.' },
    { to: '/dashboard/tasks', title: 'Personal tasks', description: 'Plan and track your own to-do list.' },
    { to: '/dashboard/support', title: 'Support the work', description: 'Record a pledge or contribution intention.' },
    ...(isAdmin ? [
      { to: '/dashboard/users', title: 'Manage members', description: 'Review and manage registered accounts.' },
      { to: '/dashboard/posts', title: 'Manage posts', description: 'Maintain published content and categories.' },
    ] : []),
  ];

  return (
    <section className="mx-auto max-w-5xl py-4">
      <p className="text-sm font-semibold uppercase tracking-wide text-blue-800">{isAdmin ? 'Administrator workspace' : 'Member workspace'}</p>
      <h2 className="mt-2 text-3xl font-semibold text-gray-950">Welcome{ name ? `, ${name}` : ''}.</h2>
      <p className="mt-2 max-w-2xl text-gray-600">{isAdmin ? 'Your personal tools are here, alongside the site management controls.' : 'A quiet place to manage your details, organize your next steps, and support the work.'}</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {actions.map((action) => (
          <Link key={action.to} to={action.to} className="group flex min-h-32 items-start justify-between border border-gray-200 bg-white p-5 transition hover:border-blue-700">
            <span>
              <span className="block text-lg font-semibold text-gray-950">{action.title}</span>
              <span className="mt-2 block text-sm text-gray-600">{action.description}</span>
            </span>
            <FontAwesomeIcon icon={faArrowRight} className="mt-1 text-blue-800 transition-transform group-hover:translate-x-1" />
          </Link>
        ))}
      </div>
    </section>
  );
}
