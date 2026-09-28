export default function CurvedNavBar() {
  return (
    <header className="relative h-0">
      {/* SVG definition for clipPath using userSpaceOnUse (pixel coordinates) */}
      <svg width="0" height="0">
        <defs>
          <clipPath id="curvedClip" clipPathUnits="userSpaceOnUse">
            <path
       d="m -85.472325,107.97975 c 129.796921,29.83381 257.045905,32.48964 381.000005,0 v 16.93333 c -123.59264,62.34101 -250.346672,66.68298 -381.000005,0 z"
       id="path1-5" />
          </clipPath>
        </defs>
      </svg>

      {/* Navbar with fixed height of 64px and the curved clipPath */}
      <nav
        className="bg-blue-600 text-white w-full"
        style={{ clipPath: "url(#curvedClip)" }}
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-center space-x-6">
          <a href="#" className="hover:text-gray-200">Home</a>
          <a href="#" className="hover:text-gray-200">About</a>
          <a href="#" className="hover:text-gray-200">Services</a>
          <a href="#" className="hover:text-gray-200">Pricing</a>
          <a href="#" className="hover:text-gray-200">Blog</a>
          <a href="#" className="hover:text-gray-200">Contact</a>
        </div>
      </nav>
    </header>
  );
}
