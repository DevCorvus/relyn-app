import React from 'react';

export default function Label({ htmlFor, children }) {
  return (
    <label className="font-semibold text-sm text-gray-400" htmlFor={htmlFor}>
      {children}
    </label>
  );
}
