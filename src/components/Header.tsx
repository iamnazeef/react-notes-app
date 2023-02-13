import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleNew = () => {
    navigate("/new");
  };

  return (
    <header className="border-b px-3 py-4 font-manrope fixed top-0 w-full z-10 bg-darkmode text-gray-200 border-gray-700">
      <section className="flex items-center w-full max-w-[900px] relative mx-auto">
        <Link to="/">
          <h1 className="text-xl tablet:text-2xl font-medium text-center">
            Notes App
          </h1>
        </Link>
        <section className="hidden tablet:block absolute right-0">
          <button
            onClick={handleNew}
            className="py-1.5 px-3 border border-gray-600 bg-darkmode rounded-full text-lg hover:border-gray-400"
          >
            Create Note
          </button>
        </section>
      </section>
    </header>
  );
};

export default Header;
