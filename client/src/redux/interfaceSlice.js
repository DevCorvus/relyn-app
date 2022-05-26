import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showDashboardOnMobile: false,
};

const interfaceSlice = createSlice({
  name: 'interface',
  initialState,
  reducers: {
    setShowDashboardOnMobile: (state, action) => {
      state.showDashboardOnMobile = action.payload;
    },
  },
});

export const { setShowDashboardOnMobile, setEditProfile } =
  interfaceSlice.actions;
export const getShowDashboardOnMobileStatus = (state) =>
  state.interface.showDashboardOnMobile;

export default interfaceSlice.reducer;
