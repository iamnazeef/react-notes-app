import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect, useState } from "react";
import { deleteNote, note } from "../features/notesSlice";
import EditIcon from "../assets/icons/EditIcon";
import BackIcon from "../assets/icons/BackIcon";
import DeleteIcon from "../assets/icons/DeleteIcon";
import { useDispatch } from "react-redux";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase/config";
import Tooltip from "@mui/material/Tooltip";

const View = () => {
  const { id } = useParams();
  const { notes } = useSelector((state: RootState) => state.notes);
  const [docId, setDocId] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentNote, setCurrentNote] = useState<note>({
    note_id: "",
    title: "",
    priority: 0,
    content: "",
    created_date: "",
    timestamp: 0,
    user_id: "",
  });

  const getDocId = async () => {
    const notesRef = collection(db, "notes");
    const q = query(notesRef, where("note_id", "==", id!.toString()));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setDocId(doc.id);
    });
  };

  const deleteInFirestore = async () => {
    try {
      await deleteDoc(doc(db, "notes", docId));
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const handleDelete = (id: string) => {
    //Redux store data delete
    dispatch(deleteNote(id));

    //Firestore data delete
    deleteInFirestore();

    navigate("/");
  };

  const handleGoBack = () => {
    navigate("..");
  };

  const handleEdit = () => {
    navigate(`edit?docid=${docId}`);
  };

  const getNote = () => {
    notes.map((note) => {
      if (id === note.note_id) {
        setCurrentNote(note);
      }
    });
  };

  useEffect(() => {
    getNote();
    getDocId();
    if (currentNote.priority === 1) {
      setColor("bg-red-500 border-red-500");
    } else if (currentNote.priority === 2) {
      setColor("bg-yellow-500 border-yellow-500");
    } else {
      setColor("bg-green-500 border-green-500");
    }
  }, [notes]);

  return (
    <main className="p-3 pt-4 font-manrope w-full bg-darkmode text-gray-200">
      <section className="w-full max-w-[900px] mx-auto">
        <section className="flex justify-between items-start w-full">
          <h2 className="note-title self-center text-2xl font-semibold break-words max-w-[200px] tablet:max-w-[300px] laptop:max-w-[600px]">
            {currentNote.title}
          </h2>
          <section className="flex space-x-1.5 items-center justify-center">
            <Tooltip title="Delete">
              <button
                className="p-2 rounded-full hover:text-red-500 hover:bg-gray-700"
                onClick={() => handleDelete(currentNote.note_id)}
              >
                <DeleteIcon />
              </button>
            </Tooltip>
            <Tooltip title="Edit">
              <button
                onClick={handleEdit}
                className="p-2 rounded-full hover:text-yellow-400 hover:bg-gray-700"
              >
                <EditIcon />
              </button>
            </Tooltip>
            <Tooltip title="Back">
              <button
                onClick={handleGoBack}
                className="p-2 rounded-full hover:text-green-500 hover:bg-gray-700"
              >
                <BackIcon />
              </button>
            </Tooltip>
          </section>
        </section>
        <section className="mt-5">
          <section className="flex justify-start items-center space-x-2.5">
            <section className="note-creation-date text-sm mt-[0.390rem] font-medium text-gray-500">
              Created on: {currentNote.created_date}
            </section>
            <Tooltip
              title={`${
                currentNote.priority === 1
                  ? "High priority"
                  : currentNote.priority === 2
                  ? "Medium priority"
                  : "Low priority"
              }`}
            >
              <div
                className={`border ${color} min-h-[0.450rem] max-h-[0.450rem] min-w-[0.450rem] max-w-[0.450rem] rounded-full ${color} mt-1`}
                aria-label={`${
                  currentNote.priority === 1
                    ? "High priority"
                    : currentNote.priority === 2
                    ? "Medium priority"
                    : "Low priority"
                }`}
              ></div>
            </Tooltip>
          </section>
          <section className="note-content mt-2 break-words text-base leading-8 tracking-wide">
            {currentNote.content}
          </section>
        </section>
      </section>
    </main>
  );
};

export default View;
