import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import ActionButton from "../components/ActionButton";
import { Link } from "react-router-dom";

const Home = () => {
  const { notes } = useSelector((state: RootState) => state.notes);
  const { isDarkMode } = useSelector((state: RootState) => state.theme);
  console.log(notes);

  const savedNotes = notes.map((note) => {
    const link = `/${note.id}`;
    return (
      <Link to={link} key={note.id}>
        <li
          className={`min-h-[200px] w-full max-w-[300px] mx-auto p-2 rounded-md border border-gray-600 ${
            isDarkMode
              ? "bg-darkmode hover:border-gray-400"
              : "bg-gray-50 hover:shadow-perfect"
          }`}
        >
          <h2
            className={`text-lg font-medium mb-1 pb-1 border-b ${
              isDarkMode ? "border-gray-600" : "border-gray-400"
            }`}
          >
            {note.title}
          </h2>
          <section className="content h-[150px] overflow-hidden p-1 text-sm">
            {note.note}
          </section>
        </li>
      </Link>
    );
  });

  return (
    <main
      className={`py-3 px-2.5 font-manrope w-full ${
        isDarkMode ? "bg-darkmode text-gray-200" : "bg-gray-50 text-gray-900"
      }`}
    >
      <section className="relative w-full max-w-[900px] min-h-[96.2vh] mx-auto pt-20">
        <section className="notes">
          <ul className="notes grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-5">
            {savedNotes}
          </ul>
        </section>
        <Link to="/new">
          <button
            className={`action-button border border-gray-600 w-fit p-2 rounded-full fixed bottom-20 right-10 flex items-center space-x-1 h-fit z-20 ${
              isDarkMode
                ? "bg-darkmode text-gray-200 hover:border-gray-400"
                : "bg-gray-50 text-gray-900 hover:shadow-perfect"
            }`}
          >
            <ActionButton />
            <span className="hidden tablet:block text-lg font-medium">
              Create note
            </span>
          </button>
        </Link>
      </section>
    </main>
  );
};

export default Home;
