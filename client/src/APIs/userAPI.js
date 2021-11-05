import axios from "axios";
import { SERVER_API_URL } from "../config.json";
import { getToken, getCsrfToken } from "./authAPI";
import { store } from "../redux/store";
import { setUser, initialState } from "../redux/userSlice";
import { setLoggedIn } from "../redux/authSlice";

const dispatch = store.dispatch;

const checkAvailability = async (data) => {
  await axios.post(`${SERVER_API_URL}/users`, data);
};

const account = async () => {
  const token = getToken();
  const { data } = await axios.post(`${SERVER_API_URL}/users/account`, null, {
    withCredentials: true,
    headers: {
      "authorization": `Bearer ${token}`,
      "csrf-token": getCsrfToken()
    }
  });
  dispatch(setUser(data));
};

const changeAvatar = async (newAvatar) => {
  const token = getToken();
  await axios.put(`${SERVER_API_URL}/users/avatar`, { newAvatar }, {
    withCredentials: true,
    headers: {
      "authorization": `Bearer ${token}`,
      "csrf-token": getCsrfToken()
    }
  });
};

const changeNickname = async (newNickname) => {
  const token = getToken();
  await axios.put(`${SERVER_API_URL}/users/nickname`, { newNickname }, {
    withCredentials: true,
    headers: {
      "authorization": `Bearer ${token}`,
      "csrf-token": getCsrfToken()
    }
  });
};

const changePassword = async ({ currentPassword, newPassword }) => {
  const token = getToken();
  await axios.put(`${SERVER_API_URL}/users/password`, {
    currentPassword,
    newPassword
  }, {
    withCredentials: true,
    headers: {
      "authorization": `Bearer ${token}`,
      "csrf-token": getCsrfToken()
    }
  });
};

const changeEmail = async ({ password, newEmail }) => {
  const token = getToken();
  await axios.put(`${SERVER_API_URL}/users/email`, {
    password,
    newEmail
  }, {
    withCredentials: true,
    headers: {
      "authorization": `Bearer ${token}`,
      "csrf-token": getCsrfToken()
    }
  });
};

const register = async (data) => {
  await axios.post(`${SERVER_API_URL}/users/register`, data, {
    withCredentials: true,
    headers: {
      "csrf-token": getCsrfToken()
    }
  });
  await account();
};

const login = async (data) => {
  await axios.post(`${SERVER_API_URL}/users/login`, data, {
    withCredentials: true,
    headers: {
      "csrf-token": getCsrfToken()
    }
  });
  await account();
};

const logout = async () => {
  const token = getToken();
  await axios.post(`${SERVER_API_URL}/users/logout`, null, {
    withCredentials: true,
    headers: {
      "authorization": `Bearer ${token}`,
      "csrf-token": getCsrfToken()
    }
  });
  dispatch(setLoggedIn(false));
  dispatch(setUser(initialState));
};

const deleteAccount = async (password) => {
  const token = getToken();
  const { data: response } = await axios.put(`${SERVER_API_URL}/users`, { password }, {
    withCredentials: true,
    headers: {
      "authorization": `Bearer ${token}`,
      "csrf-token": getCsrfToken()
    }
  });
  dispatch(setLoggedIn(false));
  dispatch(setUser(initialState));
  return response;
};

const info = async (username) => {
  const { data: response } = await axios.get(`${SERVER_API_URL}/users/${username}/info`);
  return response;
};

const follow = async (username) => {
  const token = getToken();
  const { data: response } = await axios.post(`${SERVER_API_URL}/users/${username}/follow`, null, {
    withCredentials: true,
    headers: {
      "authorization": `Bearer ${token}`,
      "csrf-token": getCsrfToken()
    }
  });
  return response;
};

const unfollow = async (username) => {
  const token = getToken();
  const { data: response } = await axios.post(`${SERVER_API_URL}/users/${username}/unfollow`, null, {
    withCredentials: true,
    headers: {
      "authorization": `Bearer ${token}`,
      "csrf-token": getCsrfToken()
    }
  });
  return response;
};

const followsInfo = async () => {
  const token = getToken();
  const { data: response } = await axios.post(`${SERVER_API_URL}/users/me/follows`, null, {
    withCredentials: true,
    headers: {
      "authorization": `Bearer ${token}`,
      "csrf-token": getCsrfToken()
    }
  });
  return response;
};

const userAPI = {
  checkAvailability,
  register,
  login,
  logout,
  account,
  changeAvatar,
  changeNickname,
  changePassword,
  changeEmail,
  deleteAccount,
  info,
  follow,
  unfollow,
  followsInfo,
};

export default userAPI;