import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/userSlice';
import UserInfo from './UserInfo';
import Message from './Message';
import AddFollow from './AddFollow';

export default function Follows() {
  const { follows } = useSelector(selectUser);
  return (
    <div className="p-2">
      <h3 className="mb-1 font-semibold text-gray-500">
        Follows:{' '}
        <strong className="text-blue-400">
          {follows.length > 0 && follows.length}
        </strong>
      </h3>
      {follows.length === 0 ? (
        <Message text="You don't follow anyone yet ./" />
      ) : (
        <>
          <div className="flex flex-col gap-2 mb-3">
            {follows.slice(-3).map((follow, index) => (
              <UserInfo key={index} username={follow.username} />
            ))}
          </div>
          {follows.length > 3 && (
            <div className="text-center mt-1">
              <Link
                className="block w-full p-1 text-white bg-indigo-400 hover:bg-indigo-500 focus:bg-indigo-500 border-2 border-indigo-500 rounded-lg transition duration-200"
                to="/me/follows"
              >
                <div className="flex items-center justify-center gap-2">
                  <span className="font-semibold ">MY FOLLOWS</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                </div>
              </Link>
            </div>
          )}
        </>
      )}
      <AddFollow />
    </div>
  );
}
