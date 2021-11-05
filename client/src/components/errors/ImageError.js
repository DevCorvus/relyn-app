import React, { useState } from "react";

export default function ImageError({ setReload }) {
  const [showRefresh, setShowRefresh] = useState(false);
  const handleReload = () => {
    setReload(true);
    setTimeout(() => {
      setReload(false);
    }, 1);
  };

  return (
    <div className="w-full h-32 relative text-gray-400">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <button onFocus={() => setShowRefresh(true)} onBlur={() => setShowRefresh(false)} onClick={handleReload} onMouseEnter={() => setShowRefresh(true)} onMouseLeave={() => setShowRefresh(false)} type="button" title="Reload Image">
          <div className="flex flex-col items-center text-red-400">
            {showRefresh ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
            <span className="font-semibold">Resource no longer available or connection issues</span>
          </div>
        </button>
      </div>
    </div>
  );
}
