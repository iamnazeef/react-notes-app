import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import AddIcon from "../assets/icons/AddIcon";
import NoteCard from "../components/NoteCard";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

interface Props {
  isLoading: boolean;
}

const Home = ({ isLoading }: Props) => {
  const { notes } = useSelector((state: RootState) => state.notes);
  const navigate = useNavigate();

  const savedNotes = notes.map((note) => {
    const link = `/${note.note_id}`;
    return <NoteCard link={link} note={note} key={note.note_id} />;
  });

  const handleNew = () => {
    navigate("/new");
  };

  return (
    <main className="py-3 px-2.5 font-manrope w-full bg-darkmode text-gray-200">
      <section className="w-full max-w-[900px] mx-auto pt-4">
        <ul className="notes grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-5">
          {savedNotes}
        </ul>
      </section>

      {notes.length < 1 && (
        <section className="flex justify-center items-center min-h-[65vh]">
          {!isLoading && (
            <p className="text-3xl tablet:text-4xl font-medium text-gray-600 font-sans">
              Create notes
            </p>
          )}
          {isLoading && <CircularProgress sx={{ color: "#4B5563" }} />}
        </section>
      )}

      <section className="create-note fixed right-12 bg-darkmode bottom-24 tablet:hidden rounded-full">
        <button
          onClick={handleNew}
          className="border-2 drop-shadow-2xl border-gray-600 p-3 shadow-3xl rounded-full hover:border-gray-400"
        >
          <AddIcon />
        </button>
      </section>
    </main>
  );
};

export default Home;
