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
  const [tags, setTags] = useState<string>("");
  const navigate = useNavigate();
  const date: Date = new Date();
  const { notes } = useSelector((state: RootState) => state.notes);
  const { isDarkMode } = useSelector((state: RootState) => state.theme);

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
      tags: tags,
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
          setTags(note.tags);
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
        className={`w-full tracking-wide py-1.5 px-2.5 bg-transparent text-xl border ${
          isDarkMode
            ? "border-gray-400 placeholder:text-gray-400"
            : "border-gray-600 placeholder:text-gray-600"
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
        className={`p-1.5 text-lg tracking-wide w-full max-w-[200px] bg-transparent ${
          isDarkMode
            ? "text-gray-200 bg-gray-500 rounded-sm"
            : "text-gray-50 bg-gray-500"
        }`}
        value={priority}
        onChange={(event) => setPriority(Number(event.target.value))}
      >
        <option value="1">High priority</option>
        <option value="2">Medium priority</option>
        <option value="3">Low priority</option>
      </select>
      <input
        className={`w-full border tracking-wide py-1.5 px-2.5 bg-transparent text-lg ${
          isDarkMode
            ? "border-gray-400 placeholder:text-gray-400"
            : "border-gray-600 placeholder:text-gray-600"
        }`}
        placeholder="Tags: #new #imp_note"
        value={tags}
        onChange={(event) => setTags(event.target.value)}
        required
      />
      <textarea
        name="content"
        id="content"
        className={`block border font-normal tracking-wider w-full py-1.5 px-2.5 bg-transparent text-lg ${
          isDarkMode
            ? "border-gray-400 placeholder:text-gray-400"
            : "border-gray-600 placeholder:text-gray-600"
        }`}
        rows={9}
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
            className={`font-medium py-[0.15rem] px-2.5 rounded-[0.225rem] border border-gray-600 ${
              isDarkMode ? "hover:bg-gray-600" : "hover:bg-gray-300"
            }`}
          >
            Save
          </button>
          <Link to="..">
            <button
              type="button"
              className={`font-medium py-[0.15rem] px-2.5 rounded-[0.225rem] border border-gray-600 ${
                isDarkMode ? "hover:bg-gray-600" : "hover:bg-gray-300"
              }`}
            >
              Cancel
            </button>
          </Link>
        </section>
        <section
          className={`space-x-2.5 font-medium break-words ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          <p>Chars: {noteLength}</p>
        </section>
      </section>
    </form>
  );
};

export default NoteForm;
