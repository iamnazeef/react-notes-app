import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import New from "./pages/New";
import View from "./pages/View";
import Edit from "./pages/Edit";
import PageNotFound from "./pages/PageNotFound";
import Auth from "./pages/Auth";
import { useEffect } from "react";
import { auth } from "./firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { loggedIn, loggedOut } from "./features/userSlice";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import ProtectedRoute from "./pages/ProtectedRoute";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(loggedIn());
      } else {
        dispatch(loggedOut());
      }
    });
  }, [auth.currentUser]);

  return (
    <div className="bg-darkmode min-w-screen min-h-screen">
      {isLoggedIn && <Header />}
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
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
