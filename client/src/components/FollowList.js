import React, { useState } from "react";
import FollowItem from "./FollowItem";
import useUserFollows from "../hooks/useUserFollows";
import Loading from "./loadings/Loading";
import Error from "./errors/Error";

export default function Follows({ follows, setFollows }) {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useUserFollows(setFollows, setLoading, setError);

  if (error) return <Error />;

  return (
    <>
      {isLoading && <Loading />}
      {follows.map(follow => (
        <FollowItem key={follow._id} {...follow} />
      ))}
    </>
  );
}
