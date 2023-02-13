import DarkMode from "../assets/icons/DarkMode";
import LightMode from "../assets/icons/LightMode";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useDispatch } from "react-redux";
import { toggle } from "../features/themeSlice";
import { Link, useNavigate } from "react-router-dom";
import AddIcon from "../assets/icons/AddIcon";

const Header = () => {
  const { isDarkMode } = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(isDarkMode);

  const handleTheme = () => {
    dispatch(toggle());
  };

  const handleNew = () => {
    navigate("/new");
  };

  return (
    <header
      className={`border-b p-3 fixed top-0 w-full z-10 ${
        isDarkMode
          ? "bg-darkmode text-gray-200 border-gray-700"
          : "bg-gray-50 text-gray-900 border-gray-600"
      }`}
    >
      <section className="flex items-center w-full max-w-[900px] relative mx-auto">
        <Link to="/">
          <h1 className="text-2xl font-medium font-manrope text-center">
            Noteout
          </h1>
        </Link>
        <section className="absolute right-0">
          <button
            onClick={handleTheme}
            className={`p-2 rounded-full ${
              isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
            }`}
          >
            {isDarkMode && <LightMode />}
            {!isDarkMode && <DarkMode />}
          </button>
        </section>
        <section className="absolute right-12">
          <button
            onClick={handleNew}
            className={`p-2 rounded-full ${
              isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
            }`}
          >
            <AddIcon />
          </button>
        </section>
      </section>
    </header>
  );
};

export default Header;
