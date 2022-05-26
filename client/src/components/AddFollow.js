import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { follow } from '../redux/userSlice';
import userAPI from '../APIs/userAPI';
import Label from './Label';
import Modal from './Modal';
import ContextLabel from './ContextLabel';
import ResponseError from './errors/ResponseError';

export default function AddFollow() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [response, setResponse] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userAPI.follow(username);
      dispatch(follow({ username, createdAt: Date.now() }));
      setShowModal(false);
    } catch (err) {
      setResponse(err.response.data);
      setTimeout(() => {
        setResponse('');
      }, 3000);
    }
    setUsername('');
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="w-full mt-2 p-1 border-2 border-yellow-500 text-white bg-yellow-400 hover:bg-yellow-500 focus:bg-yellow-500 rounded-lg transition duration-200"
        type="button"
      >
        <div className="flex items-center justify-center gap-1">
          <span className="font-semibold">ADD FOLLOW</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
          </svg>
        </div>
      </button>
      <Modal showModal={showModal}>
        <ResponseError response={response} outside={true} />
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="flex flex-col gap-2 bg-white rounded-lg p-3">
            <ContextLabel>Add Follow</ContextLabel>
            <div>
              <Label htmlFor="username">Username</Label>
              <input
                className="w-full p-2 border-2 border-gray-200 rounded-md outline-none focus:border-blue-300 transition duration-200"
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                name="username"
                id="username"
                value={username}
              />
            </div>
            <div className="flex gap-2">
              <button
                className="flex-1 text-white bg-green-400 hover:bg-green-500 border-2 border-green-500 rounded-sm outline-none transition duration-200"
                type="submit"
              >
                <div className="flex items-center justify-center gap-2">
                  <span className="text-lg font-mono tracking-widest">ADD</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 text-white bg-red-400 hover:bg-red-500 border-2 border-red-500 rounded-sm transition duration-200"
                type="button"
              >
                <div className="flex items-center justify-center">
                  <span className="text-lg font-mono tracking-widest">
                    CANCEL
                  </span>
                </div>
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
}
