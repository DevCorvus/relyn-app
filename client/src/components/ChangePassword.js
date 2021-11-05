import React, { useEffect, useState } from "react";
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
  currentPassword: "",
  newPassword: "",
  newPasswordConfirmation: ""
};

export default function ChangePassword() {
  const [showModal, setShowModal] = useState(false);
  const [response, setResponse] = useState("");
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [validation, setValidation] = useState(initialState);
  const [data, setData] = useState(initialState);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
    !val.isLength(value, { min: 8, max: 250 })
    ? setValidation({ ...validation, [name]: "Invalid password" })
    : setValidation({ ...validation, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setData(initialState);
      await userAPI.changePassword(data);
      setShowModal(false);
    } catch(err) {
      setResponse(err.response.data);
      setTimeout(() => {
        setResponse("");
      }, 3000);
    }
  };

  useEffect(() => {
    data.newPassword !== data.newPasswordConfirmation
    ? setValidation(prevState => ({ ...prevState, newPasswordConfirmation: "Passwords doesn't match" }))
    : setValidation(prevState => ({ ...prevState, newPasswordConfirmation: "" }));
  }, [data.newPassword, data.newPasswordConfirmation]);

  useValidation(data, validation, setDisableSubmit);

  return (
    <div>
      <Button fullWidth={true} onClick={() => setShowModal(true)} type="button">
        Change Password
      </Button>
      <Modal showModal={showModal}>
        <ModalContainer>
          <ResponseError response={response} outside={true} />
          <form className="flex flex-col gap-2" autoComplete="off" onSubmit={handleSubmit}>
            <ContextLabel>Change Password</ContextLabel>

            <FormInput
              label="Current Password"
              type="password"
              name="currentPassword"
              value={data.currentPassword}
              onChange={handleChange}
              error={validation.currentPassword}
              autoFocus={true}
            >Current password</FormInput>

            <FormInput
              label="New Password"
              type="password"
              name="newPassword"
              value={data.newPassword}
              onChange={handleChange}
              error={validation.newPassword}
            >New password</FormInput>

            <FormInput
              label="Repeat new password"
              type="password"
              name="newPasswordConfirmation"
              value={data.newPasswordConfirmation}
              onChange={handleChange}
              error={validation.newPasswordConfirmation}
            >Repeat new password</FormInput>

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