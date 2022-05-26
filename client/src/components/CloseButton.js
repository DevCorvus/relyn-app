import React from 'react';

export default function CloseButton({ closeFn, outside = false }) {
  return (
    <button
      title="Close"
      className={`absolute ${
        outside ? '-top-10' : 'top-1'
      } right-1 text-gray-700 hover:text-red-400 focus:text-red-400 bg-gray-100 bg-opacity-25 hover:bg-red-100 focus:bg-red-100 rounded-full p-1 shadow-lg transition duration-200`}
      onClick={closeFn}
      type="button"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
}
