import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Issue from "./pages/Issue";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/issue" element={<Issue />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
