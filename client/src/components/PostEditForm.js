import React, { useState } from "react";
import Button from "./Button";
import postAPI from "../APIs/postAPI";
import useValidation from "../hooks/useValidation";
import { postValidation } from "../utils/postValidation";
import FormInput from "./FormInput";

export default function PostEditForm({ id, currentData, setCurrentData, setIsEdited, setEditable }) {
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [newData, setNewData] = useState(currentData);
  const [validation, setValidation] = useState({ body: "", imageUrl: "" });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    postValidation(name, value, setValidation);
    setNewData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validation.body || validation.imageUrl) return;
    if (newData.body === currentData.body && newData.imageUrl === currentData.imageUrl) return setEditable(false);
    try {
      setCurrentData(newData);
      setEditable(false);
      setIsEdited(true);
      await postAPI.edit(id, newData);
    } catch (err) {
      // ...
    }
  };

  useValidation(newData, validation, setDisableSubmit, ["imageUrl"]);

  return (
    <form className="my-2" onSubmit={handleSubmit} autoComplete="off">
      <div className="flex flex-col gap-1">

        <FormInput
          label="Edit Content"
          name="body"
          id="newBody"
          textarea={true}
          onChange={handleChange}
          value={newData.body}
          defaultValue={true}
          error={validation.body}
        >Write your post here...</FormInput>

        <FormInput
          label="Edit Image URL"
          name="imageUrl"
          id="newImageUrl"
          onChange={handleChange}
          value={newData.imageUrl}
          defaultValue={true}
          error={validation.imageUrl}
        >Image URL (Optional)</FormInput>

        <div className="mt-2 flex flex-col lg:flex-row gap-1 lg:gap-2">
          <Button isDisabled={disableSubmit} type="submit">
            Apply Changes
          </Button>
          <Button color="red" onClick={(() => setEditable(prevState => !prevState))}>
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
}
