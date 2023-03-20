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
import UploadArticle from "./pages/eics/ImportArticle";
import ConnectionErr from "./pages/Connection";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import ImportArticle from "./pages/eics/ImportArticle";
import ArticlesAction from "./pages/eics/ArticlesAction";
import UploadImage from "./pages/eics/UploadImg";
import EicMembers from "./pages/eics/Members";
import IssueAction from "./pages/eics/IssuesAction";
import EicsNav from "./pages/eics/EicsNav";

const App = () => {
  const isUnsupported = useMediaQuery({ maxWidth: "280px" });
  // const isUnsupported = false;
  const location = useLocation();

  // return (
  //   <div className="unsupport__wrapper">
  //     <div className="unsupport">
  //       <i className="bx bx-pen"></i>
  //       <br />
  //       The Newtonian Online is currently down for maintenance. Sorry for the
  //       inconvenience. Please come back later.
  //     </div>
  //   </div>
  // );

  if (isUnsupported)
    return (
      <div className="unsupport__wrapper">
        <div className="unsupport">
          <i className="bx bx-devices"></i>
          <br />
          This screen resolution is not supported. If you're using a folable
          phone please unfold your screen.
        </div>
      </div>
    );

  return (
    <>
      <Toaster
        containerStyle={{
          fontSize: "1.5rem",
        }}
      />

      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/issues" element={<Issues />} />
          <Route path="/issues/:id" element={<Issue />} />
          <Route path="/article/:id" element={<Article />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/members" element={<Members />} />
          <Route path="/eics/upload-img" element={<UploadImage />} />
          <Route path="/conn" element={<ConnectionErr />} />
          <Route path="/eics/import" element={<ImportArticle />} />
          <Route path="/eics/articles" element={<ArticlesAction />} />
          <Route path="/eics/issues" element={<IssueAction />} />
          <Route path="/eics/members" element={<EicMembers />} />
          <Route path="/eics" element={<EicsNav />} />
          <Route path="/member/:id" element={<Member />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </>
  );
};

export default App;
