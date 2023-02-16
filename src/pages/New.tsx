import NoteForm from "../components/NoteForm";
import { useDispatch } from "react-redux";
import { save } from "../features/notesSlice";

export interface NewNoteType {
  id: string;
  title: string;
  priority: string;
  note: string;
  date: string;
  time: string;
}

const New = () => {
  const dispatch = useDispatch();
  const onSubmit = (data: NewNoteType): void => {
    dispatch(
      save({
        id: data.id,
        title: data.title,
        priority: data.priority,
        note: data.note,
        date: data.date,
        time: data.time,
      })
    );
  };

  return (
    <main className="px-3 pt-20 min-h-screen font-manrope w-full bg-darkmode text-gray-200">
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
