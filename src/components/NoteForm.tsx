import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { auth } from "../firebase/config";
import { note } from "../features/notesSlice";

interface Props {
  onSubmit: (data: note) => void;
  id: string;
}

const NoteForm = ({ onSubmit, id }: Props) => {
  const [noteLength, setNoteLength] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [priority, setPriority] = useState<number>(1);
  const [note, setNote] = useState<string>("");
  const [editNoteId, setEditNoteId] = useState<string>("");
  const navigate = useNavigate();
  const date: Date = new Date();
  const notes = useSelector((state: RootState) => state.notes.notes);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    //Saving note
    onSubmit({
      content: note,
      created_date: `${date.getDate()}-${
        date.getMonth() + 1
      }-${date.getFullYear()}`,
      note_id: id ? editNoteId : "" + uuid(),
      priority: priority,
      timestamp: Date.now(),
      title: title,
      user_id: auth.currentUser!.uid,
    });

    navigate("..");
  };

  useEffect(() => {
    //Condition to check if NoteForm.tsx is rendered for updating / creating note.
    if (id !== "") {
      notes.map((note) => {
        if (note.note_id === id) {
          setTitle(note.title);
          setPriority(note.priority);
          setNote(note.content);
          setNoteLength(note.content.length);
          setEditNoteId(note.note_id);
        }
      });
    }
  }, []);

  return (
    <form onSubmit={handleSubmit} className="pb-5 pt-6 space-y-5">
      <input
        type="text"
        name="title"
        id="title"
        className="w-full tracking-wide py-1.5 px-2.5 bg-darkmode border-b border-gray-700 outline-none placeholder:text-xl"
        placeholder="Title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        required
        autoFocus
      />
      <select
        name="importance"
        id="importance"
        className="p-1.5 text-lg text-gray-400 tracking-wide w-full max-w-[200px] bg-darkmode outline-none border-b border-gray-700"
        value={priority}
        onChange={(event) => setPriority(Number(event.target.value))}
      >
        <option value="1">High priority</option>
        <option value="2">Medium priority</option>
        <option value="3">Low priority</option>
      </select>
      <textarea
        name="content"
        id="content"
        className="block font-normal tracking-wider w-full py-1.5 px-2.5 resize-none bg-darkmode border-b border-gray-700 outline-none placeholder:text-base"
        rows={12}
        placeholder="Write..."
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
            className="border font-medium py-1 px-2.5 border-gray-600 rounded-[0.225rem] bg-darkmode hover:border-gray-400"
          >
            Save
          </button>
          <Link to="..">
            <button
              type="button"
              className="border font-medium py-1 px-2.5 border-gray-600 rounded-[0.225rem] bg-darkmode hover:border-gray-400"
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
