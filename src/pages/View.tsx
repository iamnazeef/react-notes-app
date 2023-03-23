import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect, useState } from "react";
import { deleteNote, note, save } from "../features/notesSlice";
import EditIcon from "../assets/icons/EditIcon";
import DeleteIcon from "../assets/icons/DeleteIcon";
import { useDispatch } from "react-redux";
import { getDocs, query, where } from "firebase/firestore";
import Tooltip from "@mui/material/Tooltip";
import ArchiveIcon from "../assets/icons/ArchiveIcon";
import {
  addToFirebase,
  colRef,
  deleteFromFirebase,
} from "../utils/firebaseMethods";
import UnarchiveIcon from "../assets/icons/UnarchiveIcon";
import { openSnackbar, snackMessage } from "../features/snackbar";

const View = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const { notes } = useSelector((state: RootState) => state.notes);
  const { isDarkMode } = useSelector((state: RootState) => state.theme);
  const [docId, setDocId] = useState<string>("");
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
    tags: "",
  });

  const getDocId = async (col: string) => {
    try {
      const notesRef = colRef(col);
      const q = query(notesRef, where("note_id", "==", id!.toString()));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        if (col === "archive") {
          setCurrentNote(doc.data() as note);
        }
        setDocId(doc.id);
      });
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const handelAction = (action: string) => {
    if (action === "delete") {
      addToFirebase("trash", currentNote);
      dispatch(snackMessage("Moved note to trash"));
    } else if (action === "archive") {
      addToFirebase("archive", currentNote);
      dispatch(snackMessage("Note archived"));
    } else if (action === "unarchive") {
      addToFirebase("notes", currentNote);
      deleteFromFirebase("archive", docId);
      dispatch(save(currentNote));
      dispatch(snackMessage("Note unarchived"));
      navigate("/archive");
    }
    dispatch(openSnackbar());
    if (action !== "unarchive") {
      dispatch(deleteNote(currentNote.note_id));
      deleteFromFirebase("notes", docId);
      navigate("/");
    }
  };

  useEffect(() => {
    notes.map((note: note) => {
      if (id === note.note_id) {
        setCurrentNote(note);
      }
    });

    if (searchParams.get("isArchived") === "true") {
      getDocId("archive");
    } else {
      getDocId("notes");
    }
  }, [notes]);

  return (
    <main className="p-3 pt-4 w-full">
      <section className="w-full max-w-[900px] mx-auto">
        <section className="back-button flex items-baseline space-x-2">
          <button
            className="text-xl font-medium hover:underline mb-4"
            onClick={() =>
              navigate(`${searchParams.get("isArchived") ? "/archive" : "/"}`)
            }
          >
            &lt; Go back
          </button>
        </section>
        <section className="flex justify-between items-start w-full">
          <section className="flex items-center justify-start space-x-2 text-xl font-semibold">
            <h2 className="note-title self-center text-2xl font-semibold break-words max-w-[200px] tablet:max-w-[300px] laptop:max-w-[600px]">
              {currentNote.title ? currentNote.title : "Loading..."}
            </h2>
          </section>
          <section className="flex space-x-1.5 items-center justify-center">
            {!searchParams.get("isArchived") && (
              <Tooltip title="Trash">
                <button
                  onClick={() => handelAction("delete")}
                  className={`p-2 rounded-full hover:text-red-500 ${
                    isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
                  }`}
                >
                  <DeleteIcon />
                </button>
              </Tooltip>
            )}
            {!searchParams.get("isArchived") && (
              <Tooltip title="Edit">
                <button
                  onClick={() => navigate(`edit?docid=${docId}`)}
                  className={`p-2 rounded-full hover:text-yellow-400 ${
                    isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
                  }`}
                >
                  <EditIcon />
                </button>
              </Tooltip>
            )}
            <Tooltip
              title={`${
                searchParams.get("isArchived") ? "Unarchive" : "Archive"
              }`}
            >
              {!searchParams.get("isArchived") ? (
                <button
                  onClick={() => handelAction("archive")}
                  className={`p-2 rounded-full hover:text-green-500 ${
                    isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
                  }`}
                >
                  <ArchiveIcon />
                </button>
              ) : (
                <button
                  onClick={() => handelAction("unarchive")}
                  className={`p-2 rounded-full hover:text-green-500 ${
                    isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
                  }`}
                >
                  <UnarchiveIcon />
                </button>
              )}
            </Tooltip>
          </section>
        </section>
        <section className="mt-5">
          <section className="flex justify-start items-center space-x-2.5">
            <section className="note-creation-date text-sm mt-[0.390rem] font-medium text-gray-500">
              Created on:{" "}
              {currentNote.created_date
                ? currentNote.created_date
                : "00-00-0000"}
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
                className={`border min-h-[0.450rem] max-h-[0.450rem] min-w-[0.450rem] max-w-[0.450rem] rounded-full mt-1 ${
                  currentNote.priority === 1
                    ? "bg-red-500 border-red-500"
                    : currentNote.priority === 2
                    ? "bg-yellow-500 border-yellow-500"
                    : currentNote.priority === 3
                    ? "bg-green-500 border-green-500"
                    : "bg-gray-300 border-gray-300"
                }`}
                aria-label={`${
                  currentNote.priority === 1
                    ? "High priority"
                    : currentNote.priority === 2
                    ? "Medium priority"
                    : currentNote.priority === 3
                    ? "Low priority"
                    : "Priority"
                }`}
              ></div>
            </Tooltip>
          </section>
          <section className="note-content mt-2">
            <pre className="font-manrope whitespace-pre-wrap text-base leading-8 tracking-wide">
              {currentNote.content ? currentNote.content : "..."}
            </pre>
          </section>
        </section>
      </section>
    </main>
  );
};

export default View;
