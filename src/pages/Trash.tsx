import { getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { note, save } from "../features/notesSlice";
import { useNavigate } from "react-router-dom";
import NoteCard from "../components/NoteCard";
import {
  colRef,
  deleteFromFirebase,
  getNotes,
  removeFromState,
  restoreNote,
} from "../utils/firebaseMethods";
import { IconButton, Modal, Snackbar } from "@mui/material";
import CloseIcon from "../assets/icons/CloseIcon";
import ArchiveTrashFallback from "../components/ArchiveTrashFallback";
import { useDispatch } from "react-redux";
import {
  closeSnackbar,
  openSnackbar,
  snackMessage,
} from "../features/snackbar";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Trash = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { open: openSnack, message } = useSelector(
    (state: RootState) => state.snackbar
  );
  const [notes, setNotes] = useState<note[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentNote, setCurrentNote] = useState<note>({
    content: "",
    created_date: "",
    note_id: "",
    priority: 0,
    timestamp: 0,
    title: "",
    user_id: "",
    tags: "",
  });
  const handleOpen = (note: note) => {
    setCurrentNote(note);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const handleAction = (action: string) => getDocId(action);

  const getDocId = async (action: string) => {
    try {
      const notesRef = colRef("trash");
      const q = query(
        notesRef,
        where("note_id", "==", currentNote.note_id.toString())
      );
      await getDocs(q)
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (action === "delete") {
              deleteFromFirebase("trash", doc.id).then(() =>
                removeFromState(setNotes, notes, currentNote)
              );
            } else if (action === "restore") {
              restoreNote(
                "notes",
                "trash",
                currentNote,
                doc.id,
                setNotes,
                notes
              );
              dispatch(save(currentNote));
            }
          });
        })
        .then(() => {
          dispatch(
            snackMessage(
              `${action === "delete" ? "Deleted note" : "Restored note"}`
            )
          );
          dispatch(openSnackbar());
        });
    } catch (error: any) {
      console.error(error.message);
    } finally {
      handleClose();
    }
  };

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={() => dispatch(closeSnackbar())}
    >
      <CloseIcon />
    </IconButton>
  );

  useEffect(() => {
    if (auth.currentUser?.uid) {
      getNotes(setNotes, "trash").then(() => setIsLoading(false));
    } else {
      navigate("/");
    }
  }, []);

  return (
    <main className="py-3 px-2.5">
      <section className="w-full relative max-w-[900px] mx-auto pt-4">
        <section className="text-xl font-medium flex justify-between items-center">
          <section>
            <span
              className="underline hover:no-underline cursor-pointer"
              onClick={() => navigate("/")}
            >
              Home
            </span>{" "}
            &gt; <h2 className="inline">Trash</h2>
          </section>
        </section>
        <section className="notes mt-8">
          <ul className="notes grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-5 transition-all delay-75 ease-linear">
            {notes.map((note) => (
              <li
                className="cursor-pointer"
                onClick={() => handleOpen(note)}
                key={note.note_id}
              >
                <NoteCard link={`/${note.note_id}`} note={note} />
              </li>
            ))}
          </ul>
          <Snackbar
            open={openSnack}
            autoHideDuration={6000}
            onClose={() => dispatch(closeSnackbar())}
            message={message}
            action={action}
          />
          {notes.length < 1 && !isLoading && (
            <section className="text-white flex items-center justify-center w-full min-h-[50vh]">
              <p className="text-3xl tablet:text-4xl font-medium text-[#a0a0a0] font-sans">
                No trashed notes
              </p>
            </section>
          )}
          {isLoading && <ArchiveTrashFallback />}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <section className="bg-[#242424] border-[#242424] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-4 rounded-md shadow-lg min-w-[280px]">
              <div className="close absolute right-0 top-0">
                <button
                  className="text-gray-400 hover:bg-gray-700 rounded-sm"
                  onClick={handleClose}
                >
                  <CloseIcon />
                </button>
              </div>
              <h3 className="text-2xl font-manrope font-bold text-gray-200 mb-5 text-center">
                Delete / Restore note
              </h3>

              <section className="w-full flex items-center justify-center space-x-5">
                <button
                  className="border-2 border-red-600 bg-red-600 text-gray-200 py-1.5 px-6 rounded-full font-manrope laptop:text-lg font-medium hover:bg-red-700 hover:border-red-700"
                  onClick={() => handleAction("delete")}
                >
                  Delete
                </button>
                <button
                  className="border-2 border-green-600 bg-green-600 text-gray-200 py-1.5 px-6 rounded-full font-manrope laptop:text-lg font-medium hover:bg-green-700 hover:border-green-700"
                  onClick={() => handleAction("restore")}
                >
                  Restore
                </button>
              </section>
            </section>
          </Modal>
        </section>
      </section>
    </main>
  );
};

export default Trash;
