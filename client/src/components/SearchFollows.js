import React, { useEffect } from 'react';
import SearchInput from './SearchInput';

export default function SearchFollows({
  search,
  setSearch,
  follows,
  setFilteredFollows,
}) {
  useEffect(() => {
    setFilteredFollows(
      follows.filter((follow) => {
        const nickname = follow.nickname.toLowerCase();
        if (nickname.startsWith(search)) {
          return true;
        } else {
          const username = follow.username.toLowerCase();
          return username.startsWith(search);
        }
      })
    );
  }, [search, follows, setFilteredFollows]);

  return (
    <SearchInput search={search} setSearch={setSearch} suffix="follows">
      Search a Follow here...
    </SearchInput>
  );
}
