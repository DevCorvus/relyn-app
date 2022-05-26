import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { autoSetAuth } from '../APIs/authAPI';
import val from 'validator';
import userAPI from '../APIs/userAPI';
import useValidation from '../hooks/useValidation';
import Button from './Button';
import Label from './Label';
import FormInput from './FormInput';
import ResponseError from './errors/ResponseError';
import Loading from './loadings/Loading';

const validationInitialState = {
  usernameOrEmail: '',
  password: '',
};

const dataInitialState = {
  usernameOrEmail: '',
  password: '',
  remember: false,
};

export default function LoginForm() {
  const history = useHistory();
  const [response, setResponse] = useState('');
  const [sending, setSending] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [validation, setValidation] = useState(validationInitialState);
  const [data, setData] = useState(dataInitialState);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
    if (name === 'usernameOrEmail') {
      !val.isLength(value, { min: 4, max: 200 })
        ? setValidation({
            ...validation,
            usernameOrEmail: 'Invalid username or email',
          })
        : setValidation({ ...validation, usernameOrEmail: '' });
    } else if (name === 'password') {
      !val.isLength(value, { min: 8, max: 250 })
        ? setValidation({ ...validation, password: 'Invalid password' })
        : setValidation({ ...validation, password: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    try {
      setValidation(validationInitialState);
      setData(dataInitialState);
      await userAPI.login(data);
      autoSetAuth();
      history.push('/');
    } catch (err) {
      setResponse(err.response.data);
      setTimeout(() => {
        setResponse('');
      }, 3000);
    } finally {
      setSending(false);
    }
  };

  useValidation(data, validation, setDisableSubmit);

  return (
    <>
      <ResponseError response={response} />
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <FormInput
          label="Username or Email"
          name="usernameOrEmail"
          value={data.usernameOrEmail}
          onChange={handleChange}
          error={validation.usernameOrEmail}
          autoFocus={true}
        >
          Username or Email
        </FormInput>

        <FormInput
          label="Password"
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
          error={validation.password}
        >
          Password
        </FormInput>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="remember"
            id="remember"
            onChange={() => setData({ ...data, remember: !data.remember })}
          />
          <Label htmlFor="remember">Remember me</Label>
        </div>

        <Button fullWidth={true} isDisabled={disableSubmit} type="submit">
          Let me In!
        </Button>

        {sending && <Loading />}
      </form>
    </>
  );
}
