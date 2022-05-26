import React from 'react';

export default function ModalContainer({ children }) {
  return (
    <div className="w-screen lg:w-full p-2 lg:p-0">
      <div className="w-full p-4 bg-white rounded-md shadow-md">{children}</div>
    </div>
  );
}
