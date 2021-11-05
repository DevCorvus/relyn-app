import React from "react";
import moment from "moment";
import Label from "./Label";
import Avatar from "./Avatar";

export default function AccountInfo({ avatar, nickname, username, email, createdAt, updatedAt }) {
  return (
    <section className="my-4 bg-gray-50 border-2 border-gray-100 rounded-md">
      <ul className="flex flex-col gap-2 text-xl text-center">
        <li>
          <Label>Avatar:</Label>
          <div className="flex justify-center">
            <Avatar size={24} avatar={avatar} nickname={nickname} />
          </div>
        </li>
        <li>
          <Label>Nickname:</Label>
          <p>{nickname}</p>
        </li>
        <li>
          <Label>Username:</Label>
          <p>{username}</p>
        </li>
        <li>
          <Label>Email:</Label>
          <p>{email}</p>
        </li>
        <li>
          <Label>Created At:</Label>
          <p>{moment(createdAt).calendar()}</p>
        </li>
        <li>
          <Label>Last Update:</Label>
          <p>{moment(updatedAt).calendar()}</p>
        </li>
      </ul>
    </section>
  );
}