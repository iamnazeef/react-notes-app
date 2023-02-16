import { createSlice } from "@reduxjs/toolkit";

interface State {
  isLoggedIn: boolean;
}

const initialState: State = {
  isLoggedIn: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loggedIn: (state) => {
      state.isLoggedIn = true;
    },
    loggedOut: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { loggedIn, loggedOut } = userSlice.actions;
export default userSlice.reducer;
