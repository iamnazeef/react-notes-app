import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTag, clearTag } from "../features/tagsSlice";

const Tags = () => {
  const { tags } = useSelector((state: RootState) => state.tags);
  const { notes } = useSelector((state: RootState) => state.notes);
  let processedTags = tags.map((tag) =>
    tag.split(" ").filter((tag) => tag.charAt(0) === "#")
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearTag());
    for (let i = notes.length - 1; i >= 0; i--) {
      dispatch(addTag(notes[i].tags));
    }
  }, [notes]);

  return (
    <section className="mb-6 w-full max-w-[330px] laptop:max-w-[285px] mx-auto laptop:mx-0">
      <h2 className="mb-1 font-medium bg-darkmode shadow-xl w-fit px-1.5 rounded-sm">
        Tags:{" "}
      </h2>
      <section>
        <ul className="tags flex items-center text-sm space-x-1 justify-start overflow-auto snap-x rounded-full">
          {tags &&
            processedTags.map((tag) =>
              tag.map((item) => (
                <li className="border rounded-full py-1 px-2 border-gray-600 snap-start hover:border-gray-400">
                  <button className="rounded-full">{item}</button>
                </li>
              ))
            )}
        </ul>
      </section>
    </section>
  );
};

export default Tags;
