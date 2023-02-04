import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ArticleList from "../components/ArticleList";
import Loading from "../components/Loading";
import NotFound from "./NotFound";

const Member = () => {
  const [memberData, setMemberData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isNotFound, setNotFound] = useState(false);
  const [memberStatus, setMemberStatus] = useState("Active");
  const id = useParams().id;
  console.log(id);

  useEffect(() => {
    fetch(`https://apis.news.newton.ac.th/api/member/${id}`)
      .then((data) => data.json())
      .then((data) => {
        document.title = `${data.name} | The Newtonian`;
        setMemberData(data);
        setIsLoading(false);

        switch (data.status) {
          case "ACTI":
            setMemberStatus("Active");
            break;
          case "GRAD":
            setMemberStatus("Graduated");
            break;
          case "LEAV":
            setMemberStatus("Resigned");
            break;
          default:
            setMemberStatus("Active");
            break;
        }
      });
  }, []);

  if (isLoading) return <Loading />;
  if (isNotFound) return <NotFound />;

  return (
    <div className="member__wrapper">
      <div className="member">
        <div className="member__info">
          <div className="member__info--left">
            <div className="member__info--image">
              <img
                src={`https://apis.news.newton.ac.th/images${memberData.profile}`}
                alt="member's image"
              />
            </div>
            <div className="member__info--bio">
              <h3>
                {memberData.name} ({memberData.nickname})
              </h3>
              <h4>
                Year {memberData.year} - {memberData.track}{" "}
                <span style={{ fontStyle: "italic" }}>({memberStatus})</span>
              </h4>
              <h5 style={{ color: "var(--signature-grey)" }}>
                {memberData.role}
              </h5>
              <p>{memberData.bio}</p>
            </div>
          </div>
          <div className="member__info--right">
            <img
              src={`https://apis.news.newton.ac.th/images${memberData.signature}`}
              alt="Member's Signature"
            />
          </div>
        </div>
        <ArticleList headline={"Articles"} articles={memberData.articles} />
      </div>
    </div>
  );
};

export default Member;
