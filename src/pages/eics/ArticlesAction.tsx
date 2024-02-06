import axios, { Axios, AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import ReactModal from "react-modal";
import { Link } from "react-router-dom";
import ImageC from "../../components/ImageC";
import Loading from "../../components/Loading";
import NoPermission from "../../components/NoPermission";
import nth from "../../utilities/nth";

const ArticlesAction = () => {
  const [permission, setPermission] = useState(false);
  const [eicName, setEicName] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState<any[]>([]);
  const [modal, setModal] = useState({
    isOpen: false,
    articleId: 0,
    heading: "",
    text: "",
    action: "",
    actionColor: "",
    handler: (id: number) => {},
  });
  const loggedInLift = () => {
    setPermission(true);
  };
  const [permissionLevel, setPermissionLevel] = useState(0);

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
        setPermissionLevel(res.data.permission);
        if (res.data.permission >= 2) setPermission(true);
      });

    axios
      .get("https://apis.news.newton.ac.th/api/eics/get-articles", {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then((res: AxiosResponse) => {
        console.log(res.data);
        setArticles(res.data);
      });
  }, [refresh]);

  if (!isLoading) return <Loading />;
  if (!permission) return <NoPermission loggedInLift={loggedInLift} />;

  const deletionHandler = (id: number) => {
    toast.promise(
      new Promise<string>((reslove, reject) => {
        axios
          .delete(
            `https://apis.news.newton.ac.th/api/eics/delete-article/${id}`,
            {
              headers: {
                authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          )
          .then((data: AxiosResponse) => {
            console.log(data.data);
            reslove(data.data.deleted.headline);
          })
          .catch((err: AxiosError) => {
            // @ts-ignore
            reject(err.response.data.message);
          });
      }),
      {
        loading: "",
        success: (msg) => {
          setModal({
            isOpen: false,
            articleId: 0,
            heading: "",
            text: "",
            action: "",
            actionColor: "",
            handler: (id: number) => "",
          });
          setRefresh(refresh + 1);
          return `Successfully deleted the article ${msg}`;
        },
        error: (msg) => {
          setModal({
            isOpen: false,
            articleId: 0,
            heading: "",
            text: "",
            action: "",
            actionColor: "",
            handler: (id: number) => "",
          });
          return msg;
        },
      }
    );
  };

  const publicationHandler = (id: number) => {
    toast.promise(
      new Promise<string>((reslove, reject) => {
        axios
          .patch(
            `https://apis.news.newton.ac.th/api/eics/toggle-publication/${id}`,
            {},
            {
              headers: {
                authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          )
          .then((data: AxiosResponse) => {
            console.log(data.data);
            reslove(
              `${data.data.result.headline} to ${
                data.data.result.published ? "Published" : "In Progress"
              }`
            );
          })
          .catch((err: AxiosError) => {
            // @ts-ignore
            reject(err.response.data.message);
          });
      }),
      {
        loading: "",
        success: (msg) => {
          setModal({
            isOpen: false,
            articleId: 0,
            heading: "",
            text: "",
            action: "",
            actionColor: "",
            handler: (id: number) => "",
          });
          setRefresh(refresh + 1);
          return `Successfully Toggled the publication status of the article ${msg}`;
        },
        error: (msg) => {
          setModal({
            isOpen: false,
            articleId: 0,
            heading: "",
            text: "",
            action: "",
            actionColor: "",
            handler: (id: number) => "",
          });
          return msg;
        },
      }
    );
  };

  return (
    <div className="articles-action__wrapper">
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
            className="articles-action__btn articles-action__btn"
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
            className={`articles-action__btn ${
              modal.actionColor
                ? "articles-action__btn--" + modal.actionColor
                : ""
            }`}
            onClick={() => modal.handler(modal.articleId)}
          >
            {modal.action}
          </button>
        </div>
      </ReactModal>

      <div className="articles-action">
        <div className="articles-action__title--ui">
          <h1>The Newtonian Online AMS</h1>
          <p>You are currently signed in as {eicName}</p>
        </div>{" "}
        <div className="articles-action__title--print">
          <h1>The Newtonian Online - Analytics</h1>
          <p>{nth(new Date().toISOString())}</p>
        </div>
        <div className="articles-action__list">
          {articles.map((article) => (
            <div className="articles-action__item" key={article.id}>
              <div className="articles-action__item--cover">
                <ImageC
                  image={`https://apis.news.newton.ac.th/images${article.cover}`}
                  caption={article.headline}
                />
              </div>
              <div className="articles-action__right">
                <div className="articles-action__item--info">
                  <h3>{article.headline}</h3>
                  <h4>
                    By:{" "}
                    {article.member.map((member: any, i: number) => (
                      <span>
                        {i > 0 ? ", " : " "}
                        <Link to={`/member/${member.id}`}>
                          {member.name} ({member.nickname})
                        </Link>
                      </span>
                    ))}
                  </h4>
                  <h4>
                    Category: {article.category} - Views: {article.views} <br />
                    Issue: {article.issuesId} - Article Id: {article.id}
                  </h4>
                </div>
                <div className="articles-action__item--action">
                  <Link to={`/article/${article.id}`}>
                    <button className="articles-action__btn">
                      <i className="bx bx-window-open"></i>
                    </button>
                  </Link>
                  <button
                    className={`articles-action__btn articles-action__btn--${
                      article.published ? "published" : "un-published"
                    }`}
                    onClick={() =>
                      setModal({
                        isOpen: true,
                        articleId: article.id,
                        heading: article.published
                          ? `Unpublishing Article ${article.id} \n(${article.headline})`
                          : `Publishing Article ${article.id} \n(${article.headline})`,
                        text: "Do you want to proceed?",
                        action: article.published ? "Unpubished" : "Publish",
                        actionColor: article.published ? "delete" : "published",
                        handler: publicationHandler,
                      })
                    }
                  >
                    <i className="bx bx-news"></i>
                  </button>
                  <Link to={`/eics/upload-img?f_path="${article.cover}`}>
                    <button
                      className="articles-action__btn articles-action__no-print"
                      // onClick={() => alert("Under Development. Coming Issue 4")}
                    >
                      <i className="bx bx-image-add"></i>
                    </button>
                  </Link>
                  <div></div>
                  <div></div>

                  <button
                    className="articles-action__btn articles-action__btn--delete articles-action__no-print"
                    onClick={() => {
                      if (permissionLevel <= 2)
                        return setModal({
                          isOpen: true,
                          articleId: article.id,
                          heading: `Can't delete ${article.id} \n(${article.headline})`,
                          text: "Do you want to proceed, the content won't be deleted forever.",
                          action: "Can't Delete Article",
                          actionColor: "delete",
                          handler: () => {},
                        });

                      setModal({
                        isOpen: true,
                        articleId: article.id,
                        heading: `Deleting Article ${article.id} \n(${article.headline})`,
                        text: "Do you want to proceed, the content will be deleted forever.",
                        action: "Delete Article",
                        actionColor: "delete",
                        handler: deletionHandler,
                      });
                    }}
                  >
                    <i className="bx bx-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticlesAction;
