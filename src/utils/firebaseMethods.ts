import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";
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
