import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { isLoggedIn } from "../redux/authSlice";
import { selectUser } from "../redux/userSlice";
import ItemMenuButton from "./ItemMenuButton";
import useOutsideCloser from "../hooks/useOutsideCloser";

export default function ItemMenu({ postId, usernameToCompare, usernameFromPost, setEditable, deleteFn, disableShow = false }) {
  const auth = useSelector(isLoggedIn);
  const { username: currentUsername } = useSelector(selectUser);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  useOutsideCloser(menuRef, setShowMenu);
  
  const handleMenuClose = (fn) => {
    setShowMenu(!showMenu);
    fn();
  };
  
  return (
    <>
      {showMenu ? (
        <div ref={menuRef} className="z-10 absolute top-0 right-0 bg-gray-100 p-2 rounded-lg shadow-lg">
          <button onClick={() => setShowMenu(!showMenu)} className="w-full flex items-center justify-between gap-1 font-semibold text-gray-400 hover:text-gray-600 focus:text-gray-600 transition duration-200" type="button">
            <span>Menu</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <hr className="my-1" />
          <div className="flex flex-col gap-1 items-start">
            {!disableShow && (
              <Link onClick={() => setShowMenu(false)} to={`/posts/${postId}`} className="w-full font-semibold text-gray-600 hover:text-blue-400 focus:text-blue-400 px-1 rounded-lg transition duration-200">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                  <span>Show</span>
                </div>
              </Link>
            )}
            {auth && (
              <>
                {currentUsername === usernameToCompare && (
                  <button onClick={() => {
                    setShowMenu(!showMenu);
                    setEditable(true);
                  }} className="w-full font-semibold text-gray-600 hover:text-blue-400 focus:text-blue-400 px-1 rounded-lg transition duration-200" type="button">
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                      <span>Edit</span>
                    </div>
                  </button>
                )}
                {(currentUsername === usernameToCompare || currentUsername === usernameFromPost) && (
                  <button onClick={() => handleMenuClose(deleteFn)} className="w-full text-left font-semibold text-gray-600 hover:text-red-400 focus:text-red-400 px-1 rounded-lg transition duration-200" type="button">
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <span>Delete</span>
                    </div>
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="absolute top-0 right-0">
          <ItemMenuButton setShowMenu={setShowMenu} />
        </div>
      )}
    </>
  );
}
