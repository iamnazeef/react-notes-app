import {
  GoogleAuthProvider,
  browserLocalPersistence,
  setPersistence,
  signInWithPopup,
} from "firebase/auth";
import GoogleIcon from "../assets/icons/GoogleIcon";
import Image from "../assets/images/auth/authImage.webp";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import GitHubIcon from "../assets/icons/GitHubIcon";

const Auth = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
          .then((user) => {
            navigate("/", { replace: true });
          })
          .catch((error) => console.error(error.message));
      })
      .catch((error) => console.error(error.message));
  };

  return (
    <main className="bg-white text-black min-h-screen p-4 font-manrope">
      <div className="w-full max-w-[1300px] mx-auto">
        <section className="border border-gray-500 h-[4rem] rounded-md shadow-lg flex items-center p-4">
          <nav className="flex items-center justify-between w-full font-medium">
            <h1 className="text-2xl tracking-widest">Noteu</h1>
            <button
              onClick={handleSignIn}
              className="border border-gray-500 text-xl px-2 py-1 rounded-md flex items-center hover:bg-gray-900 hover:text-white transition-colors delay-[15] ease-linear"
            >
              <GoogleIcon />
              Sign in
            </button>
          </nav>
        </section>
        <section className="grid laptop:grid-cols-2 mt-5 gap-2 min-h-[80vh]">
          <section className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-1">
            <section className="w-full h-full bg-white p-1">
              <p className="text-[3rem] leading-snug tablet:text-[5rem] laptop:text-[6rem] laptop:leading-[8rem] break-words">
                Make your life easier and organized with Noteu
              </p>
            </section>
          </section>
          <section className="bg-gradient-to-r from-green-500 via-purple-500 to-blue-500 p-1">
            <section className="w-full h-full bg-white p-1">
              <img
                src={Image}
                alt="Placeholder image"
                className="w-full max-w-[525px] mx-auto"
              />
            </section>
          </section>
        </section>
      </div>
      <section className="border border-gray-500 rounded-sm bg-black h-32 mt-6 flex flex-col items-center justify-center text-white gap-4 w-full">
        <p>Made with ❤ and open source</p>
        <a
          href="https://github.com/iamnazeef/react-notes-app"
          aria-label="Star us on GitHub"
          className="flex gap-2 hover:bg-white hover:text-black hover:font-semibold border p-1.5 rounded-sm"
          target="_blank"
        >
          Star us on GitHub <GitHubIcon />
        </a>
      </section>
    </main>
  );
};

export default Auth;
