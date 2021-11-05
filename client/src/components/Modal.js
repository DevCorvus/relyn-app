import React from "react";

export default function Modal({ showModal, children }) {
  return (
    <>
    {showModal && (
      <div className="fixed top-0 left-0 w-screen h-screen z-50 bg-black bg-opacity-50">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {children}
        </div>
      </div>
    )}
    </>
  );
}
