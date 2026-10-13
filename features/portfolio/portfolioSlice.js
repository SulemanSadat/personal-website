import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeFilter: "web",
};

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    setActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
  },
});

export const { setActiveFilter } = portfolioSlice.actions;
export default portfolioSlice.reducer;
