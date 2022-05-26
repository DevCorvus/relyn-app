import React from 'react';

export default function Avatar({ size, avatar, nickname }) {
  return (
    <div className={`w-${size} h-${size} bg-gray-200 rounded-full`}>
      {avatar && (
        <img
          className="rounded-full"
          src={`https://avatars.dicebear.com/api/micah/${avatar}.svg`}
          alt={nickname + ' Avatar'}
          title={nickname + ' Avatar'}
        />
      )}
    </div>
  );
}
