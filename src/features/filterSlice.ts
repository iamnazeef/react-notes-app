import { createSlice } from "@reduxjs/toolkit";

interface State {
  filterBy: number;
}

const initialState: State = {
  filterBy: 0,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    showAll: (state) => {
      state.filterBy = 0;
    },
    showHigh: (state) => {
      state.filterBy = 1;
    },
    showMedium: (state) => {
      state.filterBy = 2;
    },
    showLow: (state) => {
      state.filterBy = 3;
    },
  },
});

export const { showAll, showHigh, showMedium, showLow } = filterSlice.actions;
export default filterSlice.reducer;
