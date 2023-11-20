import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pagination_main: {
    pageIndex: 0,
    pageSize: 10,
  },
  pagination_relation: {
    pageIndex: 0,
    pageSize: 10,
  },
};

export const { actions: paginationChange, reducer: paginationReducer } =
  createSlice({
    name: "pagination",
    initialState,
    reducers: {
      setPaginationMain: (state, { payload }) => {
        state.pagination_main = payload;
      },
      setPaginationRelation: (state, { payload }) => {
        state.pagination_relation = payload;
      },
    },
  });
