import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface note {
  content: string;
  created_date: string;
  note_id: string;
  priority: number;
  timestamp: number;
  title: string;
  user_id: string;
}

interface State {
  notes: note[];
}

const initialState: State = {
  notes: [],
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    save: (state, action: PayloadAction<note>) => {
      state.notes.unshift(action.payload);
    },
    delete: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter(
        (note) => note.note_id !== action.payload
      );
    },
    update: (state, action: PayloadAction<note>) => {
      state.notes.map((note) => {
        if (note.note_id === action.payload.note_id) {
          note.title = action.payload.title;
          note.content = action.payload.content;
          note.priority = action.payload.priority;
        }
      });
    },
    reset: (state, action: PayloadAction<undefined>) => {
      state.notes = [];
    },
  },
});

export const { delete: deleteNote, save, update, reset } = notesSlice.actions;
export default notesSlice.reducer;
