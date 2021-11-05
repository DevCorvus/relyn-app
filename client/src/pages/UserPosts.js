import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PostList from "../components/PostList";
import Loading from "../components/loadings/Loading";

export default function UserPosts() {
  const { username } = useParams();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(false);
    setTimeout(() => {
      setShow(true);
    }, 1);
  }, [username]);

  return (
    <>
      {show ? <PostList queriesInitialState={{ username }} /> : <Loading />}
    </>
  );
}
