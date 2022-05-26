import axios from 'axios';
import Cookies from 'js-cookie';
import {
  COOKIE_NAME,
  ANOTHER_COOKIE_NAME,
  SERVER_API_URL,
} from '../config.json';
import { store } from '../redux/store';
import { setLoggedIn } from '../redux/authSlice';
import { setUser, initialState } from '../redux/userSlice';

const dispatch = store.dispatch;

export const getToken = () => Cookies.get(COOKIE_NAME);
export const getCsrfToken = () => Cookies.get('CSRF-TOKEN');

export const accessTokenExists = () => {
  const cookie = getToken();
  if (!cookie) return false;
  return true;
};

export const refreshTokenExists = () => {
  Cookies.set(ANOTHER_COOKIE_NAME, 'LEEEEEEEEROY JENKIIINS');
  const cookie = Cookies.get(ANOTHER_COOKIE_NAME);
  if (cookie) {
    Cookies.remove(ANOTHER_COOKIE_NAME);
    return false;
  }
  return true;
};

export const checkAuth = () => accessTokenExists() && refreshTokenExists();

export const autoSetAuth = () => {
  if (refreshTokenExists()) {
    dispatch(setLoggedIn(true));
  } else {
    dispatch(setLoggedIn(false));
    dispatch(setUser(initialState));
  }
};

export const refreshToken = async () => {
  try {
    await axios.post(`${SERVER_API_URL}/auth/token`, null, {
      withCredentials: true,
    });
  } catch (e) {
    // ...
  } finally {
    autoSetAuth();
  }
};

export const csrfToken = async () => {
  try {
    await axios.post(`${SERVER_API_URL}/auth/csrf`, null, {
      withCredentials: true,
    });
  } catch (e) {
    // ...
  }
};
