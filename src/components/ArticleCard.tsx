import { Link } from "react-router-dom";

const ArticleCard: React.FC<{
  image: string;
  text: string;
  title: string;
  author: { name: string; _id: string };
  date: string;
  _id: string;
}> = (props) => {
  return (
    <div className="article-card">
      <span>
        <div className="article-card__image">
          <Link to={`/article/${props._id}`}>
            <img
              src={props.image}
              alt={`Preview Image of the article ${props.title}`}
            />
          </Link>
        </div>
        <div className="article-card__info">
          <div className="article-card__info--content">
            <h4>{props.title}</h4>
            <p>{props.text.slice(0, 100) + "..."}</p>
          </div>
        </div>
      </span>
      <div className="article-card__author">
        <Link to={`/member/${props.author._id}`}>
          <h5>
            {props.author.name} -{" "}
            {new Date(props.date).toLocaleString("en-UK", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </h5>
        </Link>
      </div>
    </div>
  );
};

export default ArticleCard;
