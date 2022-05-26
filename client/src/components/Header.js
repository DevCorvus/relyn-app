import React from 'react';

export default function Header({ title }) {
  return (
    <header
      style={{ background: 'linear-gradient(to top, #b06ab3, #4568dc)' }}
      className="mb-2 text-center text-white text-3xl font-black p-2 rounded-md"
    >
      <h1>{title}</h1>
    </header>
  );
}
