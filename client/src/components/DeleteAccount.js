import React, { useState, useEffect } from 'react';
import val from "validator";
import userAPI from "../APIs/userAPI";
import Button from "./Button";
import Modal from "./Modal";
import ModalContainer from "./ModalContainer";
import FormInput from './FormInput';
import ContextLabel from "./ContextLabel";
import ResponseError from './errors/ResponseError';


export default function DeleteAccount() {
  const [showModal, setShowModal] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [response, setResponse] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setPassword("");
      await userAPI.deleteAccount(password);
      setShowModal(false);
    } catch(err) {
      setResponse(err.response.data);
      setTimeout(() => {
        setResponse("");
      }, 3000);
    };
  };

  useEffect(() => {
    !val.isLength(password, { min: 8, max: 250 })
    ? setDisableSubmit(true) : setDisableSubmit(false);
  }, [password]);

  return (
    <div title="NOTE: This option was disabled due to numerous problems that due to lack of time I do not intend to fix. Thanks for your understanding ♥">
      <Button isDisabled={true} fullWidth={true} color="red" onClick={() => setShowModal(true)} type="button">
        Delete Account
      </Button>
      <Modal showModal={showModal}>
        <ModalContainer>
          <ResponseError response={response} outside={true} />
          <form className="flex flex-col gap-2" onSubmit={handleSubmit} autoComplete="off">
            <ContextLabel>Delete Account</ContextLabel>

            <FormInput
              label="Password"
              type="password"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoFocus={true}
            >Password</FormInput>

            <div className="mt-2">
              <Button isDisabled={disableSubmit} type="submit">
                Delete Account Permanently
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