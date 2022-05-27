import { useEffect } from 'react';
import postAPI from '../APIs/postAPI';
import axios from 'axios';

const usePostSearch = (
  queries,
  pageNumber,
  setPosts,
  setLoading,
  setError,
  setHasMore,
  refresh
) => {
  useEffect(() => {
    setLoading(true);
    let isMounted = true;
    const request = axios.CancelToken.source();

    (async () => {
      if (isMounted) {
        try {
          const newPosts = await postAPI.get(request, {
            page: pageNumber,
            username: queries.username,
            search: queries.search,
            sortBy: queries.sortBy,
          });

          setPosts((prevPosts) => {
            const set = new Set();
            return [...prevPosts, ...newPosts].filter((post) => {
              const duplicate = set.has(post._id);
              set.add(post._id);
              return !duplicate;
            });
          });
          setHasMore(newPosts.length === 10);
          setLoading(false);
        } catch (e) {
          setLoading(false);
          if (!axios.isCancel(e)) setError(true);
        }
      }
    })();
    return () => {
      request.cancel();
      isMounted = false;
    };
  }, [
    queries.username,
    queries.search,
    queries.sortBy,
    pageNumber,
    setPosts,
    setLoading,
    setError,
    setHasMore,
    refresh,
  ]);
};

export default usePostSearch;
