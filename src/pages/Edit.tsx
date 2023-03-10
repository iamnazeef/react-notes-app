import { useParams, useSearchParams } from "react-router-dom";
import NoteForm from "../components/NoteForm";
import { note, update } from "../features/notesSlice";
import { useDispatch } from "react-redux";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const Edit = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const id: string = params.id!.toString();
  const [searchParams, setSearchParams] = useSearchParams();
  let docId = searchParams.get("docid");

  const updateInFirestore = async (note: note) => {
    try {
      await updateDoc(doc(db, "notes", docId!), {
        title: note.title,
        content: note.content,
        priority: note.priority,
        tags: note.tags,
      });
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const onSubmit = (note: note) => {
    //Redux store update
    dispatch(update(note));

    //Firestore update
    updateInFirestore(note);
  };

  return (
    <main className="px-3 pt-4">
      <section className="w-full max-w-[900px] mx-auto">
        <h2 className="text-xl tablet:text-2xl font-bold">Edit note</h2>
        <section className="noteform">
          <NoteForm onSubmit={onSubmit} id={id} />
        </section>
      </section>
    </main>
  );
};

export default Edit;
