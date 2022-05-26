import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setNickname } from '../redux/userSlice';
import Label from './Label';
import userAPI from '../APIs/userAPI';

export default function ChangeNickname() {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setValue('');
      await userAPI.changeNickname(value);
      dispatch(setNickname(value));
    } catch (e) {
      // ...
    }
  };

  return (
    <form
      onChange={(e) => setValue(e.target.value)}
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      <div>
        <Label htmlFor="nickname">Nickname</Label>
        <div className="flex items-center gap-1">
          <input
            className="w-full p-2 border-2 border-gray-200 rounded-md outline-none focus:border-yellow-500 transition duration-200"
            onChange={(e) => setValue(e.target.value)}
            type="text"
            name="nickname"
            id="nickname"
            value={value}
            placeholder="Change Nickname..."
          />
          <button
            disabled={value.length === 0}
            title="Apply Change"
            className={`text-white p-1 border-2 ${
              value.length === 0
                ? 'border-gray-600 bg-gray-400 cursor-default'
                : 'border-yellow-500 bg-yellow-400 hover:bg-yellow-500 focus:bg-yellow-500'
            } rounded-md transition duration-200`}
            type="submit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </form>
  );
}
