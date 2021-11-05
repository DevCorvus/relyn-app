import React from "react";

export default function ItemMenuButton({ setShowMenu }) {
  return (
    <button onClick={() => setShowMenu(prevState => !prevState)} className="p-1 text-gray-500 hover:text-gray-900 hover:bg-purple-300 focus:bg-purple-300 focus:bg-opacity-25 hover:bg-opacity-25 rounded-full transition duration-200" type="button">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
      </svg>
    </button>
  );
}
