import { useEffect } from "react";
import { useLocation } from "react-router";
import ArticleCard from "./ArticleCard";

const ArticleList: React.FC<{
  title: string;
  articles: {
    _id: string;
    image: string;
    title: string;
    text: string;
    author: { name: string; _id: string };
    date: string;
    // categories: string;
  }[];
}> = (props) => {
  const location = useLocation();

  console.log({ props });
  return (
    <section className="home__articles">
      <div className="home__articles--title">
        <h2>{props.title}</h2>
      </div>
      {props.articles.length === 0 ? (
        <div className="home__articles--no">
          {location.pathname.endsWith("member") ? (
            <p>This member currently does not have any published work</p>
          ) : (
            <p>We does not have a published article related this topic yet</p>
          )}
        </div>
      ) : (
        <div className="home__articles--list">
          {props.articles.map((e) => {
            return (
              <ArticleCard
                key={e._id}
                _id={e._id}
                image={e.image}
                title={e.title}
                text={e.text}
                author={e.author}
                date={e.date}
              />
            );
          })}
        </div>
      )}
    </section>
  );
};

export default ArticleList;
