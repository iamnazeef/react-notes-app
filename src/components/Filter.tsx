import Tooltip from "@mui/material/Tooltip";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useDispatch } from "react-redux";
import {
  showAll,
  showHigh,
  showLow,
  showMedium,
} from "../features/filterSlice";

const Filter = () => {
  const { filterBy } = useSelector((state: RootState) => state.filter);
  const dispatch = useDispatch();

  const handleFilter = (filterBy: string) => {
    if (filterBy === "all") {
      dispatch(showAll());
    } else if (filterBy === "high") {
      dispatch(showHigh());
    } else if (filterBy === "medium") {
      dispatch(showMedium());
    } else if (filterBy === "low") {
      dispatch(showLow());
    }
  };

  return (
    <>
      <h2 className="mb-1 font-medium">Filter:</h2>
      <section className="categories grid grid-cols-4 mb-6 w-full max-w-[330px] laptop:max-w-[285px] h-[25px] sticky top-[4rem] laptop:top-[4.5rem] bg-darkmode shadow-xl">
        <Tooltip title="Show all">
          <section
            className={`all text-center border border-gray-600 rounded-l-sm ${
              filterBy === 0 ? "bg-gray-600" : "hover:border-gray-400"
            }`}
          >
            <button
              className="w-full flex justify-center items-center h-full"
              aria-label="Show all notes"
              onClick={() => handleFilter("all")}
            >
              <div
                className={`border bg-gray-200 border-gray-200 min-h-[0.400rem] max-h-[0.400rem] min-w-[0.400rem] max-w-[0.400rem] rounded-full`}
              ></div>
            </button>
          </section>
        </Tooltip>
        <Tooltip title="High priority">
          <section
            className={`high text-center border border-gray-600 ${
              filterBy === 1 ? "bg-gray-600" : "hover:border-gray-400"
            }`}
          >
            <button
              className="w-full flex justify-center items-center h-full"
              aria-label="Show high priority notes"
              onClick={() => handleFilter("high")}
            >
              <div
                className={`border bg-red-500 border-red-500 min-h-[0.400rem] max-h-[0.400rem] min-w-[0.400rem] max-w-[0.400rem] rounded-full`}
              ></div>
            </button>
          </section>
        </Tooltip>
        <Tooltip title="Medium priority">
          <section
            className={`medium text-center border border-gray-600 ${
              filterBy === 2 ? "bg-gray-600" : "hover:border-gray-400"
            }`}
          >
            <button
              className="w-full flex justify-center items-center h-full"
              aria-label="Show medium priority notes"
              onClick={() => handleFilter("medium")}
            >
              <div
                className={`border bg-yellow-500 border-yellow-500 min-h-[0.400rem] max-h-[0.400rem] min-w-[0.400rem] max-w-[0.400rem] rounded-full`}
              ></div>
            </button>
          </section>
        </Tooltip>
        <Tooltip title="Low priority">
          <section
            className={`low text-center border border-gray-600 rounded-r-sm ${
              filterBy === 3 ? "bg-gray-600" : "hover:border-gray-400"
            }`}
          >
            <button
              className="w-full flex justify-center items-center h-full"
              aria-label="Show low priority notes"
              onClick={() => handleFilter("low")}
            >
              <div
                className={`border bg-green-500 border-green-500 min-h-[0.400rem] max-h-[0.400rem] min-w-[0.400rem] max-w-[0.400rem] rounded-full`}
              ></div>
            </button>
          </section>
        </Tooltip>
      </section>
    </>
  );
};

export default Filter;
