import { useEffect } from "react";
import { useLocation } from "react-router";
import ArticleCard from "./ArticleCard";

const ArticleList: React.FC<{
  headline: string;
  articles: {
    id: string;
    cover: string;
    headline: string;
    content: string;
    member: [{ name: string; id: string }];
    publishingDate: string;
    // categories: string;
  }[];
}> = (props) => {
  const location = useLocation();

  console.log({ props });
  return (
    <section className="home__articles">
      <div className="home__articles--title">
        <h2>{props.headline}</h2>
      </div>
      {props.articles.length === 0 ? (
        <div className="home__articles--no">
          {location.pathname.split("/")[1] === "member" ? (
            <p>This member currently does not have any published work.</p>
          ) : (
            <p>
              We do not have any published article(s) related to this topic yet.
            </p>
          )}
        </div>
      ) : (
        <div className="home__articles--list">
          {props.articles.map((e) => {
            return (
              <ArticleCard
                key={e.id}
                id={e.id}
                cover={e.cover}
                headline={e.headline}
                text={e.content}
                member={e.member}
                publishingDate={e.publishingDate}
              />
            );
          })}
        </div>
      )}
    </section>
  );
};

export default ArticleList;
