import { useEffect } from 'react';
import postAPI from '../APIs/postAPI';

const usePostSearch = (
  userId,
  pageNumber,
  setPosts,
  setLoading,
  setError,
  setHasMore
) => {
  useEffect(() => {
    setLoading(true);
    let isMounted = true;
    (async () => {
      if (isMounted) {
        try {
          const newPosts = await postAPI.showAll(userId, pageNumber);
          setPosts((prevPosts) => [...prevPosts, ...newPosts]);
          setHasMore(newPosts.length > 0);
          setLoading(false);
        } catch (e) {
          setLoading(false);
          setError(true);
        }
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [userId, pageNumber, setPosts, setLoading, setError, setHasMore]);
};

export default usePostSearch;
