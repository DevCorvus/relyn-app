import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, follow, unfollow } from "../redux/userSlice";
import userAPI from "../APIs/userAPI";
import useUserInfo from "../hooks/useUserInfo";
import UserCard from "./UserCard";
import Loading from "./loadings/Loading";
import Error from "./errors/Error";

export default function UserInfo({ username }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [userToShow, setUserToShow] = useState({
    avatar: "",
    nickname: "",
    username: "",
    followers: 0
  });
  const [followed, setFollowed] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleFollow = async () => {
    try {
      if (followed) {
        dispatch(unfollow(username));
        setUserToShow(prevState => ({ ...prevState, followers: prevState.followers - 1 }));
        await userAPI.unfollow(username);
      } else {
        dispatch(follow({ username, createdAt: Date.now() }));
        setUserToShow(prevState => ({ ...prevState, followers: prevState.followers + 1 }));
        await userAPI.follow(username);
      }
    } catch(e) {
      // ...
    }
  };

  useUserInfo(username, setUserToShow, setLoading, setError);

  useEffect(() => {
    user.follows
    ? setFollowed(user.follows.filter(follow => follow.username === username).length > 0)
    : setFollowed(false);
  }, [username, user.follows]);

  if (isLoading || error) return (
    <div className="flex flex-col justify-center border-2 border-gray-100 bg-white rounded-md shadow-sm h-24">
      {isLoading && <Loading />}
      {(error && !isLoading) && <Error />}
    </div>
  );

  return (
    <UserCard
      user={userToShow}
      followed={followed}
      handleFollow={handleFollow}
    />
  );
}
