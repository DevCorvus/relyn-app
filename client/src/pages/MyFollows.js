import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/userSlice';
import Header from '../components/Header';
import Message from '../components/Message';
import SearchFollows from '../components/SearchFollows';
import FollowList from '../components/FollowList';
import AddFollow from '../components/AddFollow';

export default function MyFollows() {
  const user = useSelector(selectUser);
  const [follows, setFollows] = useState([]);
  const [filteredFollows, setFilteredFollows] = useState([]);
  const [search, setSearch] = useState('');

  return (
    <div>
      <Header title="My Follows" />
      <AddFollow />
      <SearchFollows
        search={search}
        setSearch={setSearch}
        follows={follows}
        setFilteredFollows={setFilteredFollows}
      />
      {user.follows.length === 0 ? (
        <Message text="You don't follow anyone yet ./" />
      ) : (
        <>
          {search.length > 0 ? (
            <FollowList follows={filteredFollows} setFollows={setFollows} />
          ) : (
            <FollowList follows={follows} setFollows={setFollows} />
          )}
        </>
      )}
    </div>
  );
}
