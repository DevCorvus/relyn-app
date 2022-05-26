import React, { useState, useEffect, useRef, useCallback } from 'react';
import Loading from './loadings/Loading';
import Error from './errors/Error';
import PostItem from './PostItem';
import PostListControls from './PostListControls';
import PostForm from './PostForm';
import Message from './Message';
import usePostSearch from '../hooks/usePostSearch';

const queryInitialState = {
  username: '',
  search: '',
  sortBy: 'latest',
};

export default function PostList({
  showForm,
  queriesInitialState = queryInitialState,
}) {
  const [posts, setPosts] = useState([]);
  const [queries, setQueries] = useState(queriesInitialState);

  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const observer = useRef(null);
  const lastPostRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  usePostSearch(
    queries,
    pageNumber,
    setPosts,
    setLoading,
    setError,
    setHasMore,
    refresh
  );

  useEffect(() => {
    setPageNumber(1);
    setPosts([]);
  }, [queries.username, queries.search, queries.sortBy, refresh]);

  if (error) return <Error />;

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-300">Posts</h2>
      {showForm && <PostForm setPosts={setPosts} />}
      <div className="my-2">
        <PostListControls setQueries={setQueries} setRefresh={setRefresh} />
      </div>
      <div className="flex flex-col gap-4">
        {!isLoading && posts.length === 0 ? (
          <Message text="There are no posts to show ./" />
        ) : (
          <>
            {posts.map((post, i) => {
              if (posts.length === i + 1) {
                return (
                  <div key={post._id} ref={lastPostRef}>
                    <PostItem setPosts={setPosts} {...post} />
                  </div>
                );
              }
              return <PostItem key={post._id} setPosts={setPosts} {...post} />;
            })}
          </>
        )}
        {isLoading && <Loading />}
      </div>
    </div>
  );
}
