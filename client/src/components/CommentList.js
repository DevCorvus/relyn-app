import React, { useState, useEffect } from "react";
import PostLoading from "./loadings/PostLoading";
import Error from "./errors/Error";
import Message from "./Message";
import CommentItem from "./CommentItem";
import commentAPI from "../APIs/commentAPI";

export default function CommentsList({ postId, postUsername, comments, setComments, commentsCount, setCommentsCount }) {
  const [commentsSorted, setCommentsSorted] = useState([]);
  const [restartFetching, setRestartFetching] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  const handleShowMore = () => {
    if (commentsCount <= 5) {
      setComments([]);
      setPageNumber(1);
      setRestartFetching(prevState => !prevState);
    } else {
      setPageNumber(prevNumber => prevNumber + 1);
    }
  };

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const newComments = await commentAPI.get(postId, pageNumber);
        setComments(prevComments => {
          const set = new Set();
          return [...prevComments, ...newComments].filter(post => {
            const duplicate = set.has(post._id);
            set.add(post._id);
            return !duplicate;
          })
        });
        setLoading(false);
      } catch(e) {
        setLoading(false);
        setError(true);
      }
    })();
  }, [restartFetching, pageNumber, postId, setComments]);

  useEffect(() => {
    setHasMore(comments.length < commentsCount);
  }, [comments.length, commentsCount]);

  useEffect(() => {
    setCommentsSorted(comments.sort((a, b) => {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }));
  }, [comments]);

  return (
    <>
      {commentsCount > 0 ? (
        <div>
          {error && <Error />}
          {isLoading && <PostLoading />}
          {(!isLoading && !error && hasMore) && (
            <button onClick={handleShowMore} className="w-full mb-4 p-1 text-xl text-blue-400 font-semibold border-2 border-blue-400 rounded-3xl hover:text-white hover:bg-blue-400 transition duration-100" type="button">
              Show more Comments
            </button>
          )}
          <div className="flex flex-col gap-4">
            {commentsSorted.map(comment => <CommentItem key={comment._id} comment={comment} postUsername={postUsername} setComments={setComments} setCommentsCount={setCommentsCount} />)}
          </div>
        </div>
      ) : (
        <Message text="There's no comments to show ./" />
      )}
    </>
  );
}