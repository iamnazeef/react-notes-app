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
  const { isDarkMode } = useSelector((state: RootState) => state.theme);

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
    //For editing note.
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
        className={`w-full py-1.5 px-2.5 rounded-md ${
          isDarkMode
            ? "bg-gray-700 outline-none focus:outline-purple-500"
            : "border border-gray-600 bg-gray-50"
        }`}
        placeholder="Title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        required
        autoFocus
      />
      <select
        name="importance"
        id="importance"
        className={` p-1.5 w-full max-w-[151px] rounded-md ${
          isDarkMode
            ? "bg-gray-700 outline-none focus:outline-purple-500"
            : "border border-gray-600 bg-gray-50"
        }`}
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
        className={`block w-full py-1.5 px-2.5 resize-none rounded-md ${
          isDarkMode
            ? "bg-gray-700 outline-none focus:outline-purple-500"
            : "border border-gray-600 bg-gray-50"
        }`}
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
            className={`border py-1 px-2.5 border-gray-600 rounded-md ${
              isDarkMode
                ? "bg-darkmode hover:border-gray-400"
                : "bg-gray-50 hover:shadow-perfect"
            }`}
          >
            Save
          </button>
          <Link to="..">
            <button
              type="button"
              className={`border py-1 px-2.5 border-gray-600 rounded-md ${
                isDarkMode
                  ? "bg-darkmode hover:border-gray-400"
                  : "bg-gray-50 hover:shadow-perfect"
              }`}
            >
              Cancel
            </button>
          </Link>
        </section>
        <section className="space-x-2.5 break-words text-gray-500">
          <p>Chars: {noteLength}</p>
        </section>
      </section>
    </form>
  );
};

export default NoteForm;
