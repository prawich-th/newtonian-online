import { articleData } from "@/app/articles/[id]/page";
import ArticleCard from "./ArticleCard";

const ArticleList: React.FC<{
  headline: string;
  articles: articleData[];
  error: string;
}> = (props) => {
  return (
    <section className="home__articles">
      <div className="home__articles--title">
        <h2>{props.headline}</h2>
      </div>
      {props.articles.length === 0 ? (
        <div className="home__articles--no">
          <p>{props.error}</p>
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
