import React, { useState } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/userSlice';
import CommentItemMenu from './CommentItemMenu';
import CommentEditForm from './CommentEditForm';
import useUserInfo from '../hooks/useUserInfo';
import User from './User';

export default function CommentItem({
  comment: { _id, postId, username, body, edited, createdAt, updatedAt },
  postUsername,
  setComments,
  setCommentsCount,
}) {
  const user = useSelector(selectUser);
  const [userToShow, setUserToShow] = useState({
    avatar: '',
    nickname: '',
    username: '',
    followers: 0,
  });
  const [currentBody, setCurrentBody] = useState(body);
  const [isEdited, setIsEdited] = useState(edited);
  const [editable, setEditable] = useState(false);

  const commentItemMenuProps = {
    id: _id,
    postId,
    usernameFromComment: username,
    usernameFromPost: postUsername,
    setEditable,
    setComments,
    setCommentsCount,
  };

  const commentEditFormProps = {
    id: _id,
    body: currentBody,
    setBody: setCurrentBody,
    setIsEdited,
    setEditable,
  };

  useUserInfo(username, setUserToShow);

  return (
    <div className="border-2 border-gray-200 p-2 rounded-md shadow-sm">
      <div className="relative flex gap-2">
        <User
          username={username}
          size={10}
          avatar={userToShow.avatar}
          nickname={userToShow.nickname}
        />
        {user.username === postUsername || username === user.username ? (
          <CommentItemMenu {...commentItemMenuProps} />
        ) : (
          ''
        )}
        <div className="w-full flex flex-col overflow-hidden">
          <div className="flex items-center gap-1">
            <strong>{userToShow.nickname}</strong>
            <span className="text-gray-400"> says...</span>
            {isEdited && (
              <span
                className="font-medium italic text-xs text-gray-500"
                title={`Last update: ${moment().calendar(updatedAt)}`}
              >
                Edited
              </span>
            )}
          </div>
          {editable ? (
            <CommentEditForm {...commentEditFormProps} />
          ) : (
            <p className="whitespace-pre-line">{currentBody}</p>
          )}
          <span className="text-gray-500">{moment(createdAt).fromNow()}</span>
        </div>
      </div>
    </div>
  );
}
