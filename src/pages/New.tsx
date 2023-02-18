import NoteForm from "../components/NoteForm";
import { useDispatch } from "react-redux";
import { note, save } from "../features/notesSlice";
import { db } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";

const New = () => {
  const dispatch = useDispatch();

  const addToFirestore = async (note: note) => {
    try {
      await addDoc(collection(db, "notes"), note);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const onSubmit = (note: note): void => {
    //Redux state management
    dispatch(save(note));

    //Firestore
    addToFirestore(note);
  };

  return (
    <main className="px-3 pt-4 font-manrope w-full bg-darkmode text-gray-200">
      <section className="w-full max-w-[600px] mx-auto">
        <h2 className="text-xl font-medium">Create new note</h2>
        <section className="noteform">
          <NoteForm onSubmit={onSubmit} id={""} />
        </section>
      </section>
    </main>
  );
};

export default New;
