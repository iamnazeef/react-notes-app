import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
const LazyNew = lazy(() => import("./pages/New"));
const LazyView = lazy(() => import("./pages/View"));
const LazyEdit = lazy(() => import("./pages/Edit"));
const LazyPageNotFound = lazy(() => import("./pages/PageNotFound"));
import Header from "./components/Header";
import Home from "./pages/Home";

const App: React.FC = () => {
  return (
    <div className="bg-darkmode min-w-screen min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/new"
          element={
            //TODO: Add Skeleton
            <Suspense fallback={<h1>Loading...</h1>}>
              <LazyNew />
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
        <Route
          path="*"
          element={
            //TODO: Add Skeleton
            <Suspense fallback={<h1>Loading...</h1>}>
              <LazyPageNotFound />
            </Suspense>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
