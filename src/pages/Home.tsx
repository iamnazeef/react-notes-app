import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import AddIcon from "../assets/icons/AddIcon";
import NoteCard from "../components/NoteCard";
import { Link, useNavigate } from "react-router-dom";
import Filter from "../components/Filter";
import Tags from "../components/Tags";
import HomeFallback from "../components/HomeFallback";
import { Tooltip } from "@mui/material";

interface Props {
  isLoading: boolean;
}

const Home = ({ isLoading }: Props) => {
  const { notes } = useSelector((state: RootState) => state.notes);
  const navigate = useNavigate();
  const { filterBy } = useSelector((state: RootState) => state.filter);

  const filteredNotes = notes.filter((note) => {
    if (filterBy !== 0 && filterBy === note.priority) {
      return note;
    } else if (typeof filterBy === "string" && filterBy !== "all") {
      return note.tags.indexOf(filterBy) !== -1;
    } else if (filterBy === 0 || filterBy === "all") {
      return note;
    }
  });

  const savedNotes = filteredNotes.map((note) => {
    const link = `/${note!.note_id}`;
    return (
      <Tooltip title={`${note.title}`} key={note.note_id}>
        <Link to={link}>
          <NoteCard link={link} note={note} />
        </Link>
      </Tooltip>
    );
  });

  const handleNew = () => {
    navigate("/new");
  };

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
            <p className="text-3xl tablet:text-4xl font-medium text-gray-600 font-sans">
              Create notes
            </p>
          )}
          {isLoading && <HomeFallback />}
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
