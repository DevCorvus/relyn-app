import React from 'react';

export default function Message({ text, color = 'blue' }) {
  return (
    <p
      className={`text-center font-light text-xl bg-${color}-100 p-1 rounded-md shadow-md`}
    >
      {text}
    </p>
  );
}
