import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";
import moment from "moment";
import Modal from "./Modal";
import Label from "./Label";
import ChangeNickname from "./ChangeNickname";
import ChangeAvatar from "./ChangeAvatar";

export default function Profile() {
  const { avatar: currentAvatar, nickname, username, createdAt } = useSelector(selectUser);
  const [newAvatar, setNewAvatar] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false); 

  return (
    <div className="p-2 mb-2">
      <h3 className="text-xl font-semibold text-gray-300">Profile</h3>
      <div style={{ background: "linear-gradient(to top, #b06ab3, #4568dc)" }} className="p-2 text-center border-2 border-gray-200 rounded-md">
        <div className="mx-auto bg-gray-200 rounded-full w-32 h-32 border border-black">
          {currentAvatar && (
            <img className="rounded-full" src={`https://avatars.dicebear.com/api/micah/${currentAvatar}.svg`} alt="Avatar" />
          )}
        </div>
        <div className="text-white font-semibold mb-2">
          <p className="text-xl font-bold">
            {nickname}
          </p>
          <p className="text-gray-300 text-lg">
            {username}
          </p>
          <p className="text-yellow-300 text-base">
            Since <span>{moment(createdAt).calendar()}</span>
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <button className="w-full p-1 text-white bg-green-400 hover:bg-green-500 focus:bg-green-500 border-2 border-green-500 rounded-lg transition duration-200" onClick={() => setShowEditProfile(true)} type="button">
            <div className="flex items-center justify-center gap-2">
              <span className="font-semibold ">EDIT PROFILE</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </div>
          </button>
          <Link className="block w-full p-1 text-white bg-blue-400 hover:bg-blue-500 focus:bg-blue-500 border-2 border-blue-500 rounded-lg transition duration-200" to="/me/posts">
            <div className="flex items-center justify-center gap-2">
              <span className="font-semibold ">MY POSTS</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
              </svg>
            </div>
          </Link>
        </div>
      </div>
      <Modal showModal={showEditProfile}>
        <div className="relative text-left bg-white p-4 rounded-md">
          <span className="text-xl font-semibold text-gray-300">
            Edit
          </span>
          <button onClick={() => setShowEditProfile(false)} title="Close" className="absolute top-1 right-1 bg-gray-100 bg-opacity-25 hover:bg-red-100 focus:bg-red-100 rounded-full p-1 text-gray-700 hover:text-red-400 focus:text-red-400 shadow-lg transition duration-200" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="flex flex-col gap-1 mb-1 text-center p-2 border border-gray-200 rounded-md">
            <Label htmlFor="">Avatar</Label>
            <p className="text-center font-semibold">Avatars by <a title="Go to the source page" className="text-blue-500 hover:text-blue-600 focus:text-blue-600" href="https://www.figma.com/community/file/829741575478342595" target="_blank" rel="noopener noreferrer">Micah Lanier</a></p>
            <div className="mx-auto bg-gray-200 rounded-full w-32 h-32">
              {(newAvatar || currentAvatar) && (
                <img className="rounded-full" src={`https://avatars.dicebear.com/api/micah/${newAvatar || currentAvatar}.svg`} alt="Avatar" />
              )}
            </div>
            <ChangeAvatar newAvatar={newAvatar} setNewAvatar={setNewAvatar} />
          </div>
          <ChangeNickname />
        </div>
      </Modal>
    </div>
  );
}
