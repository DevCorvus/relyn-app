import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isLoggedIn } from '../redux/authSlice';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import Message from './Message';

export default function CommentsSection({
  postId,
  postUsername,
  countState: { commentsCount, setCommentsCount },
}) {
  const auth = useSelector(isLoggedIn);
  const [comments, setComments] = useState([]);

  const commentListProps = {
    postId,
    postUsername,
    comments,
    setComments,
    commentsCount,
    setCommentsCount,
  };

  return (
    <div>
      <hr className="mt-2 mb-4" />
      <CommentList {...commentListProps} />
      {auth ? (
        <CommentForm
          postId={postId}
          setComments={setComments}
          setCommentsCount={setCommentsCount}
        />
      ) : (
        <div className="mt-4 mb-2">
          <Link to="/register">
            <Message
              text="Create an Account to Comment something!"
              color="green"
            />
          </Link>
        </div>
      )}
    </div>
  );
}
