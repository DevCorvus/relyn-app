import React, { useEffect } from "react";
import CloseButton from "./CloseButton";

export default function Image({ setShowModal, imageUrl }) {
  useEffect(() => {
    const handleKeyDown = (e) => {if (e.key === "Escape") setShowModal(false)};
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setShowModal]);

  return (
    <div className="w-screen">
      <div className="flex justify-center m-6">
        <div className="relative max-w-max bg-white p-1 rounded-md">
          <CloseButton closeFn={() => setShowModal(false)} outside={true} />
          <img style={{ maxHeight: "85vh" }} src={imageUrl} alt={imageUrl} />
        </div>
      </div>
    </div>
  );
}
