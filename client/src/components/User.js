import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";
import Avatar from "./Avatar";
import UserInfo from "./UserInfo";

export default function User({ username, size, avatar, nickname }) {
  const user = useSelector(selectUser);
  const [showModal, setShowModal] = useState(false);
  let showModalTimer = null;

  const handleMouseOver = () => {
    setShowModal(true);
    if (showModalTimer) clearTimeout(showModalTimer);
  };

  const handleMouseLeave = () => {
    showModalTimer = setTimeout(() => {
      setShowModal(false);
    }, 1000);
  };

  return (
    <div>
      {user.username === username ? (
        <Avatar size={size} avatar={avatar} nickname={nickname} />
      ) : (
        <div className="relative">
          {showModal && (
            <div onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} style={{ minWidth: "18rem" }} className="absolute -top-28">
              <UserInfo username={username} />
              <div style={{
                borderRight: "15px solid transparent",
                // borderLeft: "20px solid transparent",
                borderTop: "15px solid #fff"
              }} className="ml-7 w-0 h-0 z-10"></div>
            </div>
          )}
          <div onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
            <Avatar size={size} avatar={avatar} nickname={nickname} />
          </div>
        </div>
      )}
    </div>
  );
}
