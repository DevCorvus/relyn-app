import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import postAPI from '../APIs/postAPI';
import PostItem from '../components/PostItem';
import PostLoading from '../components/loadings/PostLoading';
import Error from '../components/errors/Error';
import NotFoundError from '../components/errors/NotFoundError';

export default function SinglePost() {
  const { postId } = useParams();

  const [post, setPost] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const postToShow = await postAPI.show(postId);
        setPost(postToShow);
      } catch (err) {
        const statusCode = err.response.status;
        if (statusCode === 404) {
          setNotFound(true);
        } else {
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [postId]);

  if (isLoading) return <PostLoading />;
  if (notFound) return <NotFoundError />;
  if (error) return <Error />;
  return <PostItem {...post} />;
}
