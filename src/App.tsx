import { Routes, Route } from "react-router-dom";
import New from "./pages/New";
import View from "./pages/View";
import Edit from "./pages/Edit";
import Header from "./components/Header";
import Home from "./pages/Home";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<New />} />
        <Route path="/:id">
          <Route index element={<View />} />
          <Route path="edit" element={<Edit />} />
        </Route>
        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
    </>
  );
};

export default App;
