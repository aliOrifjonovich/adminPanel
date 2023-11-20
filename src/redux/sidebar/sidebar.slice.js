import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expand: false,
  expandSinglePage: false,
};

export const { actions: sideBarExpand, reducer: sideBarExpandReducer } =
  createSlice({
    name: "sideBar",
    initialState,
    reducers: {
      setSideBarExpand: (state) => {
        state.expand = !state.expand;
      },
      setSideBarExpandSinglePage: (state) => {
        state.expandSinglePage = !state.expandSinglePage;
      },

      setOpenSideBarExpandSinglePage: (state) => {
        state.expandSinglePage = true;
      },
    },
  });
