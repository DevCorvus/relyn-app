import React, { useState } from 'react';
import commentAPI from '../APIs/commentAPI';
import Button from './Button';
import FormInput from './FormInput';

export default function CommentEditForm({
  id,
  body,
  setBody,
  setIsEdited,
  setEditable,
}) {
  const [newBody, setNewBody] = useState(body);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newBody === body) return setEditable(false);
    try {
      setBody(newBody);
      setEditable(false);
      setIsEdited(true);
      await commentAPI.edit(id, { body: newBody });
    } catch (err) {
      // ...
    }
  };

  return (
    <form className="my-2" onSubmit={handleSubmit} autoComplete="off">
      <div className="flex flex-col gap-1">
        <FormInput
          label="Edit Comment"
          name="newBody"
          value={body}
          onChange={(e) => setNewBody(e.target.value)}
          defaultValue={true}
        >
          Comment
        </FormInput>

        <div className="mt-2 flex flex-col lg:flex-row gap-1 lg:gap-2">
          <Button type="submit">Apply</Button>
          <Button
            color="red"
            onClick={() => setEditable((prevState) => !prevState)}
          >
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
}
