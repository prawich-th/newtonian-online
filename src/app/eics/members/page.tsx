"use client";

import Loading from "@/app/articles/loading";
import ImageC from "@/components/ImageC";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const EicMembers = () => {
  const [permission, setPermission] = useState(false);
  const [eicName, setEicName] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [members, setMembers] = useState<any[]>([]);
  const [allMembers, setAllMembers] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const loggedInLift = () => {
    setPermission(true);
  };

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
        setAllMembers(data.members);
      });
  }, [refresh]);

  const searchHandler = (e: any) => {
    e.preventDefault();
    console.log(allMembers);

    console.log(search);
    if (!search) {
      return setMembers(allMembers);
    }

    const regex = new RegExp(search, "g");

    setMembers(
      allMembers.filter(({ name, nickname }) => {
        const isMatch = regex.test(`${name} ${nickname}`);
        console.log({
          test: isMatch,
          name: `${name} ${nickname}`,
        });
        return isMatch;
      })
    );
  };

  if (!isLoading) return <Loading />;

  const publicationHandler = (id: number) => {
    toast.promise(
      new Promise<string>((reslove, reject) => {
        fetch(
          `https://apis.news.newton.ac.th/api/eics/toggle-publication/${id}`,
          {
            method: "PATCH",
            headers: {
              authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
          .then((data) => data.json())
          .then((data) => {
            console.log(data);
            reslove(
              `${data.data.result.headline} to ${
                data.data.result.published ? "Published" : "In Progress"
              }`
            );
          })
          .catch((err) => {
            // @ts-ignore
            reject(err.response.data.message);
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
    <div className="members-action__wrapper">
      <div className="members-action">
        <div
          className="members-action__title"
          style={{
            display: "grid",
            gridTemplateColumns: "4fr 1fr",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>
            <h1>The Newtonian Online MMS</h1>
            <p>You are currently signed in as {eicName}</p>{" "}
          </div>
          <Link
            style={{
              fontSize: "1.5rem",
              textAlign: "right",
            }}
            href={"/eics/new-member"}
          >
            New Member
          </Link>
        </div>
        <form
          className="import__form--field"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="submit"
            onClick={searchHandler}
            style={{ width: "30%", marginTop: "0" }}
          >
            Search
          </button>
        </form>
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
                    Year: {member.year} - Track: {member.track}
                  </h4>
                  <h5>Bio: {member.bio}</h5>
                </div>
                <div className="members-action__item--action">
                  <Link href={`/members/${member.id}`}>
                    <button className="members-action__btn">
                      <i className="bx bx-window-open"></i>
                    </button>
                  </Link>
                  <button
                    className={`members-action__btn members-action__btn--${
                      "ACTI" === member.status
                        ? "published"
                        : member.status === "CONS"
                        ? "contestant"
                        : "un-published"
                    }`}
                    onClick={() => {
                      confirm("Are you sure you want to continue");
                      publicationHandler(member.id);
                    }}
                  >
                    <i className="bx bxs-color"></i>
                  </button>
                  <Link href={`/eics/upload-img?f_path=${member.profile}`}>
                    <button
                      className="members-action__btn"
                      // onClick={() => alert("Under Development. Coming Issue 4")}
                    >
                      <i className="bx bx-face"></i>
                    </button>
                  </Link>{" "}
                  <Link href={`/eics/upload-img?f_path=${member.signature}`}>
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
