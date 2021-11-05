import React, { useState } from "react";
import moment from "moment";
import useUserInfo from "../hooks/useUserInfo";
import CommentsSection from "./CommentsSection";
import LikeButton from "./LikeButton";
import CommentButton from "./CommentButton";
import PostItemMenu from "./PostItemMenu";
import PostEditForm from "./PostEditForm";
import User from "./User";
import ImageModal from "./ImageModal";
import PostLoading from "./loadings/PostLoading";
import Error from "./errors/Error";

export default function PostItem({ setPosts, _id, username, body, imageUrl, likes, commentsCount: commentsCountFromPost, edited, createdAt, updatedAt }) {
  const [userToShow, setUserToShow] = useState({
    avatar: "",
    nickname: "",
    username: "",
    followers: 0
  });
  const [currentData, setCurrentData] = useState({ body, imageUrl });
  const [showComments, setShowComments] = useState(false);
  const [commentsCount, setCommentsCount] = useState(commentsCountFromPost);
  const [isEdited, setIsEdited] = useState(edited);
  const [editable, setEditable] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const postEditFormProps = {
    id: _id,
    currentData,
    setCurrentData,
    setIsEdited,
    setEditable
  };

  const postItemMenuProps = {
    id: _id,
    usernameFromPost: username,
    setPosts,
    setEditable
  };

  useUserInfo(username, setUserToShow, setLoading, setError);

  if (isLoading) return <PostLoading />;
  if (error) return <Error />;

  return (
    <div className="bg-gray-50 border-2 border-gray-200 p-2 rounded-md shadow-sm">
      <div className="relative flex gap-2">
        <User username={username} size={14} avatar={userToShow.avatar} nickname={userToShow.nickname} />
        <div className="flex-1 overflow-hidden">
          <PostItemMenu {...postItemMenuProps} />
          <div className="flex items-center gap-2">
            <strong>{userToShow.nickname}</strong>
            {isEdited && (
              <span className="font-medium italic text-xs text-gray-500" title={`Last update: ${moment().calendar(updatedAt)}`}>Edited</span>
            )}
          </div>
          {editable ? (
            <PostEditForm {...postEditFormProps} />
          ) : (
            <p className="whitespace-pre-line">{currentData.body}</p>
          )}
          <ImageModal imageUrl={currentData.imageUrl} />
        </div>
      </div>
      <div className="ml-16">
        <div className="flex justify-between items-center">
          <span className="text-gray-400">{moment(createdAt).fromNow()}</span>
          <div className="flex text-white font-bold">
            <LikeButton id={_id} likes={likes} />
            <CommentButton showComments={showComments} setShowComments={setShowComments} commentsCount={commentsCount} />
          </div>
        </div>
        {showComments && <CommentsSection postId={_id} postUsername={username} countState={{ commentsCount, setCommentsCount }} />}
      </div>
    </div>
  );
}