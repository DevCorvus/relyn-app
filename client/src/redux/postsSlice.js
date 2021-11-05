import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addToPosts: (state, action) => {
      return state = [action.payload, ...state];
    },
    removeFromPosts: (state, action) => {
      const _id = action.payload;
      return state = state.filter(post => post._id !== _id);
    },
    setPosts: (state, action) => {
      return state = [...state, ...action.payload];
    },
    resetPosts: (state, action) => {
      return state = initialState;
    }
  },
});

export const { addToPosts, removeFromPosts, setPosts, resetPosts } = postsSlice.actions;
export const selectPosts = state => state.posts;

export default postsSlice.reducer;