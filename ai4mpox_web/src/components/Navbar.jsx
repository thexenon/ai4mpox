import React from 'react';
import { Link, useLocation } from 'react-router-dom';
function Navbar() {
  const location = useLocation();
  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/profiles', label: 'Profiles' },
    { to: '/project', label: 'Reports' },
    { to: '/articles', label: 'News' },
  ];
  return (
    <div className="sticky top-0 z-50 w-full">
      <nav className="bg-gray-800 text-white py-5 px-8 w-full shadow-lg">
        <ul className="flex gap-8 justify-end">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`transition-all duration-300 px-5 py-2 rounded text-lg font-bold hover:bg-blue-500 hover:text-white hover:scale-105 shadow hover:shadow-xl ${
                  location.pathname === link.to
                    ? 'bg-blue-600 text-white scale-105 shadow-xl'
                    : ''
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
export default Navbar;
