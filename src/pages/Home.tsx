import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import AddIcon from "../assets/icons/AddIcon";
import NoteCard from "../components/NoteCard";
import { Link, useNavigate } from "react-router-dom";
import Filter from "../components/Filter";
import Tags from "../components/Tags";
import HomeFallback from "../components/HomeFallback";
import { IconButton, Snackbar, Tooltip } from "@mui/material";
import CloseIcon from "../assets/icons/CloseIcon";
import { useDispatch } from "react-redux";
import { closeSnackbar } from "../features/snackbar";
import { note } from "../features/notesSlice";

interface Props {
  isLoading: boolean;
}

const Home = ({ isLoading }: Props) => {
  const { notes } = useSelector((state: RootState) => state.notes);
  const navigate = useNavigate();
  const { filterBy } = useSelector((state: RootState) => state.filter);
  const { open, message } = useSelector((state: RootState) => state.snackbar);
  const dispatch = useDispatch();

  const snackbarAction = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={() => dispatch(closeSnackbar())}
    >
      <CloseIcon />
    </IconButton>
  );

  const filteredNotes = notes.filter((note) => {
    if (filterBy !== 0 && filterBy === note.priority) {
      return note;
    } else if (typeof filterBy === "string" && filterBy !== "all") {
      return note.tags.indexOf(filterBy) !== -1;
    } else if (filterBy === 0 || filterBy === "all") {
      return note;
    }
  });

  const savedNotes = filteredNotes.map((note: note) => {
    const link = `/${note!.note_id}`;
    return (
      <li key={note.note_id}>
        <Tooltip title={`${note.title}`}>
          <Link to={link} aria-label="View note">
            <NoteCard link={link} note={note} />
          </Link>
        </Tooltip>
      </li>
    );
  });

  const createNote = () => navigate("/new");

  return (
    <main className="py-3 px-2.5 font-manrope w-full bg-darkmode text-gray-200">
      {notes.length > 0 && (
        <section className="w-full relative max-w-[900px] mx-auto pt-4">
          <section className="block tablet:flex tablet:items-center tablet:justify-between mb-2 gap-2">
            <Filter />
            <Tags />
          </section>
          <ul className="notes grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-5 transition-all delay-75 ease-linear">
            {savedNotes}
          </ul>
        </section>
      )}

      {notes.length < 1 && (
        <section className="flex justify-center items-center min-h-[65vh]">
          {!isLoading && (
            <p className="text-3xl tablet:text-4xl font-medium text-[#CCCCCC] font-sans">
              Create notes
            </p>
          )}
          {isLoading && <HomeFallback />}
        </section>
      )}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => dispatch(closeSnackbar())}
        message={message}
        action={snackbarAction}
      />
      <section className="create-note fixed right-12 bg-darkmode bottom-24 tablet:hidden rounded-full">
        <button
          onClick={createNote}
          className="border-2 drop-shadow-2xl border-gray-600 p-3 shadow-3xl rounded-full hover:border-gray-400"
          aria-label="Create new note"
        >
          <AddIcon />
        </button>
      </section>
    </main>
  );
};

export default Home;
