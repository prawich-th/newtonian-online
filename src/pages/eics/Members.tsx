import axios, { Axios, AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import ReactModal from "react-modal";
import { Link } from "react-router-dom";
import ImageC from "../../components/ImageC";
import Loading from "../../components/Loading";
import NoPermission from "../../components/NoPermission";

const EicMembers = () => {
  const [permission, setPermission] = useState(false);
  const [eicName, setEicName] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [members, setMembers] = useState<any[]>([]);
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
      .get("https://apis.news.newton.ac.th/api/eics/get-members", {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then((res: AxiosResponse) => {
        console.log(res.data);
        setMembers(res.data.members);
      });
  }, [refresh]);

  if (!isLoading) return <Loading />;
  if (!permission) return <NoPermission />;

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
    <div className="members-action__wrapper">
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
            className="members-action__btn members-action__btn"
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
            className={`members-action__btn ${
              modal.actionColor
                ? "members-action__btn--" + modal.actionColor
                : ""
            }`}
            onClick={() => modal.handler(modal.articleId)}
          >
            {modal.action}
          </button>
        </div>
      </ReactModal>

      <div className="members-action">
        <div className="members-action__title">
          <h1>The Newtonian Online MMS</h1>
          <p>You are currently loggedin as Prawich Thawansaldivudhi</p>
        </div>
        <div className="members-action__list">
          {members.map((member) => (
            <div className="members-action__item" key={member.id}>
              <div className="members-action__item--cover">
                <ImageC
                  image={`https://apis.news.newton.ac.th/images${member.profile}`}
                  caption={member.nickname + "'s profile picture"}
                />
              </div>
              <div className="members-action__item--signature">
                <ImageC
                  image={`https://apis.news.newton.ac.th/images${member.signature}`}
                  caption={member.nickname + "'s signature"}
                />
              </div>
              <div className="members-action__right">
                <div className="members-action__item--info">
                  <h3>{member.name}</h3>
                  <h4>{member.role}</h4>
                  <h4 style={{ color: "var(--signature-grey)" }}>
                    Year: {member.year} - Track?: {member.track}
                  </h4>
                  <h5>Bio: {member.bio}</h5>
                </div>
                <div className="members-action__item--action">
                  <Link to={`/article/${member.id}`}>
                    <button className="members-action__btn">
                      <i className="bx bx-window-open"></i>
                    </button>
                  </Link>
                  <button
                    className={`members-action__btn members-action__btn--${
                      ["ACTI", "GRAD", "WINN"].includes(member.status)
                        ? "published"
                        : "un-published"
                    }`}
                    onClick={() =>
                      setModal({
                        isOpen: true,
                        articleId: member.id,
                        heading: ["ACTI", "GRAD", "WINN"].includes(
                          member.status
                        )
                          ? `Hiding Member ${member.id} \n(${member.name})`
                          : `Showing Member ${member.id} \n(${member.name})`,
                        text: "Do you want to proceed?",
                        action: ["ACTI", "GRAD", "WINN"].includes(member.status)
                          ? "Hide"
                          : "Show",
                        actionColor: ["ACTI", "GRAD", "WINN"].includes(
                          member.status
                        )
                          ? "delete"
                          : "published",
                        handler: publicationHandler,
                      })
                    }
                  >
                    <i className="bx bxs-color"></i>
                  </button>
                  <Link to={`/eics/upload-img?f_path=${member.profile}`}>
                    <button
                      className="members-action__btn"
                      // onClick={() => alert("Under Development. Coming Issue 4")}
                    >
                      <i className="bx bx-face"></i>
                    </button>
                  </Link>{" "}
                  <Link to={`/eics/upload-img?f_path=${member.signature}`}>
                    <button
                      className="members-action__btn"
                      // onClick={() => alert("Under Development. Coming Issue 4")}
                    >
                      <i className="bx bx-pen"></i>
                    </button>
                  </Link>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EicMembers;
