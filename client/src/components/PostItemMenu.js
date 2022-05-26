import React from 'react';
import postAPI from '../APIs/postAPI';
import ItemMenu from './ItemMenu';

export default function PostItemMenu({
  id,
  usernameFromPost,
  setPosts,
  setEditable,
}) {
  const handleDelete = async () => {
    try {
      await postAPI.remove(id);
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
    } catch (e) {
      // ...
    }
  };

  return (
    <ItemMenu
      postId={id}
      usernameToCompare={usernameFromPost}
      setEditable={setEditable}
      deleteFn={handleDelete}
    />
  );
}
