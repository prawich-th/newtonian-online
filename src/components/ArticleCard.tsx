import ReactMarkdown from "react-markdown";
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
              src={`https://apis.news.newton.ac.th/images/${props.image}`}
              alt={`Preview Image of the article ${props.title}`}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/notfound.webp";
              }}
            />
          </Link>
        </div>
        <div className="article-card__info">
          <div className="article-card__info--content">
            <h4>{props.title}</h4>
            <p>
              <ReactMarkdown
                components={{
                  // @ts-ignore
                  p: (paragraph: { children?: boolean; node?: any }) => {
                    const { node } = paragraph;

                    console.log(node.children[0].tagName);
                    if (node.children[0].tagName === "img") {
                      const image = node.children[0];
                      const caption = image.properties.alt;

                      return <></>;
                    }
                    return paragraph.children;
                  },
                }}
              >
                {props.text.split(" ").slice(0, 20).join(" ") + "..."}
              </ReactMarkdown>
            </p>
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
