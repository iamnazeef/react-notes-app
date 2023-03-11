import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "../features/notesSlice";
import userReducer from "../features/userSlice";
import filterReducer from "../features/filterSlice";
import tagsReducer from "../features/tagsSlice";
import snackbarReducer from "../features/snackbar";
import themeReducer from "../features/themeSlice";


export const store = configureStore({
  reducer: {
    notes: notesReducer,
    user: userReducer,
    filter: filterReducer,
    tags: tagsReducer,
    snackbar: snackbarReducer,
    theme: themeReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
