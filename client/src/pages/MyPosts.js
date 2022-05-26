import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/userSlice';
import PostList from '../components/PostList';
import Message from '../components/Message';

export default function MyPosts() {
  const { username } = useSelector(selectUser);
  return (
    <>
      {username ? (
        <PostList queriesInitialState={{ username }} />
      ) : (
        <Message text="Getting User Info..." />
      )}
    </>
  );
}
