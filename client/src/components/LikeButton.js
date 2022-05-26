import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { isLoggedIn } from '../redux/authSlice';
import { selectUser } from '../redux/userSlice';
import { numberFormatter } from '../utils/general';
import postAPI from '../APIs/postAPI';

export default function LikeButton({ id, likes }) {
  const auth = useSelector(isLoggedIn);
  const user = useSelector(selectUser);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(likes.length);

  const handleLike = async () => {
    setLiked((previoslyLiked) => {
      previoslyLiked
        ? setLikesCount(likesCount - 1)
        : setLikesCount(likesCount + 1);
      return !previoslyLiked;
    });
    await postAPI.like(id);
  };

  useEffect(() => {
    if (likes.filter((like) => like.username === user.username).length > 0)
      setLiked(true);
  }, [likes, user.username]);

  return (
    <button
      disabled={auth ? false : true}
      title="Like this Post"
      onClick={handleLike}
      className={`font-semibold border-2 ${
        auth
          ? 'border-pink-600 bg-pink-500 hover:bg-pink-600 focus:bg-pink-600'
          : 'border-gray-600 bg-gray-500 cursor-default'
      } px-4 rounded-l-full transition duration-200`}
      type="submit"
    >
      <div className="flex items-center gap-1">
        <span className="hidden lg:inline">{liked ? 'Unlike' : 'Like'}</span>
        {liked ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
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
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        )}
        <span>{numberFormatter(likesCount)}</span>
      </div>
    </button>
  );
}
