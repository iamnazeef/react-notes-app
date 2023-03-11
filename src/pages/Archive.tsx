import { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { getNotes } from "../utils/firebaseMethods";
import { note } from "../features/notesSlice";
import { Link, useNavigate } from "react-router-dom";
import NoteCard from "../components/NoteCard";
import ArchiveTrashFallback from "../components/ArchiveTrashFallback";
import { IconButton, Snackbar } from "@mui/material";
import CloseIcon from "../assets/icons/CloseIcon";
import { useDispatch } from "react-redux";
import { closeSnackbar } from "../features/snackbar";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Archive = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState<note[]>([]);
  const { open, message } = useSelector((state: RootState) => state.snackbar);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
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
      getNotes(setNotes, "archive").then(() => setIsLoading(false));
    } else {
      navigate("/");
    }
  }, []);

  return (
    <main className="py-3 px-2.5">
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
            {notes &&
              notes.map((note) => (
                <li className="cursor-pointer" key={note.note_id}>
                  <Link to={`/${note.note_id}?isArchived=true`}>
                    <NoteCard link={`/${note.note_id}`} note={note} />
                  </Link>
                </li>
              ))}
          </ul>
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={() => dispatch(closeSnackbar())}
            message={message}
            action={action}
          />
          {notes.length < 1 && !isLoading && (
            <section className="text-white flex items-center justify-center w-full min-h-[50vh]">
              <p className="text-3xl tablet:text-4xl font-medium text-[#a0a0a0] font-sans">
                No archived notes
              </p>
            </section>
          )}
          {isLoading && <ArchiveTrashFallback />}
        </section>
      </section>
    </main>
  );
};

export default Archive;
