import React, { useState } from "react";
import val from "validator";
import userAPI from "../APIs/userAPI";
import useValidation from "../hooks/useValidation";
import Button from "./Button";
import Modal from "./Modal";
import ModalContainer from "./ModalContainer";
import FormInput from "./FormInput";
import ContextLabel from "./ContextLabel";
import ResponseError from "./errors/ResponseError";

const initialState = {
  password: "",
  newEmail: ""
};

export default function ChangeEmail() {
  const [showModal, setShowModal] = useState(false);
  const [response, setResponse] = useState("");
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [validation, setValidation] = useState(initialState);
  const [data, setData] = useState(initialState);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
    if (name === "password") {
      !val.isLength(value, { min: 8, max: 250 })
      ? setValidation({ ...validation, password: "Invalid password" })
      : setValidation({ ...validation, password: "" });
    } else if (name === "newEmail") {
      !val.isEmail(value) || !val.isLength(value, { max: 200 })
      ? setValidation({ ...validation, newEmail: "Invalid Email" })
      : setValidation({ ...validation, newEmail: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setData(initialState);
      await userAPI.changeEmail(data);
      setShowModal(false);
    } catch(err) {
      setResponse(err.response.data);
      setTimeout(() => {
        setResponse("");
      }, 3000);
    }
  };

  useValidation(data, validation, setDisableSubmit);
  
  return (
    <div>
      <Button fullWidth={true} onClick={() => setShowModal(true)}>
        Change Email
      </Button>
      <Modal showModal={showModal}>
        <ModalContainer>
          <ResponseError response={response} outside={true} />
          <form className="flex flex-col gap-2" autoComplete="off" onSubmit={handleSubmit}>
            <ContextLabel>Change Email</ContextLabel>

            <FormInput
              label="Password"
              type="password"
              name="password"
              value={data.password}
              error={validation.password}
              onChange={handleChange}
              autoFocus={true}
            >Password</FormInput>

            <FormInput
              label="New Email"
              type="email"
              name="newEmail"
              value={data.newEmail}
              error={validation.newEmail}
              onChange={handleChange}
            >New email</FormInput>

            <div className="mt-2">
              <Button isDisabled={disableSubmit} type="submit">
                Submit Change
              </Button>
              <Button color="red" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
            </div>

          </form>
        </ModalContainer>
      </Modal>
    </div>
  );
}