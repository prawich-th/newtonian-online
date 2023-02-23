import ImageC from "../components/ImageC";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import NotFound from "./NotFound";

const Skeleton: React.FC<{
  height: number;
  margin?: number;
  width?: number;
}> = (props) => {
  return (
    <span
      className="skeleton"
      style={{
        width: `${props.width ?? 100}%`,
        height: `${props.height}rem`,
        margin: `0 0 ${props.margin ?? 1}rem 0`,
        background: "var(--signature-white)",
      }}
    ></span>
  );
};

const Article = () => {
  const [article, setArticle] = useState({
    headline: "",
    cover: "",
    member: [{ id: "", name: "" }],
    publishingDate: "",
    content: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate();

  const articleId = useParams().id;

  useEffect(() => {
    fetch(`https://apis.news.newton.ac.th/api/reader/article/${articleId}`)
      .then((data) => {
        if (data.status !== 200) setNotFound(true);
        return data;
      })
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        document.title = `${data.headline} | The Newtonian`;
        setArticle(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("An error has occourred");
        navigate("/conn");
      });
  }, []);

  if (isLoading)
    return (
      <div className="article">
        <div className="article__wrapper">
          <div className="article__heading">
            <Skeleton height={8} />
            <Skeleton height={3} />
            <Skeleton height={40} />
            <Skeleton height={2} margin={0.75} />
            <Skeleton height={2} margin={0.75} />
            <Skeleton height={2} margin={0.75} />
            <Skeleton height={2} margin={0.75} />
          </div>
        </div>
      </div>
    );

  if (notFound) return <NotFound />;

  return (
    <div className="article">
      <div className="article__wrapper">
        <div className="article__heading">
          <h2>{article.headline}</h2>
          <h3>
            {article.member.map((member, i) => (
              <span>
                {i > 0 ? ", " : " "}
                <Link to={`/member/${member.id}`}>{member.name}</Link>
              </span>
            ))}
            {" - "}
            {new Date(article.publishingDate).toLocaleDateString("en-UK", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            {" - "}
            {Math.round(article.content.split(" ").length / 300)} min. read
          </h3>
          <ImageC
            image={`https://apis.news.newton.ac.th/images${article.cover}`}
            caption={article.headline}
            notfound="gone"
          />
        </div>
        <div className="article__content">
          <ReactMarkdown
            components={{
              // @ts-ignore
              p: (paragraph: { children?: boolean; node?: any }) => {
                const { node } = paragraph;

                console.log(node.children[0].tagName);
                if (node.children[0].tagName === "img") {
                  const image = node.children[0];
                  const caption = image.properties.alt;

                  return (
                    <div className="article__content--image">
                      <ImageC
                        image={`https://apis.news.newton.ac.th${image.properties.src}`}
                        caption={caption}
                        notfound="gone"
                      />
                    </div>
                  );
                }
                return <p>{paragraph.children}</p>;
              },
            }}
          >
            {article.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default Article;
