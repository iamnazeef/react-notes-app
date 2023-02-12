import { useParams } from "react-router-dom";
import NoteForm from "../components/NoteForm";
import { note, update } from "../features/notesSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Edit = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const id: string = params.id!.toString();
  const { isDarkMode } = useSelector((state: RootState) => state.theme);

  const onSubmit = (note: note) => {
    dispatch(update(note));
  };

  return (
    <main
      className={`p-3 pt-20 font-manrope w-full min-h-screen ${
        isDarkMode ? "bg-darkmode text-gray-200" : "bg-gray-50"
      }`}
    >
      <section className="w-full max-w-[580px] mx-auto">
        <h2 className="text-xl font-medium">Edit note</h2>
        <NoteForm onSubmit={onSubmit} id={id} />
      </section>
    </main>
  );
};

export default Edit;
