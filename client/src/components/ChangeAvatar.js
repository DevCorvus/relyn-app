import React from "react";
import randomString from "randomstring";
import { useDispatch } from "react-redux";
import { setAvatar } from "../redux/userSlice";
import userAPI from "../APIs/userAPI";

export default function ChangeAvatar({ newAvatar, setNewAvatar }) {
  const dispatch = useDispatch();

  const handleCancel = () => {
    setNewAvatar(false);
  };

  const changeAvatar = () => {
    setNewAvatar(randomString.generate(32));
  };
  
  const saveAvatar = async () => {
    try {
      await userAPI.changeAvatar(newAvatar);
      dispatch(setAvatar(newAvatar));
      setNewAvatar(false);
    } catch(err) {
      // ...
    }
  };

  return (
    <div className="flex flex-col">
      <div>
        <button className="text-white text-lg px-2 rounded-lg border border-green-500 bg-green-400 hover:bg-green-500 focus:bg-green-500 transition duration-200" onClick={changeAvatar} type="button"> 
          <div className="flex items-center gap-1">
            <span>Randomize Avatar</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
          </div>
        </button>
      </div>
      {newAvatar && (
        <div className="flex-1 flex justify-center gap-6">
          <button className="text-lg hover:text-blue-400 focus:text-blue-400 transition duration-200" onClick={saveAvatar} type="button">
            Save
          </button>
          <button className="text-lg hover:text-red-400 focus:text-red-400 transition duration-200" onClick={handleCancel} type="button">
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
