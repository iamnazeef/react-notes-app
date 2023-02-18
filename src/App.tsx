import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import New from "./pages/New";
import View from "./pages/View";
import Edit from "./pages/Edit";
import PageNotFound from "./pages/PageNotFound";
import Auth from "./pages/Auth";
import ProtectedRoute from "./pages/ProtectedRoute";
import { auth, db } from "./firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { loggedIn, loggedOut } from "./features/userSlice";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { note, reset, save } from "./features/notesSlice";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getNotes = async () => {
    try {
      const notesRef = collection(db, "notes");
      const q = query(
        notesRef,
        where("user_id", "==", auth.currentUser!.uid.toString()),
        orderBy("timestamp")
      );
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const note = doc.data();
        dispatch(save(note as note));
      });
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(loggedIn());
        getNotes();
      } else {
        setIsLoading(false);
        dispatch(loggedOut());
        dispatch(reset());
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-darkmode min-w-screen min-h-screen">
      {isLoggedIn && <Header />}
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home isLoading={isLoading} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/new"
          element={
            <ProtectedRoute>
              <New />
            </ProtectedRoute>
          }
        />
        <Route
          path="/auth"
          element={isLoggedIn ? <Navigate to="/" /> : <Auth />}
        />
        <Route path="/:id">
          <Route
            index
            element={
              <ProtectedRoute>
                <View />
              </ProtectedRoute>
            }
          />
          <Route
            path="edit"
            element={
              <ProtectedRoute>
                <Edit />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default App;
