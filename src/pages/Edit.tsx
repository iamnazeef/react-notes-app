import { useParams } from "react-router-dom";
import NoteForm from "../components/NoteForm";
import { note, update } from "../features/notesSlice";
import { useDispatch } from "react-redux";

const Edit = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const id: string = params.id!.toString();

  const onSubmit = (note: note) => {
    dispatch(update(note));
  };

  return (
    <main className="px-3 pt-20 min-h-screen font-manrope w-full bg-darkmode text-gray-200">
      <section className="w-full max-w-[600px] mx-auto">
        <h2 className="text-xl font-medium">Edit note</h2>
        <section className="noteform">
          <NoteForm onSubmit={onSubmit} id={id} />
        </section>
      </section>
    </main>
  );
};

export default Edit;
