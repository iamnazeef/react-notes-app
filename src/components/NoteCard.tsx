import { Link } from "react-router-dom";
import { note } from "../features/notesSlice";

interface Props {
  link: string;
  note: note;
}

const NoteCard = ({ link, note }: Props) => {
  return (
    <Link to={link} key={note.id}>
      <li className="w-full min-h-[230px] max-w-[330px] laptop:min-h-[200px] laptop:max-w-[300px] mx-auto p-2 rounded-md border border-gray-600 bg-darkmode hover:border-gray-400">
        <h2 className="text-lg font-bold tracking-wide break-words mb-1 pb-1 border-b border-gray-600">
          {note.title.length > 20
            ? `${note.title.substring(0, 20)}...`
            : `${note.title}`}
        </h2>
        <section className="content break-words tracking-wide font-semibold p-1 text-sm">
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
