import React from 'react';

export default function ValidationError({ children }) {
  return <span className="block text-red-400 font-semibold">{children}</span>;
}
