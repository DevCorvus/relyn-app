import React from 'react';
import Profile from './Profile';
import Follows from './Follows';

export default function Dashboard() {
  return (
    <>
      <header className="p-1 text-center text-blue-400 text-2xl font-black">
        <h2 className="inline border-b-4 border-blue-400">Dashboard</h2>
      </header>
      <div>
        <Profile />
        <hr />
        <Follows />
      </div>
    </>
  );
}
