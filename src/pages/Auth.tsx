import {
  GoogleAuthProvider,
  browserLocalPersistence,
  setPersistence,
  signInWithPopup,
} from "firebase/auth";
import GoogleIcon from "../assets/icons/GoogleIcon";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";

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
    <main className="bg-darkmode text-gray-200 font-base font-medium">
      <section className="flex flex-col justify-center items-center space-y-2 min-h-screen">
        <button
          className="text-base tablet:text-lg laptop:text-xl border border-gray-600 hover:border-gray-400 py-[0.45rem] px-3 rounded-md flex items-center"
          onClick={handleSignIn}
        >
          <GoogleIcon />
          Sign in with Google
        </button>
      </section>
    </main>
  );
};

export default Auth;
