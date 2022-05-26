import React from 'react';
import commentAPI from '../APIs/commentAPI';
import ItemMenu from './ItemMenu';

export default function CommentItemMenu({
  id,
  postId,
  usernameFromComment,
  usernameFromPost,
  setEditable,
  setComments,
  setCommentsCount,
}) {
  const handleDelete = async () => {
    setComments((prevState) =>
      prevState.filter((comment) => comment._id !== id)
    );
    setCommentsCount((prevState) => prevState - 1);
    await commentAPI.remove(id);
  };

  return (
    <ItemMenu
      postId={postId}
      usernameToCompare={usernameFromComment}
      usernameFromPost={usernameFromPost}
      setEditable={setEditable}
      deleteFn={handleDelete}
      disableShow={true}
    />
  );
}
