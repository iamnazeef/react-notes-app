import { Link } from "react-router-dom";
import { note } from "../features/notesSlice";
import Tooltip from "@mui/material/Tooltip";

interface Props {
  link: string;
  note: note;
}

const NoteCard = ({ link, note }: Props) => {
  let color = "";

  switch (note.priority) {
    case 1:
      color = "red";
      break;
    case 2:
      color = "yellow";
      break;
    case 3:
      color = "green";
      break;
  }

  return (
    <Link to={link} key={note.note_id}>
      <li className="w-full min-h-[230px] max-w-[330px] laptop:min-h-[200px] laptop:max-w-[300px] mx-auto p-2 rounded-md border border-gray-600 bg-darkmode hover:border-gray-400">
        <section className="flex items-center justify-between">
          <h2 className="text-lg font-bold tracking-wide break-words max-w-[250px]">
            {note.title.length > 20
              ? `${note.title.substring(0, 20)}...`
              : `${note.title}`}
          </h2>
          <Tooltip
            title={`${
              note.priority === 1
                ? "High priority"
                : note.priority === 2
                ? "Medium priority"
                : "Low priority"
            }`}
          >
            <div
              className={`border bg-${color}-500 min-h-[0.400rem] max-h-[0.400rem] min-w-[0.400rem] max-w-[0.400rem] rounded-full border-${color}-500`}
              aria-label={`${
                note.priority === 1
                  ? "High priority"
                  : note.priority === 2
                  ? "Medium priority"
                  : "Low priority"
              }`}
            ></div>
          </Tooltip>
        </section>
        <hr className="border-gray-600 my-1" />
        <section className="content break-words tracking-wide font-semibold p-1 text-sm">
          <p>
            {note.content.length > 200
              ? `${note.content.substring(0, 200)}...`
              : `${note.content}`}
          </p>
        </section>
      </li>
    </Link>
  );
};

export default NoteCard;
