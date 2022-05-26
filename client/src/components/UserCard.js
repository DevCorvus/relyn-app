import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isLoggedIn } from '../redux/authSlice';
import Avatar from './Avatar';

export default function UserCard({ user, followed, handleFollow }) {
  const auth = useSelector(isLoggedIn);
  return (
    <div className="border-2 border-gray-100 bg-white rounded-md shadow-sm overflow-hidden">
      <div className="flex p-2 gap-2">
        <Avatar size={20} avatar={user.avatar} nickname={user.nickname} />
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap">
              <strong className="mr-2">{user.nickname}</strong>
              <strong className="text-gray-300">{user.username}</strong>
            </div>
            <span>
              Followers:{' '}
              <strong className="text-gray-600">{user.followers}</strong>
            </span>
          </div>
          <div className="flex items-center">
            <Link
              className="border border-green-600 px-2 text-white bg-green-500 hover:bg-green-600 focus:bg-green-600 rounded-l-full transition duration-200"
              to={`/posts/user/${user.username}`}
            >
              <span className="font-semibold">See Posts</span>
            </Link>
            <button
              disabled={auth ? false : true}
              onClick={handleFollow}
              className={`border ${
                auth
                  ? 'border-blue-500 bg-blue-400 hover:bg-blue-500 focus:bg-blue-500'
                  : 'bg-gray-500 border-gray-600 cursor-default'
              } px-2 text-white transition duration-200 rounded-r-full`}
              type="button"
            >
              <span className="font-semibold">
                {followed ? 'Unfollow' : 'Follow'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
