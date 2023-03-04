import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface State {
    open: boolean;
    message: string,
}

const initialState: State = {
    open: false,
    message: "",
}

const snackbarSlice = createSlice({
    name:"snackbar",
    initialState,
    reducers: {
        openSnackbar: (state) => {
            state.open = true;
        },
        closeSnackbar: (state) => {
            state.open = false;
        },
        snackMessage: (state, action: PayloadAction<string>) => {
            state.message = action.payload
        }
    }
})

export const { openSnackbar, closeSnackbar, snackMessage} = snackbarSlice.actions;
export default snackbarSlice.reducer;