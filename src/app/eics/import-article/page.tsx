"use client";

import Loading from "@/app/articles/loading";
import ImageC from "@/components/ImageC";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useEicContext } from "../eicProvider";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

const ImportArticle = () => {
  const [permission, setPermission] = useState(false);
  const { name: eicName } = useEicContext();
  const [refresh, setRefresh] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const googleDocId = useRef<HTMLInputElement>(null);
  const [content, setContent] = useState("");
  const [editor, setEditor] = useState(false);

  const loggedInLift = () => {
    setPermission(true);
  };

  useEffect(() => {
    // fetch("https://apis.news.newton.ac.th/api/eics/get-members", {
    //   headers: {
    //     authorization: "Bearer " + localStorage.getItem("token"),
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     setMembers(data.members);
    //     setAllMembers(data.members);
    //   });
  }, [refresh]);

  if (!isLoading) return <Loading />;

  const getDocument = (e: any) => {
    e.preventDefault();
    console.log(googleDocId.current?.value);
    setContent("Attempting to get the article...");
    toast.promise(
      new Promise<string>((reslove, reject) => {
        if (!googleDocId.current?.value) reject("Please enter a Google Doc ID");
        fetch(`http://localhost:8001/api/eics/import-article`, {
          method: "POST",
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
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
              rows={10}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{
                width: "100%",
                fontFamily: "EB Garamond",
                fontSize: "1.55rem",
              }}
            ></textarea>
          </div>
        ) : (
          <div className="import__field" style={{ fontStyle: "normal" }}>
            <div className="article__content">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImportArticle;
