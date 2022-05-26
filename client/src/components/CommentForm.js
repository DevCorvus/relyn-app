import React, { useEffect, useState } from 'react';
import commentAPI from '../APIs/commentAPI';
import Loading from './loadings/Loading';
import Button from './Button';
import FormInput from './FormInput';
import ResponseError from './errors/ResponseError';

export default function CommentForm({ postId, setComments, setCommentsCount }) {
  const [sending, setSending] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [comment, setComment] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    try {
      const body = comment;
      setComment('');
      const newComment = await commentAPI.create(postId, { body });
      setComments((prevComments) => [...prevComments, newComment]);
      setCommentsCount((prevState) => prevState + 1);
    } catch (err) {
      setResponse(err.response.data);
      setTimeout(() => {
        setResponse('');
      }, 3000);
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    comment.length > 0 && comment.length < 500
      ? setDisableSubmit(false)
      : setDisableSubmit(true);
  }, [comment]);

  return (
    <div className="mt-4 border border-gray-200 p-4 mb-2 rounded-md shadow-sm">
      <form onSubmit={handleSubmit} autoComplete="off">
        <FormInput
          label="Comment"
          name="comment"
          textarea={true}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        >
          Write your comment here...
        </FormInput>

        <div className="mt-3 flex justify-between">
          <Button isDisabled={disableSubmit} type="submit">
            Post Comment
          </Button>
          {sending ? <Loading /> : <ResponseError response={response} />}
        </div>
      </form>
    </div>
  );
}
