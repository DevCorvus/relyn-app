import React from 'react';

export default function AppLoading({ error = false }) {
  const backgroundStyle = {
    background: 'linear-gradient(to right, #b06ab3, #4568dc)',
  };
  return (
    <div style={backgroundStyle} className="w-screen h-screen">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col gap-4 items-center text-white">
          <h1 className="text-5xl font-bold">Relyn Client</h1>
          {error ? (
            <div className="text-center">
              <h2 className="text-red-50 text-xl font-semibold">
                The connection could not be established
              </h2>
              <p className="text-sm opacity-50">
                (Refresh the page or try later)
              </p>
            </div>
          ) : (
            <svg
              className="animate-spin h-10 w-10"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}
