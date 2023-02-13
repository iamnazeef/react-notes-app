import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import NoteCard from "../components/NoteCard";

const Home = () => {
  const { notes } = useSelector((state: RootState) => state.notes);
  const { isDarkMode } = useSelector((state: RootState) => state.theme);
  console.log(notes);

  const savedNotes = notes.map((note) => {
    const link = `/${note.id}`;
    return <NoteCard link={link} note={note} isDarkMode={isDarkMode} />;
  });

  return (
    <main
      className={`py-3 px-2.5 font-manrope min-h-screen w-full ${
        isDarkMode ? "bg-darkmode text-gray-200" : "bg-gray-50 text-gray-900"
      }`}
    >
      <section className="w-full max-w-[900px] mx-auto pt-20">
        <ul className="notes grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-5">
          {savedNotes}
        </ul>
      </section>
    </main>
  );
};

export default Home;
