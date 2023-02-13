import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  const handleHome = () => {
    navigate("/");
  };

  return (
    <main className="min-h-screen bg-darkmode text-gray-200 flex flex-col justify-center items-center space-y-2 font-base font-medium">
      <h2 className="text-xl tablet:text-2xl laptop:text-3xl">
        Page not found.
      </h2>
      <button
        onClick={handleHome}
        className="text-base tablet:text-lg laptop:text-xl border border-gray-600 hover:border-gray-400 py-[0.15rem] px-3 rounded-md"
      >
        Home
      </button>
    </main>
  );
};

export default PageNotFound;
