import { Link } from "react-router-dom";

const ArticleCard: React.FC<{
  image: string;
  text: string;
  title: string;
  author: string;
  date: string;
  id: string;
}> = (props) => {
  return (
    <div className="article-card">
      <span>
        <div className="article-card__image">
          <Link to={`/articles/${props.id}`}>
            <img src={props.image} alt="Preview Image of the article" />
          </Link>
        </div>
        <div className="article-card__info">
          <div className="article-card__info--content">
            <h4>{props.title}</h4>
            <p>{props.text.slice(0, 115) + "..."}</p>
          </div>
        </div>
      </span>
      <div className="article-card__author">
        <h5>
          {props.author} -{" "}
          {new Date(props.date).toLocaleString("en-UK", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </h5>
      </div>
    </div>
  );
};

export default ArticleCard;
