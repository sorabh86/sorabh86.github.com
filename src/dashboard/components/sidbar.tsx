import { faAddressCard, faBars, faChartBar, faClipboard, faFolder, faHeart, faList, faPlus, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router';
import useUserStore from '../../store/users-store';
import { USER_ROLES } from '../../types/default-type';

function Sidbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const [postsExpanded, setPostsExpanded] = useState(location.pathname.startsWith('/dashboard/posts'));
  const [usersExpanded, setUsersExpanded] = useState(location.pathname.startsWith('/dashboard/users'));
  const role = useUserStore((state) => state.currentUser?.role);

  useEffect(() => {
    if (location.pathname.startsWith('/dashboard/posts')) setPostsExpanded(true);
    if (location.pathname.startsWith('/dashboard/users')) setUsersExpanded(true);
  }, [location.pathname]);

  const memberMenus = [
    { icon: faChartBar, label: 'Overview', link: '/dashboard' },
    { icon: faAddressCard, label: 'My profile', link: '/dashboard/profile' },
    { icon: faList, label: 'My tasks', link: '/dashboard/tasks' },
    { icon: faHeart, label: 'Support', link: '/dashboard/support' },
  ];
  const renderMenu = (menu: typeof memberMenus[number]) => {
    const currentPath = location.pathname.replace(/\/$/, '') || '/';
    const menuPath = menu.link.replace(/\/$/, '') || '/';
    const isCategoryLink = menuPath === '/dashboard/posts/category';
    const isPostsLink = menuPath === '/dashboard/posts';
    const isActive = currentPath === menuPath
      || (isCategoryLink && currentPath.startsWith(`${menuPath}/`))
      || (isPostsLink && currentPath.startsWith(`${menuPath}/`) && !currentPath.startsWith(`${menuPath}/category`))
      || (menuPath !== '/dashboard' && !isCategoryLink && !isPostsLink && currentPath.startsWith(`${menuPath}/`));
    return (
      <Link
        key={menu.link}
        to={menu.link}
        aria-current={isActive ? 'page' : undefined}
        title={isSidebarOpen ? undefined : menu.label}
        className={`flex min-h-10 items-center gap-3 rounded px-2 transition ${isActive ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}
      >
        <FontAwesomeIcon icon={menu.icon} className="w-5 shrink-0" />
        {isSidebarOpen && <span>{menu.label}</span>}
      </Link>
    );
  };

  const renderAdminLink = (label: string, path: string, icon: typeof faList) => {
    const currentPath = location.pathname.replace(/\/$/, '') || '/';
    const isActive = currentPath === path;
    return (
      <Link
        key={path}
        to={path}
        aria-current={isActive ? 'page' : undefined}
        title={isSidebarOpen ? undefined : label}
        className={`ml-8 mt-1 flex min-h-9 items-center gap-3 rounded px-2 text-sm transition ${isActive ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}
      >
        <FontAwesomeIcon icon={icon} className="w-4 shrink-0" />
        {isSidebarOpen && <span>{label}</span>}
      </Link>
    );
  };

  return (
    <aside
      className={`sticky top-0 overflow-y-auto bg-gray-950 text-white h-screen p-4 transition-all duration-200 ${isSidebarOpen ? "w-64" : "w-20"}`} >
      <button
        type="button"
        aria-label={isSidebarOpen ? 'Collapse navigation' : 'Expand navigation'}
        className="text-white focus:outline-none mb-4 text-lg"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>

      <nav aria-label="Dashboard navigation" className="flex flex-col gap-1">
        {memberMenus.map(renderMenu)}
        {role === USER_ROLES.ADMIN && (
          <>
            {isSidebarOpen && <p className="mt-6 mb-1 px-2 text-xs font-semibold uppercase text-gray-500">Administration</p>}
            <div>
              <button
                type="button"
                aria-expanded={postsExpanded}
                aria-label={`${postsExpanded ? 'Collapse' : 'Expand'} Posts links`}
                title={isSidebarOpen ? undefined : 'Posts'}
                onClick={() => setPostsExpanded((expanded) => !expanded)}
                className={`flex min-h-10 w-full items-center gap-3 rounded px-2 text-left transition ${location.pathname.startsWith('/dashboard/posts') ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}
              >
                <FontAwesomeIcon icon={faClipboard} className="w-5 shrink-0" />
                {isSidebarOpen && <><span className="flex-1">Posts</span><span aria-hidden="true">{postsExpanded ? 'v' : '>'}</span></>}
              </button>
              {postsExpanded && <div>
                {renderAdminLink('All posts', '/dashboard/posts', faList)}
                {renderAdminLink('Categories', '/dashboard/posts/category', faFolder)}
              </div>}
            </div>
            <div>
              <button
                type="button"
                aria-expanded={usersExpanded}
                aria-label={`${usersExpanded ? 'Collapse' : 'Expand'} Users links`}
                title={isSidebarOpen ? undefined : 'Users'}
                onClick={() => setUsersExpanded((expanded) => !expanded)}
                className={`flex min-h-10 w-full items-center gap-3 rounded px-2 text-left transition ${location.pathname.startsWith('/dashboard/users') ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}
              >
                <FontAwesomeIcon icon={faUsers} className="w-5 shrink-0" />
                {isSidebarOpen && <><span className="flex-1">Users</span><span aria-hidden="true">{usersExpanded ? 'v' : '>'}</span></>}
              </button>
              {usersExpanded && <div>
                {renderAdminLink('All users', '/dashboard/users', faList)}
                {renderAdminLink('Add user', '/dashboard/users/add', faPlus)}
              </div>}
            </div>
          </>
        )}
      </nav>
    </aside>
  )
}

export default Sidbar
