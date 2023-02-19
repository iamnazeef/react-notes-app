import { Link } from "react-router-dom";
import { note } from "../features/notesSlice";
import Tooltip from "@mui/material/Tooltip";
import { useEffect, useState } from "react";

interface Props {
  link: string;
  note: note;
}

const NoteCard = ({ link, note }: Props) => {
  const [color, setColor] = useState<string>("");

  useEffect(() => {
    if (note.priority === 1) {
      setColor("bg-red-500 border-red-500");
    } else if (note.priority === 2) {
      setColor("bg-yellow-500 border-yellow-500");
    } else {
      setColor("bg-green-500 border-green-500");
    }
  }, []);

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
              className={`border ${color} min-h-[0.400rem] max-h-[0.400rem] min-w-[0.400rem] max-w-[0.400rem] rounded-full`}
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
        <section className="content">
          <pre className="font-manrope text-sm tracking-wide font-medium leading-6 whitespace-pre-wrap">
            {note.content.length > 200
              ? `${note.content.substring(0, 200)}...`
              : `${note.content}`}
          </pre>
        </section>
      </li>
    </Link>
  );
};

export default NoteCard;
