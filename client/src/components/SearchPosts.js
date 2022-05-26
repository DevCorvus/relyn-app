import React, { useState, useEffect } from 'react';
import SearchInput from './SearchInput';

export default function SearchPosts({ setQueries }) {
  const [search, setSearch] = useState('');

  useEffect(() => {
    setQueries((prevQueries) => ({ ...prevQueries, search }));
  }, [search, setQueries]);

  return (
    <SearchInput search={search} setSearch={setSearch} suffix="posts">
      Search a Post here...
    </SearchInput>
  );
}
