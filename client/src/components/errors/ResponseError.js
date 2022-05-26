import React from 'react';

export default function ResponseError({ response, outside = false }) {
  return (
    <>
      {response && (
        <div className="self-end text-lg font-semibold">
          {outside ? (
            <span className="absolute -top-7 text-yellow-300">{response}</span>
          ) : (
            <span className="block text-center mb-2 text-yellow-400">
              {response}
            </span>
          )}
        </div>
      )}
    </>
  );
}
