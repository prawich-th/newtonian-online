import Home from "./pages/Home";
import { Routes, Route, ScrollRestoration } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Issue from "./pages/Issue";
import Issues from "./pages/Issues";
import Article from "./pages/Article";
import Categories from "./pages/Categories";
import Member from "./pages/Member";
import { useMediaQuery } from "react-responsive";
import Layout from "./components/layout/Layout";
import Members from "./pages/Members";
import UploadArticle from "./pages/eics/UploadArticle";
import ConnectionErr from "./pages/Connection";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const App = () => {
  const isUnsupported = useMediaQuery({ maxWidth: "330px" });
  const location = useLocation();

  if (isUnsupported)
    return (
      <div className="unsupport__wrapper">
        <div className="unsupport">
          <span
            style={{
              fontSize: "5rem",
            }}
            className="material-symbols-sharp"
          >
            devices_fold
          </span>
          <br />
          This screen resolution is not supported. If you're using a folable
          phone please unfold your screen.
        </div>
      </div>
    );

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/issues" element={<Issues />} />
          <Route path="/issues/:id" element={<Issue />} />
          <Route path="/article/:id" element={<Article />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/members" element={<Members />} />
          <Route path="/conn" element={<ConnectionErr />} />
          <Route path="/eics/upload" element={<UploadArticle />} />
          <Route path="/member/:id" element={<Member />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </>
  );
};

export default App;
