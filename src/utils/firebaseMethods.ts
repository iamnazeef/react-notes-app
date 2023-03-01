import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { note } from "../features/notesSlice";

export const addToFirebase = async (col: string, note: note) => {
  await addDoc(collection(db, col), note).catch((error) =>
    console.error(error.message)
  );
};

export const deleteFromFirebase = async (col: string, docId: string) => {
  await deleteDoc(doc(db, col, docId)).catch((error) =>
    console.error(error.message)
  );
};

export const colRef = (col: string) => {
  return collection(db, col);
};

export const getNotes = async (
  setNotes: (value: React.SetStateAction<note[]>) => void,
  col: string
) => {
  try {
    const notesRef = colRef(col);
    const q = query(notesRef, where("user_id", "==", auth.currentUser!.uid));
    await getDocs(q).then((querySnapshot) => {
      const data: note[] = [];
      querySnapshot.forEach((doc) => {
        const d = doc.data();
        data.push(d as note);
      });
      setNotes(data);
    });
  } catch (error: any) {
    console.error(error.message);
  }
};

export const removeFromState = (
  setNotes: (value: React.SetStateAction<note[]>) => void,
  notes: note[],
  currentNote: note
) => {
  setNotes(
    notes.filter((note) => note.note_id !== currentNote.note_id.toString())
  );
};

export const restoreNote = (
  addTo: string,
  deleteFrom: string,
  currentNote: note,
  docId: string,
  setNotes: (value: React.SetStateAction<note[]>) => void,
  notes: note[]
) => {
  try {
    addToFirebase(addTo, currentNote);
    deleteFromFirebase(deleteFrom, docId).then(() =>
      removeFromState(setNotes, notes, currentNote)
    );
  } catch (error: any) {
    console.error(error.message);
  }
};
