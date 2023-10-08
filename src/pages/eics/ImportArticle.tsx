import { v4 } from "uuid";

const catergories = [
  {
    name: "Advice / Essay",
    id: "AdviceEssay",
  },
  {
    name: "Letter",
    id: "letter",
  },
  {
    name: "Interview",
    id: "Interview",
  },
  {
    name: "School Update",
    id: "SchoolUpdate",
  },

  {
    name: "Fiction / Poetry",
    id: "Fiction",
  },
  {
    name: "Performing Arts",
    id: "PerformingArts",
  },
  {
    name: "Visual Arts",
    id: "VisualArts",
  },
  {
    name: "Review",
    id: "Review",
  },
  {
    name: "Business by NBS",
    id: "NBS",
  },
];

import Loading from "../../components/Loading";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import NoPermission from "../../components/NoPermission";

const ImportArticle = () => {
  const [permission, setPermission] = useState(false);
  const [eicName, setEicName] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const googleDocId = useRef<HTMLInputElement>(null);
  const [content, setContent] = useState("");
  const [editor, setEditor] = useState(false);
  const [members, setMembers] = useState<any[]>([]);
  const loggedInLift = () => {
    setPermission(true);
  };
  const [articleInfo, setArticleInfo] = useState<{
    headline: string;
    cover: string;
    issueNo: number;
    writerId: number;
    category: string;
    docId: string;
  }>({
    headline: "",
    cover: `/articles/${v4()}/cover.webp`,
    issueNo: 0,
    writerId: 0,
    category: "",
    docId: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("https://apis.news.newton.ac.th/api/auth/getUser", {
      headers: {
        authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setEicName(data.name);
        if (data.permission >= 2) setPermission(true);
      });
  }, [refresh]);

  useEffect(() => {
    fetch("https://apis.news.newton.ac.th/api/eics/get-members", {
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMembers(data.members);
      });
  }, [refresh]);

  if (!isLoading) return <Loading />;
  if (!permission) return <NoPermission loggedInLift={loggedInLift} />;

  const getDocument = (e: any) => {
    e.preventDefault();
    if (!googleDocId.current?.value) return;
    setArticleInfo({
      headline: "",
      cover: `/articles/${v4()}/cover.webp`,
      issueNo: 0,
      writerId: 0,
      category: "",
      docId: googleDocId.current.value,
    });
    console.log(googleDocId.current?.value);
    setContent("Attempting to get the article...");
    toast.promise(
      new Promise<string>((reslove, reject) => {
        if (!googleDocId.current?.value) reject("Please enter a Google Doc ID");
        fetch(`https://apis.news.newton.ac.th/api/eics/import-article`, {
          method: "POST",
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          cache: "no-cache",
          body: JSON.stringify({
            article: {
              docId: googleDocId.current?.value,
            },
          }),
        })
          .then((data) => data.json())
          .then((data) => {
            console.log(data);
            setContent(data);
            reslove(`Successfully imported the article`);
          })
          .catch((err) => {
            // @ts-ignore
            reject(err.message);
          });
      }),
      {
        loading: "",
        success: (msg: any) => {
          setRefresh(refresh + 1);
          return `Successfully Toggled the publication status of the article ${msg}`;
        },
        error: (msg: any) => {
          return msg;
        },
      }
    );
  };

  // const uploadWithServer = ({ form }) => {
  //   "use server";

  //   return {};
  // };

  const uploadHandler = () => {
    const snapshot = {
      ...articleInfo,
      content,
    };
    console.log(googleDocId.current?.value);
    toast.promise(
      new Promise<string>((reslove, reject) => {
        if (!googleDocId.current?.value) reject("Please enter a Google Doc ID");
        fetch(`https://apis.news.newton.ac.th/api/eics/new-article`, {
          method: "POST",
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          cache: "no-cache",
          body: JSON.stringify(snapshot),
        })
          .then((data) => data.json())
          .then((data) => {
            console.log(data);
            reslove(`Successfully uploaded the article`);
          })
          .catch((err) => {
            // @ts-ignore
            reject(err.message);
          });
      }),
      {
        loading: "",
        success: (msg: any) => {
          setRefresh(refresh + 1);
          return `Successfully Toggled the publication status of the article ${msg}`;
        },
        error: (msg: any) => {
          return msg;
        },
      }
    );
  };

  return (
    <div className="import__wrapper">
      <div className="import">
        <div
          className="import__title"
          style={{
            display: "grid",
            gridTemplateColumns: "4fr 1fr",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>
            <h1>Import Article</h1>
            <p>You are currently signed in as {eicName}</p>{" "}
          </div>
        </div>
        <div className="import__form--field">
          <span style={{ fontSize: "1.5rem" }}>
            Get article from Google Docs
          </span>
          <form
            style={{ display: "flex", justifyContent: "space-between" }}
            onSubmit={getDocument}
          >
            <input type="text" placeholder="Google Docs ID" ref={googleDocId} />
            <button type="submit" style={{ width: "30%", marginTop: "0" }}>
              Fetch
            </button>
          </form>
        </div>
        <div className="import__field">
          <button
            type="submit"
            style={{ width: "20%", marginTop: "0" }}
            onClick={() => {
              setEditor(!editor);
            }}
          >
            <i className="bx bx-edit-alt"></i>
            Edit Content
          </button>
        </div>
        {editor ? (
          <div className="import__field" style={{ fontStyle: "normal" }}>
            <textarea
              name="content-editor"
              cols={30}
              rows={25}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{
                width: "100%",
                fontFamily: "EB Garamond",
                fontSize: "1.8rem",
              }}
            ></textarea>
          </div>
        ) : (
          <div
            className="import__field"
            style={{ fontStyle: "normal", width: "80%" }}
          >
            <div className="article__content">
              <ReactMarkdown>{content || "NO CONTENT"}</ReactMarkdown>
            </div>
          </div>
        )}

        <div
          className="import__form"
          style={{
            display: "block",
            width: "80%",
          }}
          onSubmit={(e) => e.preventDefault()}
        >
          <h3>General Information</h3>

          <div className="import__form--field">
            <p>Article Headline</p>
            <input
              type="text"
              placeholder="Oam and Shang: The two great minds behind the Newton Musical"
              name="headline"
              value={articleInfo.headline}
              onChange={(e) =>
                setArticleInfo({ ...articleInfo, headline: e.target.value })
              }
            />
          </div>
          <div className="import__form--field">
            <p>Cover Image</p>
            <input
              type="text"
              placeholder="/path/to/image/on/server"
              name="cover"
              value={articleInfo.cover}
              onChange={(e) =>
                setArticleInfo({ ...articleInfo, cover: e.target.value })
              }
            />
          </div>
          <div className="import__form--field">
            <p>Issue No.</p>
            <input
              type="number"
              placeholder="0"
              name="issueNo"
              value={articleInfo.issueNo}
              onChange={(e) =>
                setArticleInfo({ ...articleInfo, issueNo: +e.target.value })
              }
            />
          </div>
          <div className="import__form--field">
            <p>Writer</p>
            <select
              name="writerId"
              value={articleInfo.writerId}
              onChange={(e) =>
                setArticleInfo({ ...articleInfo, writerId: +e.target.value })
              }
            >
              <option></option>
              {members
                .sort((a, b) => {
                  if (a.nickname < b.nickname) {
                    return -1;
                  }
                  if (a.nickname > b.nickname) {
                    return 1;
                  }
                  return 0;
                })
                .map((m) => {
                  return (
                    <option key={m.id} value={+m.id}>
                      {m.nickname} ({m.name})
                    </option>
                  );
                })}
            </select>
          </div>

          <div className="import__form--field">
            <p>Category</p>
            <select
              name="category"
              value={articleInfo.category}
              onChange={(e) =>
                setArticleInfo({ ...articleInfo, category: e.target.value })
              }
            >
              <option></option>

              {catergories &&
                catergories.map((cur) => (
                  <option key={cur.id} value={cur.id}>
                    {cur.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="import__field">
          <button
            type="submit"
            style={{ width: "20%", marginTop: "0" }}
            onClick={uploadHandler}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportArticle;
