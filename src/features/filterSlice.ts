import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface State {
  filterBy: number | string;
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
    showTag: (state, action: PayloadAction<string>) => {
      state.filterBy = action.payload;
    },
  },
});

export const { showAll, showHigh, showMedium, showLow, showTag } =
  filterSlice.actions;
export default filterSlice.reducer;
