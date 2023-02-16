import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import AddIcon from "../assets/icons/AddIcon";
import NoteCard from "../components/NoteCard";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { notes } = useSelector((state: RootState) => state.notes);
  const navigate = useNavigate();

  const savedNotes = notes.map((note) => {
    const link = `/${note.id}`;
    return <NoteCard link={link} note={note} key={note.id} />;
  });

  const handleNew = () => {
    navigate("/new");
  };

  return (
    <main className="py-3 px-2.5 font-manrope min-h-screen w-full bg-darkmode text-gray-200">
      <section className="w-full max-w-[900px] mx-auto pt-20">
        <ul className="notes grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-5">
          {savedNotes}
        </ul>
      </section>

      {notes.length < 1 && (
        <section className="flex justify-center items-center min-h-[65vh]">
          <p className="text-3xl tablet:text-4xl font-medium text-gray-600 font-sans">
            Create notes
          </p>
        </section>
      )}

      <section className="create-note fixed right-12 bottom-24 tablet:hidden">
        <button
          onClick={handleNew}
          className="border border-gray-600 p-3 shadow-3xl rounded-full hover:border-gray-400"
        >
          <AddIcon />
        </button>
      </section>
    </main>
  );
};

export default Home;
