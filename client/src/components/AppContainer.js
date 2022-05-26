import React, { useRef, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isLoggedIn } from '../redux/authSlice';
import {
  getShowDashboardOnMobileStatus,
  setShowDashboardOnMobile,
} from '../redux/interfaceSlice';
import { useHistory } from 'react-router';
import Dashboard from './Dashboard';
import Info from './Info';
import CloseButton from './CloseButton';
import Modal from './Modal';

export default function Container({ children }) {
  const dispatch = useDispatch();
  const auth = useSelector(isLoggedIn);
  const showDashboardOnMobile = useSelector(getShowDashboardOnMobileStatus);
  const [showGoUpButton, setShowGoUpButton] = useState(false);
  const [showModal, setShowModal] = useState(true);

  const history = useHistory();
  history.listen(() => {
    dispatch(setShowDashboardOnMobile(false));
  });

  const observer = useRef(null);
  const hiddenFixerDiv = useCallback(
    (node) => {
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting)
          dispatch(setShowDashboardOnMobile(false));
      });
      if (node) observer.current.observe(node);
    },
    [dispatch]
  );

  useEffect(() => {
    window.onscroll = () =>
      window.pageYOffset > 200
        ? setShowGoUpButton(true)
        : setShowGoUpButton(false);
  }, []);

  return (
    <div className="min-h-screen bg-purple-200 px-2 lg:px-4 py-1 lg:py-2">
      <div className="my-3 mx-auto container grid grid-cols-12 gap-8">
        <div
          className={`${
            showDashboardOnMobile && 'hidden'
          } col-span-12 lg:col-span-8`}
        >
          <div className="bg-white rounded-lg p-4">{children}</div>
        </div>
        <div
          className={
            showDashboardOnMobile
              ? 'col-span-12 lg:hidden '
              : 'col-span-4 hidden lg:block'
          }
        >
          <div className="bg-white rounded-lg">
            {showDashboardOnMobile && (
              <div className="relative">
                <CloseButton
                  closeFn={() => dispatch(setShowDashboardOnMobile(false))}
                  outside={false}
                />
              </div>
            )}
            {auth ? <Dashboard /> : <Info />}
          </div>
        </div>
        {showDashboardOnMobile && (
          <div ref={hiddenFixerDiv} className="hidden lg:block" />
        )}
      </div>
      {!auth && (
        <div className="lg:hidden">
          <Modal showModal={showModal}>
            <div style={{ width: '90vw' }}>
              <div className="bg-white rounded-lg">
                <CloseButton closeFn={() => setShowModal(false)} />
                <Info />
              </div>
            </div>
          </Modal>
        </div>
      )}
      {showGoUpButton && (
        <a
          href="#start"
          title="Go up"
          className="fixed right-3 bottom-3 animate-pulse text-blue-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      )}
    </div>
  );
}
