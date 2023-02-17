import axios, { Axios, AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import ReactModal from "react-modal";
import { Link } from "react-router-dom";
import ImageC from "../../components/ImageC";
import Loading from "../../components/Loading";
import NoPermission from "../../components/NoPermission";
import nth from "../../utilities/nth";

const IssueAction = () => {
  const [permission, setPermission] = useState(false);
  const [eicName, setEicName] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [issues, setIssues] = useState<any[]>([]);
  const [modal, setModal] = useState({
    isOpen: false,
    articleId: 0,
    heading: "",
    text: "",
    action: "",
    actionColor: "",
    handler: (id: number) => {},
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("https://apis.news.newton.ac.th/api/auth/getUser", {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then((res: AxiosResponse) => {
        console.log(res.data);
        setEicName(res.data.name);
        if (res.data.permission >= 2) setPermission(true);
      });

    axios
      .get("https://apis.news.newton.ac.th/api/eics/get-all-issues", {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then((res: AxiosResponse) => {
        console.log(res.data);
        setIssues(res.data);
      });
  }, [refresh]);

  if (!isLoading) return <Loading />;
  if (!permission) return <NoPermission />;

  return (
    <div className="issues-eics__wrapper">
      <ReactModal
        isOpen={modal.isOpen}
        style={{
          content: {
            width: "60rem",
            height: "30rem",
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            backgroundColor: "var(--background-color)",
            border: "solid 0.1rem var( --border-color)",
            borderRadius: "1.1rem",
          },
          overlay: {
            backgroundColor: "var(--overlay-color)",
          },
        }}
      >
        <div>
          <h2 style={{ margin: "0 0 2rem 0 ", whiteSpace: "break-spaces" }}>
            {modal.heading}
          </h2>
          <p>{modal.text}</p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 3fr",
            gap: "3rem",
          }}
        >
          <button
            className="issues-eics__btn issues-eics__btn"
            onClick={() =>
              setModal({
                isOpen: false,
                articleId: 0,
                heading: "",
                text: "",
                action: "",
                actionColor: "",
                handler: (id: number) => "",
              })
            }
          >
            Cancel
          </button>
          <button
            className={`issues-eics__btn ${
              modal.actionColor ? "issues-eics__btn--" + modal.actionColor : ""
            }`}
            onClick={() => modal.handler(modal.articleId)}
          >
            {modal.action}
          </button>
        </div>
      </ReactModal>

      <div className="issues-eics">
        <div className="issues-eics__title--ui">
          <h1>The Newtonian Online ISSMS</h1>
          <p>You are currently loggedin as Prawich Thawansaldivudhi</p>
        </div>{" "}
        <div className="issues-eics__title--print">
          <h1>The Newtonian Online - Analytics</h1>
          <p>Exported on {nth(new Date().toISOString())}</p>
        </div>
        <div className="issues-eics__list">
          {issues.map((issue) => (
            <div className="issues-eics__item" key={issue.id}>
              <div className="issues-eics__item--cover">
                <ImageC
                  image={`https://apis.news.newton.ac.th/images${issue.cover}`}
                  caption={issue.headline}
                />
              </div>
              <div className="issues-eics__right">
                <div className="issues-eics__item--info">
                  <h3>Issue No: {issue.id}</h3>
                  {/* <h4>
                    By:{" "}
                    {issue.member.map((member: any, i: number) => (
                      <span>
                        {i > 0 ? ", " : " "}
                        <Link to={`/member/${member.id}`}>
                          {member.name} ({member.nickname})
                        </Link>
                      </span>
                    ))}
                  </h4> */}
                  <h4>
                    Articles: {issue.articles.length} - PDF View Count:{" "}
                    {issue.pdfViewCount} <br />
                    LetterId: {issue.lettersId ?? "N/A"} <br />
                    Date Published: {nth(issue.publishingDate)}
                  </h4>
                  {issue.articles
                    .sort((a: any, b: any) => {
                      let e = 0;
                      if (a.id === issue.mainArticlesId) e = 1000;
                      return +b.id - e;
                    })
                    .map(
                      (article: {
                        headline: string;
                        id: number;
                        member: any[];
                        views: number;
                      }) => {
                        return (
                          <Link to={`/article/${article.id}`}>
                            <div
                              className={`issues-eics__article-card ${
                                article.id === issue.mainArticlesId
                                  ? "issues-eics__article-main"
                                  : ""
                              }`}
                            >
                              <h4>
                                {article.headline} |{" "}
                                <span
                                  style={{
                                    color: "var(--signature-grey)",
                                    fontStyle: "italic",
                                  }}
                                >
                                  views: {article.views}
                                </span>
                              </h4>
                            </div>
                          </Link>
                        );
                      }
                    )}
                </div>
                <div className="issues-eics__item--action">
                  <Link to={`/article/${issue.id}`}>
                    <button className="issues-eics__btn">
                      <i className="bx bx-window-open"></i>
                    </button>
                  </Link>
                  {/* <button
                    className={`issues-eics__btn issues-eics__btn--${
                      issue.published ? "published" : "un-published"
                    }`}
                    onClick={() =>
                      setModal({
                        isOpen: true,
                        articleId: issue.id,
                        heading: issue.published
                          ? `Unpublishing Article ${issue.id} \n(${issue.headline})`
                          : `Publishing Article ${issue.id} \n(${issue.headline})`,
                        text: "Do you want to proceed?",
                        action: issue.published ? "Unpubished" : "Publish",
                        actionColor: issue.published ? "delete" : "published",
                        handler: publicationHandler,
                      })
                    }
                  >
                    <i className="bx bx-news"></i>
                  </button>
                  <Link to={`/eics/upload-img?f_path=${issue.cover}`}>
                    <button
                      className="issues-eics__btn issues-eics__no-print"
                      // onClick={() => alert("Under Development. Coming Issue 4")}
                    >
                      <i className="bx bx-image-add"></i>
                    </button>
                  </Link>
                  <div></div>
                  <div></div>
                  <button
                    className="issues-eics__btn issues-eics__btn--delete issues-eics__no-print"
                    onClick={() =>
                      setModal({
                        isOpen: true,
                        articleId: issue.id,
                        heading: `Deleting Article ${issue.id} \n(${issue.headline})`,
                        text: "Do you want to proceed, the content will be deleted forever.",
                        action: "Delete Article",
                        actionColor: "delete",
                        handler: deletionHandler,
                      })
                    }
                  >
                    <i className="bx bx-trash"></i>
                  </button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IssueAction;
