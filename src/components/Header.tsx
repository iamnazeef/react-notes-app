import DarkMode from "../assets/icons/DarkMode";
import LightMode from "../assets/icons/LightMode";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useDispatch } from "react-redux";
import { toggle } from "../features/themeSlice";
import { Link } from "react-router-dom";

const Header = () => {
  const { isDarkMode } = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();
  console.log(isDarkMode);

  const handleTheme = () => {
    dispatch(toggle());
  };

  return (
    <header
      className={`border-b p-3 fixed top-0 w-full z-10 ${
        isDarkMode
          ? "bg-darkmode text-gray-200 border-gray-700"
          : "bg-gray-50 text-gray-900 border-gray-600"
      }`}
    >
      <section className="flex items-center justify-center w-full max-w-[600px] relative mx-auto">
        <Link to="/">
          <h1 className="text-xl font-medium font-manrope text-center">
            Notes
          </h1>
        </Link>
        <section className="absolute right-4">
          <button
            onClick={handleTheme}
            className={`p-1.5 rounded-full ${
              isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
            }`}
          >
            {isDarkMode && <LightMode />}
            {!isDarkMode && <DarkMode />}
          </button>
        </section>
      </section>
    </header>
  );
};

export default Header;
