import { createSlice } from "@reduxjs/toolkit";

interface State {
    isDarkMode: boolean;
}

const initialState: State = {
    isDarkMode: false
}

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleDarkMode: (state) => {
            state.isDarkMode = true;
            localStorage.setItem('theme', 'true');
        },
        toggleLightMode: (state) => {
            state.isDarkMode = false;
            localStorage.setItem('theme', 'false');
        }
    }
})

export const { toggleDarkMode, toggleLightMode } = themeSlice.actions;
export default themeSlice.reducer;