import React, { useState } from "react";
import { useTransition, animated } from "@react-spring/web";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedIn } from "../redux/authSlice";
import { setShowDashboardOnMobile } from "../redux/interfaceSlice";
import Logout from "./Logout";

const navbarButtonClass = "focus:text-blue-400 hover:text-blue-400 transition duration-200";

export default function NavbarMenu() {
  const dispatch = useDispatch();
  const auth = useSelector(isLoggedIn);
  const [showMenu, setShowMenu] = useState(false);

  const menuTransition = useTransition(showMenu, {
    from: { width: 0, opacity: 0 },
    enter: { width: 200, opacity: 1 },
    leave: { width: 0, opacity: 0 },
  });

  return (
    <>

      <button className="p-1 hover:bg-blue-200 hover:bg-opacity-25 focus:bg-blue-200 focus:bg-opacity-25 rounded-full transition duration-200" onClick={() => setShowMenu(prevState => !prevState)} type="button">
        {showMenu ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {menuTransition((style, item) => item && (
        <animated.div style={style} className="absolute top-12 right-0 overflow-hidden z-50">
          <div className="p-2 flex flex-col gap-4 lg:gap-2 h-full bg-white bg-opacity-95 text-black rounded-b-md shadow-md">
            {auth ? (
              <>

                <div className="lg:hidden">
                  <button style={{ width: "100%" }} tabIndex={showMenu ? 0 : -1} className={navbarButtonClass} onClick={() => {
                    dispatch(setShowDashboardOnMobile(true));
                    setShowMenu(false);
                  }}
                    type="button"
                  >
                    <div className="flex items-center justify-center gap-1">
                      <span className="font-semibold whitespace-nowrap">
                        Dashboard
                      </span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </button>
                </div>

                <Link tabIndex={showMenu ? 0 : -1} onClick={() => setShowMenu(false)} className={navbarButtonClass} to="/me/posts">
                  <div className="flex items-center justify-center gap-1">
                    <span className="font-semibold whitespace-nowrap">
                      My Posts
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                    </svg>
                  </div>
                </Link>

                <Link tabIndex={showMenu ? 0 : -1} onClick={() => setShowMenu(false)} className={navbarButtonClass} to="/me/follows">
                  <div className="flex items-center justify-center gap-1">
                    <span className="font-semibold whitespace-nowrap">My Follows</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                    </svg>
                  </div>
                </Link>

                <Link tabIndex={showMenu ? 0 : -1} onClick={() => setShowMenu(false)} to="/account" className={navbarButtonClass}>
                  <div className="flex items-center justify-center gap-1">
                    <span className="font-semibold">
                      Account
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                    </svg>
                  </div>
                </Link>

                <Logout showMenu={showMenu} setShowMenu={setShowMenu} />
              </>
            ) : (
              <>

                <Link tabIndex={showMenu ? 0 : -1} to="/login" onClick={() => setShowMenu(false)} className={navbarButtonClass}>
                  <div className="flex items-center justify-center gap-1">
                    <span className="font-semibold">Login</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                  </div>
                </Link>

                <Link tabIndex={showMenu ? 0 : -1} to="/register" onClick={() => setShowMenu(false)} className={navbarButtonClass}>
                  <div className="flex items-center justify-center gap-1">
                    <span className="font-semibold">Register</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                  </div>
                </Link>

              </>
            )}
          </div>
        </animated.div>
      ))}
    </> 
  );
}
