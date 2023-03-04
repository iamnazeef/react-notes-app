import { note } from "../features/notesSlice";
import Tooltip from "@mui/material/Tooltip";
import { useEffect, useState } from "react";

interface Props {
  link: string;
  note: note;
}

const NoteCard = ({ link, note }: Props) => {
  const [color, setColor] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    if (note.priority === 1) {
      setColor("bg-red-500 border-red-500");
    } else if (note.priority === 2) {
      setColor("bg-yellow-500 border-yellow-500");
    } else {
      setColor("bg-green-500 border-green-500");
    }

    if (note.tags) {
      setTags(() =>
        note.tags.split(" ").filter((tag) => tag.charAt(0) === "#")
      );
    }
  }, []);

  return (
    <section className="relative w-full min-h-[230px] max-h-[230px] max-w-[330px] laptop:min-h-[200px] laptop:max-h-[200px] laptop:max-w-[300px] mx-auto p-2 rounded-md border border-gray-600 bg-darkmode hover:border-gray-400 overflow-hidden">
      <section className="flex items-center justify-between">
        <h2 className="text-lg font-bold tracking-wide break-words max-w-[290px] whitespace-nowrap overflow-hidden text-ellipsis">
          {note.title}
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
      <section className="border-t border-t-gray-600 absolute w-full right-0 left-0 bottom-0 bg-darkmode">
        <ul className="tags flex items-center p-1.5 text-sm space-x-1 justify-start overflow-auto">
          {tags &&
            tags.map((tag) => (
              <li
                className="border rounded-full py-1 px-2 border-gray-600"
                key={tag}
              >
                {tag}
              </li>
            ))}
        </ul>
      </section>
    </section>
  );
};

export default NoteCard;
