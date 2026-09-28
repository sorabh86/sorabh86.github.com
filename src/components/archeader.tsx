import { Link, useLocation } from 'react-router';
import { menuData } from '../constants/menus.data';

export default function CurvedNavBar() {
  const location = useLocation();

  const visibleMenus = menuData.filter((menu) => menu.link !== '/login' && menu.link !== '/signup');

  return (
    <header className="relative h-0">
      <svg width="0" height="0" aria-hidden="true">
        <defs>
          <clipPath id="curvedClip" clipPathUnits="userSpaceOnUse">
            <path
              d="m -85.472325,107.97975 c 129.796921,29.83381 257.045905,32.48964 381.000005,0 v 16.93333 c -123.59264,62.34101 -250.346672,66.68298 -381.000005,0 z"
              id="path1-5"
            />
          </clipPath>
        </defs>
      </svg>

      <nav
        aria-label="Main navigation"
        className="bg-blue-600 text-white w-full shadow-md"
        style={{ clipPath: 'url(#curvedClip)' }}
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-center gap-4 md:gap-6 flex-wrap">
          {visibleMenus.map((menu) => {
            const isActive = menu.link === '/'
              ? location.pathname === '/'
              : location.pathname === menu.link || location.pathname.startsWith(menu.link);

            return (
              <Link
                key={menu.link}
                to={menu.link}
                aria-current={isActive ? 'page' : undefined}
                className={`transition-colors duration-200 hover:text-gray-200 ${isActive ? 'font-semibold text-gray-100 underline decoration-2 underline-offset-4' : 'text-white/90'}`}
              >
                {menu.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
