import React from 'react';
import { Link } from 'react-router-dom';
import NavbarMenu from './NavbarMenu';

export default function Navbar() {
  return (
    <nav
      id="start"
      style={{ background: 'linear-gradient(to right, #b06ab3, #4568dc)' }}
      className="text-white px-4 border-b-4 border-opacity-50 border-white shadow-xl"
    >
      <ul className="mx-auto container flex items-center justify-between p-1">
        <Link
          className="p-1 hover:bg-blue-200 hover:bg-opacity-25 focus:bg-blue-200 focus:bg-opacity-25 rounded-full transition duration-200"
          to="/about"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
        <Link
          className="p-1 hover:bg-blue-200 hover:bg-opacity-25 focus:bg-blue-200 focus:bg-opacity-25 rounded-full transition duration-200"
          to="/"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
        </Link>
        <NavbarMenu />
      </ul>
    </nav>
  );
}
