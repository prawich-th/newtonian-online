import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

const Members = () => {
  const [important, setImportant] = useState([
    {
      id: "",
      name: "Yanitta Iewwongcharoen (Krapook)",
      nickname: "Yanitta Iewwongcharoen (Krapook)",
      profile: "/members/krapook.png",
      year: "13",
      status: "",

      track: "Humanities",
      role: "Editor-in-chief",
    },
  ]);
  const [members, setMembers] = useState([
    {
      id: "",
      name: "Yanitta Iewwongcharoen (Krapook)",
      nickname: "Yanitta Iewwongcharoen (Krapook)",
      profile: "/members/krapook.png",
      year: "13",
      track: "Humanities",
      status: "",
      role: "Editor-in-chief",
    },
  ]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = `Members | The Newtonian`;

    fetch(`https://apis.news.newton.ac.th/api/member`)
      .then((data) => {
        console.log(data);
        return data.json();
      })
      .then((data) => {
        console.log(data);
        const importantList: any[] = [];
        const memberList: any[] = [];
        data.map((e: any) => {
          console.log(e);
          let isImportant = false;

          if (e.role.endsWith("Editor-in-chief")) isImportant = true;

          if (isImportant) return importantList.push(e);
          return memberList.push(e);
        });

        let important = data.filter((cur: any) => {
          return cur.permission === 6;
        });
        let members = data
          .filter((cur: any) => {
            return cur.permission <= 5;
          })
          .sort((a: any, b: any) => {
            if (b.status !== "ACTI") return b.id - 1000 - a.id;
            return b.permission - a.permission;
          });

        setImportant(important);
        setMembers(members);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="members__wrapper">
      <div className="members">
        <section className="members__important">
          {important &&
            important.map((cur) => (
              <Link to={`/member/${cur.id}`}>
                <div className="members__important--card">
                  <img
                    src={`https://apis.news.newton.ac.th/images${cur.profile}`}
                    alt=""
                    className="members__important--image"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/notfound.webp";
                    }}
                  />
                  <h3>
                    {cur.name}
                    <br />({cur.nickname})
                  </h3>
                  <h4>
                    Year {cur.year} - {cur.track}
                  </h4>
                  <h4>{cur.role}</h4>
                </div>
              </Link>
            ))}
        </section>
        <section className="members__list">
          {members &&
            members.map((cur) => (
              <Link to={`/member/${cur.id}`}>
                <div className="members__list--card">
                  <img
                    src={`https://apis.news.newton.ac.th/images${cur.profile}`}
                    alt=""
                    style={
                      cur.status !== "ACTI" ? { filter: "grayscale(1)" } : {}
                    }
                    className="members__list--image"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/notfound.webp";
                    }}
                  />
                  <h3>
                    {cur.name}
                    <br />({cur.nickname})
                  </h3>
                  <h4>
                    {+cur.year <= 13 &&
                      `Year ${cur.year} ${cur.track ? " - " + cur.track : ""}`}
                    {+cur.year === 15 && `Executives / Supervisor`}
                  </h4>
                  <h4>{cur.role}</h4>
                  {cur.status === "LEAV" && (
                    <h4 style={{ fontStyle: "italic" }}>Leaved</h4>
                  )}
                  {cur.status === "GRAD" && (
                    <h4 style={{ fontStyle: "italic" }}>Graduated</h4>
                  )}{" "}
                  {cur.status === "CONS" && (
                    <h4 style={{ fontStyle: "italic" }}>
                      Contestant (Award Winner)
                    </h4>
                  )}
                </div>
              </Link>
            ))}
        </section>
      </div>
    </div>
  );
};

export default Members;
