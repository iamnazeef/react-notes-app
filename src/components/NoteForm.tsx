import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NewNoteType } from "../pages/New";
import { v4 as uuid } from "uuid";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

interface NoteFormProps {
  onSubmit: (data: NewNoteType) => void;
  id: string;
}

const NoteForm = ({ onSubmit, id }: NoteFormProps) => {
  const [noteLength, setNoteLength] = useState<number>(0);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("0");
  const [note, setNote] = useState("");
  const [editNoteId, setEditNoteId] = useState("");
  const navigate = useNavigate();
  const date: Date = new Date();
  const notes = useSelector((state: RootState) => state.notes.notes);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    //Saving note
    onSubmit({
      id: id ? editNoteId : "" + uuid(),
      title: title,
      priority: priority,
      note: note,
      date: `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`,
      time: `${Math.ceil(date.getHours() / 12)}:${Math.ceil(
        date.getMinutes()
      )} ${Math.ceil(date.getHours()) < 12 ? "AM" : "PM"}`,
    });

    navigate("..");
  };

  useEffect(() => {
    //Condition to check if NoteForm.tsx is rendered for updating / creating note.
    if (id !== "") {
      notes.map((note) => {
        if (note.id === id) {
          setTitle(note.title);
          setPriority(note.priority);
          setNote(note.note);
          setNoteLength(note.note.length);
          setEditNoteId(note.id);
        }
      });
    }
  }, []);

  return (
    <form onSubmit={handleSubmit} className="py-5 space-y-5">
      <input
        type="text"
        name="title"
        id="title"
        className="w-full font-semibold tracking-wide py-1.5 px-2.5 rounded-md bg-gray-700 outline-none focus:outline-purple-500"
        placeholder="Title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        required
        autoFocus
      />
      <select
        name="importance"
        id="importance"
        className="p-1.5 font-semibold tracking-wide w-full max-w-[160px] rounded-md bg-gray-700 outline-none focus:outline-purple-500"
        value={priority}
        onChange={(event) => setPriority(event.target.value)}
      >
        <option value="0" disabled>
          Set priority
        </option>
        <option value="1">High priority</option>
        <option value="2">Medium priority</option>
        <option value="3">Low priority</option>
      </select>
      <textarea
        name="content"
        id="content"
        className="block font-semibold tracking-wide w-full py-1.5 px-2.5 resize-none rounded-md bg-gray-700 outline-none focus:outline-purple-500"
        rows={12}
        placeholder="Note (markdown supported)"
        value={note}
        onChange={(event) => {
          setNoteLength(event.target.value.length);
          setNote(event.target.value);
        }}
        required
      />
      <section className="flex flex-row-reverse items-center justify-between">
        <section className="space-x-2.5">
          <button
            type="submit"
            className="border font-medium py-1 px-2.5 border-gray-600 rounded-md bg-darkmode hover:border-gray-400"
          >
            Save
          </button>
          <Link to="..">
            <button
              type="button"
              className="border font-medium py-1 px-2.5 border-gray-600 rounded-md bg-darkmode hover:border-gray-400"
            >
              Cancel
            </button>
          </Link>
        </section>
        <section className="space-x-2.5 font-medium break-words text-gray-500">
          <p>Chars: {noteLength}</p>
        </section>
      </section>
    </form>
  );
};

export default NoteForm;
