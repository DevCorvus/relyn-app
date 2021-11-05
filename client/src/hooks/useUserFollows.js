import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";
import userAPI from "../APIs/userAPI";

const useUserFollows = (setFollows, setLoading, setError) => {
  const user = useSelector(selectUser);
  useEffect(() => {
    if (user._id) {
      setLoading(true);
      (async () => {
        try {
          const usersInfo = await userAPI.followsInfo(user._id);
          setFollows(usersInfo);
          setLoading(false);
        } catch(e) {
          setLoading(false);
          setError(true);
        }
      })();
    }
  }, [user._id, setFollows, setLoading, setError]);
};

export default useUserFollows;