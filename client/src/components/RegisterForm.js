import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { autoSetAuth } from '../APIs/authAPI';
import val from 'validator';
import userAPI from '../APIs/userAPI';
import useValidation from '../hooks/useValidation';
import Button from './Button';
import Loading from './loadings/Loading';
import FormInput from './FormInput';
import ResponseError from './errors/ResponseError';

const initialState = {
  username: '',
  email: '',
  password: '',
  passwordConfirmation: '',
};

export default function RegisterForm() {
  const history = useHistory();
  const [response, setResponse] = useState('');
  const [sending, setSending] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [validation, setValidation] = useState(initialState);
  const [data, setData] = useState(initialState);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(value);
    setData({ ...data, [name]: value });
    if (name === 'username') {
      !val.isLength(value, { min: 4, max: 50 }) || !val.isAlphanumeric(value)
        ? setValidation({ ...validation, username: 'Invalid username' })
        : setValidation({ ...validation, username: '' });
    } else if (name === 'email') {
      !val.isEmail(value) || !val.isLength(value, { max: 200 })
        ? setValidation({ ...validation, email: 'Invalid email' })
        : setValidation({ ...validation, email: '' });
    } else if (name === 'password') {
      !val.isLength(value, { min: 8, max: 250 }) || !val.isAlphanumeric(value)
        ? setValidation({ ...validation, password: 'Invalid password' })
        : setValidation({ ...validation, password: '' });
    }
  };

  const handleDataAvailability = async (data) => {
    try {
      await userAPI.checkAvailability(data);
    } catch (err) {
      const errorMessage = err.response.data;
      if (errorMessage.startsWith('Username'))
        setValidation({ ...validation, username: errorMessage });
      if (errorMessage.startsWith('Email'))
        setValidation({ ...validation, email: errorMessage });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    try {
      setValidation(initialState);
      setData(initialState);
      await userAPI.register(data);
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

  useEffect(() => {
    const username = data.username;
    if (username.length > 0) {
      const lastIndex = username.length - 1;
      if (username[lastIndex] === ' ') {
        setData((prevData) => ({
          ...prevData,
          username: username.slice(0, lastIndex),
        }));
      }
    }
  }, [data.username]);

  useEffect(() => {
    data.password !== data.passwordConfirmation
      ? setValidation((prevState) => ({
          ...prevState,
          passwordConfirmation: "Passwords doesn't match",
        }))
      : setValidation((prevState) => ({
          ...prevState,
          passwordConfirmation: '',
        }));
  }, [data.password, data.passwordConfirmation]);

  useValidation(data, validation, setDisableSubmit);

  return (
    <>
      <ResponseError response={response} />
      <form
        className="flex flex-col gap-2"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <FormInput
          label="Username"
          name="username"
          value={data.username}
          onChange={handleChange}
          error={validation.username}
          onBlur={() => handleDataAvailability({ username: data.username })}
          autoFocus={true}
        >
          Username
        </FormInput>

        <FormInput
          label="Email"
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          error={validation.email}
          onBlur={() => handleDataAvailability({ email: data.email })}
        >
          Email
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

        <FormInput
          type="password"
          name="passwordConfirmation"
          value={data.passwordConfirmation}
          onChange={handleChange}
          error={validation.passwordConfirmation}
        >
          Repeat password
        </FormInput>

        <Button fullWidth={true} isDisabled={disableSubmit} type="submit">
          Register
        </Button>

        {sending && <Loading />}
      </form>
    </>
  );
}
