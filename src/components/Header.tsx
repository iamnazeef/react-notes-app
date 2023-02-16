import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";

const Header = () => {
  const navigate = useNavigate();

  const handleNew = () => {
    navigate("/new");
  };

  const handleSignOut = () => {
    signOut(auth)
      .then((res) => {
        navigate("/auth", { replace: true });
      })
      .catch((error) => console.error(error.message));
  };

  return (
    <header className="border-b px-3 py-4 font-manrope fixed top-0 w-full z-10 bg-darkmode text-gray-200 border-gray-700">
      <section className="flex items-center w-full max-w-[900px] relative mx-auto">
        <Link to="/">
          <h1 className="text-xl tablet:text-2xl font-bold text-center">
            Notes App
          </h1>
        </Link>
        <section className="hidden tablet:block absolute right-[7rem]">
          <button
            onClick={handleNew}
            className="py-1 px-4 border border-gray-600 bg-darkmode rounded-full text-lg hover:border-gray-400"
          >
            Create note
          </button>
        </section>
        <section className="absolute right-0">
          <button
            className="py-1 px-4 border border-gray-600 bg-darkmode rounded-full text-lg hover:border-gray-400"
            onClick={handleSignOut}
          >
            Sign out
          </button>
        </section>
      </section>
    </header>
  );
};

export default Header;
