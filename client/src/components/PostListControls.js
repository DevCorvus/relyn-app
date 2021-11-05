import React, { useEffect, useState } from "react";
import Label from "./Label";
import SearchPosts from "./SearchPosts";

export default function PostListControls({ setQueries, setRefresh }) {
  const [sortBy, setSortBy] = useState("latest");

  useEffect(() => {
    setQueries(prevQueries => ({ ...prevQueries, sortBy }));
  }, [sortBy, setQueries]);

  return (
    <form autoComplete="off">
      <div className="flex flex-col-reverse lg:flex-row gap-1">
        <div className="flex-1">
          <SearchPosts setQueries={setQueries} />
        </div>
        <div>
          <Label htmlFor="SortBy">Sort By:</Label>
          <br />
          <select
            className="lg:text-xl p-2 border-2 border-gray-200 rounded-lg focus:border-blue-400 outline-none transition duration-200"
            onChange={e => setSortBy(e.target.value)}
            name="sortBy"
            id="sortBy"
          >
            <option value="Latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="mostLiked">Most Liked</option>
            <option value="mostCommented">Most Commented</option>
          </select>
        </div>
      </div>
      <button title="Refresh Posts!" className="w-full underline-none mt-2 p-2 border-2 text-gray-300 hover:text-blue-300 focus:text-blue-200 border-gray-200 hover:border-blue-200 focus:border-blue-200 rounded-2xl transition duration-200" onClick={() => setRefresh(prevState => !prevState)} type="button">
        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
        </svg>
      </button>
    </form>
  );
}
