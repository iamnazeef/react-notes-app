import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect, useState } from "react";
import { deleteNote, note } from "../features/notesSlice";
import EditIcon from "../assets/icons/EditIcon";
import BackIcon from "../assets/icons/BackIcon";
import DeleteIcon from "../assets/icons/DeleteIcon";
import { useDispatch } from "react-redux";
const View = () => {
  const { id } = useParams();
  const { notes } = useSelector((state: RootState) => state.notes);
  const { isDarkMode } = useSelector((state: RootState) => state.theme);
  const [currentNote, setCurrentNote] = useState<note>({
    id: "",
    title: "",
    priority: "",
    note: "",
    date: "",
    time: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (id: string) => {
    dispatch(deleteNote(id));
    navigate("/");
  };

  const handleGoBack = () => {
    navigate("..");
  };

  const handleEdit = () => {
    navigate("edit");
  };

  const getNote = () => {
    notes.map((note) => {
      if (id === note.id) {
        setCurrentNote({
          id: note.id,
          title: note.title,
          priority: note.priority,
          note: note.note,
          date: note.date,
          time: note.time,
        });
      }
    });
  };

  useEffect(() => {
    getNote();
  }, []);

  return (
    <main
      className={`p-3 pt-20 font-manrope min-h-screen w-full ${
        isDarkMode ? "bg-darkmode text-gray-200" : "bg-gray-50"
      }`}
    >
      <section className="w-full max-w-[900px] mx-auto">
        <section className="flex justify-between items-start w-full">
          <h2 className="note-title text-2xl font-semibold break-words max-w-[200px] tablet:max-w-[300px] laptop:max-w-[600px]">
            {currentNote.title}
          </h2>
          <section className="flex flex-row flex-wrap items-center justify-around space-x-2.5">
            <button
              onClick={handleGoBack}
              className={`p-2 rounded-full hover:text-green-500 ${
                isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
              }`}
            >
              <BackIcon />
            </button>
            <button
              onClick={handleEdit}
              className={`p-2 rounded-full hover:text-yellow-400 ${
                isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
              }`}
            >
              <EditIcon />
            </button>
            <button
              className={`p-2 rounded-full hover:text-red-500 ${
                isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
              }`}
              onClick={() => handleDelete(currentNote.id)}
            >
              <DeleteIcon />
            </button>
          </section>
        </section>
        <section className="mt-5">
          <section className="note-creation-date text-sm mt-1.5 font-medium text-gray-500">
            Created on: {currentNote.date}
          </section>
          <section className="note-content mt-2 break-words text-base leading-8 tracking-wide">
            {currentNote.note}
          </section>
        </section>
      </section>
    </main>
  );
};

export default View;
