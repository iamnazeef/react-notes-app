import { Suspense, lazy, useEffect, useLayoutEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
const LazyNew = lazy(() => import("./pages/New"));
const LazyView = lazy(() => import("./pages/View"));
const LazyEdit = lazy(() => import("./pages/Edit"));
const LazyArchive = lazy(() => import("./pages/Archive"));
const LazyTrash = lazy(() => import("./pages/Trash"));
const LazyPageNotFound = lazy(() => import("./pages/PageNotFound"));
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
import Fallback from "./components/Fallback";
import ViewFallback from "./components/ViewFallback";
import FormFallback from "./components/FormFallback";
import ArchiveTrashFallback from "./components/ArchiveTrashFallback";
import { toggleDarkMode, toggleLightMode } from "./features/themeSlice";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  const { isDarkMode } = useSelector((state: RootState) => state.theme);
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

  useLayoutEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme) {
      switch (theme) {
        case "true":
          dispatch(toggleDarkMode());
          break;
        case "false":
          dispatch(toggleLightMode());
          break;
      }
    } else {
      localStorage.setItem("theme", "false");
    }
  }, []);

  return (
    <div
      className={`${
        isDarkMode ? "bg-darkmode text-gray-200" : "bg-white text-gray-900"
      } font-manrope min-w-screen min-h-screen transition-colors delay-[10] ease-linear`}
    >
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
              <Suspense fallback={<FormFallback />}>
                <LazyNew />
              </Suspense>
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
                <Suspense fallback={<ViewFallback />}>
                  <LazyView />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="edit"
            element={
              <ProtectedRoute>
                <Suspense fallback={<FormFallback />}>
                  <LazyEdit />
                </Suspense>
              </ProtectedRoute>
            }
          />
        </Route>
        <Route
          path="archive"
          element={
            <Suspense fallback={<ArchiveTrashFallback />}>
              <LazyArchive />
            </Suspense>
          }
        />
        <Route
          path="trash"
          element={
            <Suspense fallback={<ArchiveTrashFallback />}>
              <LazyTrash />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<Fallback />}>
              <LazyPageNotFound />
            </Suspense>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
