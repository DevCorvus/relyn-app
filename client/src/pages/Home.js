import React from "react";
import Header from "../components/Header";
import Posts from "../components/Posts";

export default function Home() {
  return (
    <div>
      <Header title="Home Page" />
      <Posts />
    </div>
  );
}