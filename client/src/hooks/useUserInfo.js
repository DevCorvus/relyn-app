import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/userSlice';
import userAPI from '../APIs/userAPI';

export default function useUserInfo(
  username,
  setUserToShow,
  setLoading = null,
  setError = null
) {
  const currentUser = useSelector(selectUser);

  useEffect(() => {
    if (currentUser.username !== username) {
      (async () => {
        try {
          const userInfo = await userAPI.info(username);
          setUserToShow({
            avatar: userInfo.avatar,
            nickname: userInfo.nickname,
            username: userInfo.username,
            followers: userInfo.followers,
          });
        } catch (e) {
          if (setError) setError(true);
        } finally {
          if (setLoading) setLoading(false);
        }
      })();
    } else {
      setUserToShow({
        avatar: currentUser.avatar,
        nickname: currentUser.nickname,
        username: currentUser.username,
        followers: currentUser.followers,
      });
      if (setLoading) setLoading(false);
    }
  }, [
    username,
    setUserToShow,
    setLoading,
    setError,
    currentUser._id,
    currentUser.avatar,
    currentUser.nickname,
    currentUser.username,
    currentUser.followers,
  ]);
}
