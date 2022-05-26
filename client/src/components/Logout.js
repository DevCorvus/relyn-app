import React from 'react';
import { useHistory } from 'react-router-dom';
import userAPI from '../APIs/userAPI';
import { useSelector } from 'react-redux';
import { isLoggedIn } from '../redux/authSlice';

export default function Logout({ showMenu, setShowMenu }) {
  const auth = useSelector(isLoggedIn);
  const history = useHistory();
  return (
    <>
      {auth && (
        <button
          tabIndex={showMenu ? 0 : -1}
          className="focus:text-red-400 hover:text-red-400 transition duration-200"
          onClick={async () => {
            await userAPI.logout();
            history.push('/login');
            setShowMenu(false);
          }}
          type="button"
        >
          <div className="flex items-center justify-center gap-1">
            <span className="font-semibold">Logout</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </div>
        </button>
      )}
    </>
  );
}
