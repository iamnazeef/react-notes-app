import { createSlice } from "@reduxjs/toolkit";

interface State {
  isDarkMode: boolean;
}

const initialState: State = {
  isDarkMode: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggle: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const { toggle } = themeSlice.actions;
export default themeSlice.reducer;
