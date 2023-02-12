import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { RootState } from "../store/store";

export interface note {
  id: string;
  title: string;
  priority: string;
  note: string;
  date: string;
  time: string;
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
      state.notes.push(action.payload);
    },
    delete: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
    update: (state, action: PayloadAction<note>) => {
      state.notes.map((note) => {
        if (note.id === action.payload.id) {
          note.title = action.payload.title;
          note.note = action.payload.note;
          note.priority = action.payload.priority;
        }
      });
    },
  },
});

export const { delete: deleteNote, save, update } = notesSlice.actions;
export default notesSlice.reducer;
// export const selectNotes = (state: RootState) => state.notes.notes;
