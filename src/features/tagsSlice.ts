import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface State {
  tags: string[];
}

const initialState: State = {
  tags: [],
};

const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    addTag: (state, action: PayloadAction<string>) => {
      state.tags.unshift(action.payload);
    },
    clearTag: (state) => {
      state.tags = initialState.tags;
    },
  },
});

export const { addTag, clearTag } = tagsSlice.actions;
export default tagsSlice.reducer;
