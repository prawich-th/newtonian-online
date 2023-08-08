import ImageC from "@/components/ImageC";
import Link from "next/link";
import { articleData } from "../articles/[id]/page";

export interface Member {
  id: string;
  name: string;
  nickname: string;
  profile: string;
  year: string;
  track: string;
  status: string;
  role: string;
  permission: number;
  bio: string;
  signature: string;
  articles: articleData[];
}

const memberData = async () => {
  const data = await fetch(`https://apis.news.newton.ac.th/api/member`);

  return data.json() as Promise<Member[]>;
};
const Members = async () => {
  let important: Member[];
  let members: Member[];
  const data = await memberData();

  important = data.filter((cur) => {
    return cur.permission === 5;
  });
  members = data.filter((cur) => {
    return cur.permission < 5;
  });

  console.log({ important });

  return (
    <div className="members__wrapper">
      <div className="members">
        <section className="members__important">
          {important &&
            important.map((cur) => (
              <Link href={`/members/${cur.id}`}>
                <div className="members__important--card">
                  <ImageC
                    image={`https://apis.news.newton.ac.th/images${cur.profile}`}
                    notfound="img"
                    height={380}
                    width={225}
                    // className="members__important--image"
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
              <Link href={`/members/${cur.id}`}>
                <div className="members__list--card">
                  <ImageC
                    image={`https://apis.news.newton.ac.th/images${cur.profile}`}
                    notfound="img"
                    height={300}
                    width={225}
                    // className="members__important--image"
                  />
                  <h3>
                    {cur.name}
                    <br />({cur.nickname})
                  </h3>
                  {(() => {
                    if (+cur.year > 13) {
                      <h4>
                        <h4 style={{ fontStyle: "italic" }}>
                          {cur.track === "supervisor"
                            ? "Supervisor"
                            : "Gratuated"}
                        </h4>
                      </h4>;
                    }
                    return (
                      <>
                        <h4>
                          Year {cur.year} {cur.track ? " - " + cur.track : ""}
                        </h4>
                        <h4>{cur.role}</h4>
                        {cur.status === "LEAV" && (
                          <h4 style={{ fontStyle: "italic" }}>Leaved</h4>
                        )}
                        {cur.status === "CONS" && (
                          <h4 style={{ fontStyle: "italic" }}>
                            Contestant (Award Winner)
                          </h4>
                        )}
                      </>
                    );
                  })()}
                </div>
              </Link>
            ))}
        </section>
      </div>
    </div>
  );
};

export default Members;
