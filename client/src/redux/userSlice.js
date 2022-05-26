import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  _id: '',
  avatar: '',
  nickname: '',
  follows: [],
  username: '',
  email: '',
  createdAt: '',
  updatedAt: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      return (state = action.payload);
    },
    setAvatar: (state, action) => {
      state.avatar = action.payload;
    },
    setNickname: (state, action) => {
      state.nickname = action.payload;
    },
    follow: (state, action) => {
      state.follows = [action.payload, ...state.follows];
    },
    unfollow: (state, action) => {
      const username = action.payload;
      state.follows = state.follows.filter(
        (follow) => follow.username !== username
      );
    },
  },
});

export const { setUser, setAvatar, setNickname, follow, unfollow } =
  userSlice.actions;
export const selectUser = (state) => state.user;

export default userSlice.reducer;
