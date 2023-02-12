import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
const LazyNewNote = lazy(() => import("./pages/New"));
const LazyView = lazy(() => import("./pages/View"));
const LazyEdit = lazy(() => import("./pages/Edit"));
import Header from "./components/Header";
import Home from "./pages/Home";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/new"
          element={
            //TODO: Add Skeleton
            <Suspense fallback={<h1>Loading...</h1>}>
              <LazyNewNote />
            </Suspense>
          }
        />
        <Route path="/:id">
          <Route
            index
            element={
              //TODO: Add Skeleton
              <Suspense fallback={<h1>Loading...</h1>}>
                <LazyView />
              </Suspense>
            }
          />
          <Route
            path="edit"
            element={
              //TODO: Add Skeleton
              <Suspense fallback={<h1>Loading...</h1>}>
                <LazyEdit />
              </Suspense>
            }
          />
        </Route>
        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
    </>
  );
};

export default App;
