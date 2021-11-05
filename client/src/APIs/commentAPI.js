import axios from "axios";
import { SERVER_API_URL } from "../config.json";
import { getToken, getCsrfToken } from "./authAPI";

const get = async (postId, pageNumber) => {
  const { data } = await axios.get(`${SERVER_API_URL}/posts/${postId}/comments?page=${pageNumber}`);
  return data;
};

const create = async (postId, data) => {
  const token = getToken();
  const { data: response } = await axios.post(`${SERVER_API_URL}/posts/${postId}/comments`, data, {
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
  const { data: response } = await axios.put(`${SERVER_API_URL}/posts/${_id}/comments`, data, {
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
  await axios.delete(`${SERVER_API_URL}/posts/${_id}/comments`, {
    withCredentials: true,
    headers: {
      "authorization": `Bearer ${token}`,
      "csrf-token": getCsrfToken()
    }
  });
};

const commentAPI = {
  get,
  create,
  edit,
  remove,
};

export default commentAPI;