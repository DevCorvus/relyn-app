import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, follow, unfollow } from '../redux/userSlice';
import userAPI from '../APIs/userAPI';
import UserCard from './UserCard';

export default function FollowItem({ avatar, nickname, username, followers }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [currentFollowers, setCurrentFollowers] = useState(followers);
  const [followed, setFollowed] = useState(false);

  const handleFollow = async () => {
    try {
      if (followed) {
        dispatch(unfollow(username));
        setCurrentFollowers(currentFollowers - 1);
        await userAPI.unfollow(username);
      } else {
        dispatch(follow({ username, createdAt: Date.now() }));
        setCurrentFollowers(currentFollowers + 1);
        await userAPI.follow(username);
      }
    } catch (e) {
      // ...
    }
  };

  useEffect(() => {
    setFollowed(
      user.follows.filter((follow) => follow.username === username).length > 0
    );
  }, [username, user.follows]);

  return (
    <UserCard
      user={{ avatar, nickname, username, followers }}
      followed={followed}
      handleFollow={handleFollow}
    />
  );
}
