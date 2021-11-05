import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import Image from "./Image";
import ImageLoading from "./loadings/ImageLoading";
import ImageError from "./errors/ImageError";

export default function ImageModal({ imageUrl }) {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reload, setReload] = useState(false);
  
  useEffect(() => {
    if (reload) {
      setError(false);
      setLoading(true);
    }
  }, [reload]);

  return (
    <>
      {imageUrl && (
        <>
          <div className="my-1 flex justify-center border-2 border-gray-300 bg-gray-200 rounded-lg">
            {(!error && isLoading) && (
              <ImageLoading />
            )}
            {error && (
              <ImageError setReload={setReload} />
            )}
            <button tabIndex={(isLoading || error) ? -1 : 0} onClick={() => {
              if (!isLoading && !error) setShowModal(true);
            }} type="button">
              <img
                onLoad={() => setLoading(false)}
                onError={() => setError(true)}
                hidden={isLoading || error}
                className="max-h-96 rounded-lg"
                src={reload ? "" : imageUrl}
                alt={imageUrl} />
            </button>
          </div>
          <Modal showModal={showModal}>
            <Image setShowModal={setShowModal} imageUrl={imageUrl} />
          </Modal>
        </>
      )}
    </>
  );
}
