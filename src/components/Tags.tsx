import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTag, clearTag } from "../features/tagsSlice";
import { showTag } from "../features/filterSlice";

const Tags = () => {
  const { tags } = useSelector((state: RootState) => state.tags);
  const { notes } = useSelector((state: RootState) => state.notes);
  const { filterBy } = useSelector((state: RootState) => state.filter);
  const { isDarkMode } = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();

  const handleTagFilter = (tag: string) => {
    dispatch(showTag(tag));
  };

  useEffect(() => {
    dispatch(clearTag());
    let checker: string[] = [];
    for (let note of notes) {
      let tag = note.tags.split(" ").filter((tag) => tag.charAt(0) === "#");

      tag.forEach((item) => {
        if (!checker.includes(item)) {
          dispatch(addTag(item));
          checker.push(item);
        }
      });
    }
  }, [notes]);

  return (
    <section className="mb-6 w-full max-w-[330px] laptop:max-w-[285px] mx-auto laptop:mx-0">
      <h2 className="mb-1 font-medium w-fit px-1.5 rounded-sm">Tags: </h2>
      <section>
        <ul className="tags flex items-center text-sm space-x-1 justify-start overflow-auto snap-x rounded-full">
          <li
            className={`border rounded-full snap-start ${
              filterBy === "all"
                ? `${isDarkMode ? "bg-gray-600" : "bg-gray-200"} border-none`
                : `${
                    isDarkMode ? "border-gray-600" : "border-gray-900"
                  } hover:border-gray-400`
            }`}
          >
            <button
              className="rounded-full py-1 px-3"
              onClick={() => handleTagFilter("all")}
            >
              All
            </button>
          </li>
          {tags &&
            tags.map((tag) => (
              <li
                className={`border rounded-full snap-start ${
                  filterBy === tag
                    ? `${
                        isDarkMode ? "bg-gray-600" : "bg-gray-200"
                      } border-none`
                    : `${
                        isDarkMode ? "border-gray-600" : "border-gray-900"
                      } hover:border-gray-400`
                }`}
                key={tag}
              >
                <button
                  className="rounded-full py-1 px-2"
                  onClick={() => handleTagFilter(tag)}
                >
                  {tag}
                </button>
              </li>
            ))}
        </ul>
      </section>
    </section>
  );
};

export default Tags;
