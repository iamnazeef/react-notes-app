import { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import {
  addToFirebase,
  colRef,
  deleteFromFirebase,
} from "../utils/firebaseMethods";
import { getDocs, query, where } from "firebase/firestore";
import { note } from "../features/notesSlice";
import { useNavigate } from "react-router-dom";
import NoteCard from "../components/NoteCard";
import { Modal } from "@mui/material";
import CloseIcon from "../assets/icons/CloseIcon";

const Archive = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState<note[]>([]);
  const [open, setOpen] = useState(false);
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
  const handleAction = () => getDocId();

  const removeFromState = () => {
    setNotes(
      notes.filter((note) => note.note_id !== currentNote.note_id.toString())
    );
  };

  const restoreNote = (docId: string) => {
    try {
      addToFirebase("notes", currentNote);
      deleteFromFirebase("archive", docId).then(() => removeFromState());
    } catch (error: any) {
      console.error(error.message);
    } finally {
      handleClose();
    }
  };

  const getDocId = async () => {
    try {
      const notesRef = colRef("archive");
      const q = query(
        notesRef,
        where("note_id", "==", currentNote.note_id.toString())
      );
      await getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          restoreNote(doc.id);
        });
      });
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const getNotes = async () => {
    try {
      const notesRef = colRef("archive");
      const q = query(notesRef, where("user_id", "==", auth.currentUser!.uid));
      await getDocs(q).then((querySnapshot) => {
        const data: note[] = [];
        querySnapshot.forEach((doc) => {
          const d = doc.data();
          data.push(d as note);
        });
        setNotes(data);
      });
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (auth.currentUser?.uid) {
      getNotes();
    } else {
      navigate("/");
    }
  }, []);

  return (
    <main className="py-3 px-2.5 font-manrope w-full bg-darkmode text-gray-200">
      <section className="w-full relative max-w-[900px] mx-auto pt-4">
        <section className="text-xl font-medium">
          <span
            className="underline hover:no-underline cursor-pointer"
            onClick={() => navigate("/")}
          >
            Home
          </span>{" "}
          &gt; <h2 className="inline">Archive</h2>
        </section>
        <section className="notes mt-8">
          <ul className="notes grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-5 transition-all delay-75 ease-linear">
            {notes.map((note) => (
              <span
                className="cursor-pointer"
                onClick={() => handleOpen(note)}
                key={note.note_id}
              >
                <NoteCard link={`/${note.note_id}`} note={note} />
              </span>
            ))}
          </ul>
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
                Unarchive note
              </h3>

              <section className="w-full flex items-center justify-center space-x-5">
                <button
                  className="border-2 border-green-600 bg-green-600 text-gray-200 py-1.5 px-6 rounded-full font-manrope laptop:text-lg font-medium hover:bg-green-700 hover:border-green-700"
                  onClick={handleAction}
                >
                  Unarchive
                </button>
              </section>
            </section>
          </Modal>
        </section>
      </section>
    </main>
  );
};

export default Archive;
