import axios from "axios";
import { SERVER_API_URL } from "../config.json";
import { getToken, getCsrfToken } from "./authAPI";
import { urlPusher } from "../utils/general";

const get = async (request, pageNumber, queries) => {
  const { data: response } = await axios.get(urlPusher(`${SERVER_API_URL}/posts?page=${pageNumber}`, queries), {
    cancelToken: request.token
  });
  return response;
};

const show = async (postId) => {
  const { data: response } = await axios.get(`${SERVER_API_URL}/posts/${postId}`);
  return response;
};

const create = async (data) => {
  const token = getToken();
  const { data: response } = await axios.post(`${SERVER_API_URL}/posts`, data, {
    withCredentials: true,
    headers: {
      "authorization": `Bearer ${token}`,
      "csrf-token": getCsrfToken()
    }
  });
  return response;
};

const edit = async (_id, data) => {
  const token = getToken();
  const { data: response } = await axios.put(`${SERVER_API_URL}/posts/${_id}`, data, {
    withCredentials: true,
    headers: {
      "authorization": `Bearer ${token}`,
      "csrf-token": getCsrfToken()
    }
  });
  return response;
};

const remove = async (_id) => {
  const token = getToken();
  await axios.delete(`${SERVER_API_URL}/posts/${_id}`, {
    withCredentials: true,
    headers: {
      "authorization": `Bearer ${token}`,
      "csrf-token": getCsrfToken()
    }
  });
};

const like = async (postId) => {
  const token = getToken();
  await axios.post(`${SERVER_API_URL}/posts/${postId}/like`, {}, {
    withCredentials: true,
    headers: {
      "authorization": `Bearer ${token}`,
      "csrf-token": getCsrfToken()
    }
  });
};

const postAPI = {
  get,
  show,
  create,
  edit,
  remove,
  like,
};

export default postAPI;