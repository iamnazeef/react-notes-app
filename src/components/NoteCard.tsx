import { Link } from "react-router-dom";
import { note } from "../features/notesSlice";

interface Props {
  link: string;
  note: note;
  isDarkMode: boolean;
}

const NoteCard = ({ link, note, isDarkMode }: Props) => {
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
          className={`text-lg font-bold break-words mb-1 pb-1 border-b ${
            isDarkMode ? "border-gray-600" : "border-gray-400"
          }`}
        >
          {note.title.length > 20
            ? `${note.title.substring(0, 20)}...`
            : `${note.title}`}
        </h2>
        <section className="content break-words font-semibold p-1 text-sm">
          <p>
            {note.note.length > 200
              ? `${note.note.substring(0, 200)}...`
              : `${note.note}`}
          </p>
        </section>
      </li>
    </Link>
  );
};

export default NoteCard;
