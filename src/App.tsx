import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Issue from "./pages/Issue";
import Issues from "./pages/Issues";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/issues" element={<Issues />} />
        <Route path="/issues/:id" element={<Issue />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
