import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "../features/notesSlice";
import userReducer from "../features/userSlice";

export const store = configureStore({
  reducer: {
    notes: notesReducer,
    user: userReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
