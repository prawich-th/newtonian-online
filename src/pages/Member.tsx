import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ArticleList from "../components/ArticleList";
import Loading from "../components/Loading";
import { homepage } from "../data";
import NotFound from "./NotFound";

const Member = () => {
  const [memberData, setMemberData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isNotFound, setNotFound] = useState(false);
  const id = useParams().id;
  console.log(id);

  useEffect(() => {
    fetch(`https://apis.news.newton.ac.th/api/member/${id}`)
      .then((data) => data.json())
      .then((data) => {
        setMemberData(data);
        setIsLoading(false);
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
                src={`https://apis.news.newton.ac.th/images${memberData.image}`}
                alt="member's image"
              />
            </div>
            <div className="member__info--bio">
              <h3>{memberData.name}</h3>
              <h4>
                Year {memberData.year} - {memberData.track}
              </h4>
              <h5>{memberData.position.join(" / ")}</h5>
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
        <ArticleList title={"Articles"} articles={memberData.articles} />
      </div>
    </div>
  );
};

export default Member;
