import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Issue from "./pages/Issue";
import Issues from "./pages/Issues";
import Article from "./pages/Article";
import Categories from "./pages/Categories";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/issues" element={<Issues />} />
        <Route path="/issues/:id" element={<Issue />} />
        <Route path="/article/:id" element={<Article />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/categories" element={<Categories />} />
      </Routes>
    </>
  );
};

export default App;
