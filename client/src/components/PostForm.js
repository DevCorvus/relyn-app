import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { isLoggedIn } from "../redux/authSlice";
import postAPI from "../APIs/postAPI";
import useValidation from "../hooks/useValidation";
import { postValidation } from "../utils/postValidation";
import Loading from "./loadings/Loading";
import Message from "./Message";
import Modal from "./Modal";
import FormInput from "./FormInput";
import Button from "./Button";
import ResponseError from "./errors/ResponseError";

const initialState = { body: "", imageUrl: "" };

export default function PostForm({ setPosts }) {
  const auth = useSelector(isLoggedIn);
  const [response, setResponse] = useState("");
  const [sending, setSending] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [data, setData] = useState(initialState);
  const [validation, setValidation] = useState(initialState);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    postValidation(name, value, setValidation);
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    
    try {
      const dataSending = data;
      setData(initialState);
      const newPost = await postAPI.create(dataSending);
      setPosts(prevPosts => [newPost, ...prevPosts])
      setShowModal(false);

    } catch(err) {
      setResponse(err.response.data);
      setTimeout(() => {
        setResponse("");
      }, 3000);

    } finally {
      setSending(false);
    }
  };

  useValidation(data, validation, setDisableSubmit, ["imageUrl"]);

  if (!auth) return (
    <Link to="/register">
      <Message text="Create an Account to Post something!" color="green" />
    </Link>
  );

  return (
    <>
    <button title="Create a new Post!" className="w-full p-4 border-2 bg-gray-50 hover:bg-green-500 focus:bg-green-500 text-gray-400 hover:text-green-200 focus:text-green-200 border-gray-300 hover:border-green-200 focus:border-green-200 rounded-2xl transition duration-200" onClick={() => setShowModal(true)} type="button">
      <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    </button>
    <Modal showModal={showModal}>
      <div className="w-screen">
        <div className="bg-white mx-2 lg:w-1/2 lg:mx-auto p-4 rounded-md shadow-md">
          <h3 className="text-center text-xl font-semibold text-gray-300">
            Share something <span className="font-mono">UwU</span>
          </h3>
          <form onSubmit={handleSubmit} autoComplete="off">

            <FormInput
              label="Content"
              name="body"
              textarea={true}
              onChange={handleChange}
              value={data.body}
              error={validation.body}
              autoFocus={true}
            >Write your post here...</FormInput>

            <FormInput
              label="Image"
              name="imageUrl"
              onChange={handleChange}
              value={data.imageUrl}
              error={validation.imageUrl}
            >Image URL (Optional)</FormInput>

            <div className="mt-4 flex justify-between">
              <div className="flex gap-2">
                <Button isDisabled={disableSubmit} type="submit">
                  Create new Post
                </Button>
                <Button onClick={() => setShowModal(false)} color="red">
                  Cancel
                </Button>
              </div>
              {sending ? <Loading /> : <ResponseError response={response} />}
            </div>
          </form>
        </div>
      </div>
    </Modal>
    </>
  );
}