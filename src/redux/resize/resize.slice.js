import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  resize: {
    value: {},
  },
};

export const { actions: resizeChange, reducer: resizeReducer } = createSlice({
  name: "resize",
  initialState,
  reducers: {
    setResize: (state, { payload }) => {
      state.resize = payload;
    },
  },
});
