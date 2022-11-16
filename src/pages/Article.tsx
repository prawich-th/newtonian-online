import ImageC from "../components/ImageC";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import NotFound from "./NotFound";
const Article = () => {
  const [article, setArticle] = useState({
    title: "",
    image: "",
    author: { _id: "", name: "" },
    date: "",
    text: "",
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
        setArticle(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("An error has occourred");
        navigate("/conn");
      });
  }, []);

  if (isLoading) return <Loading />;

  if (notFound) return <NotFound />;

  return (
    <div className="article">
      <div className="article__wrapper">
        <div className="article__heading">
          <h2>{article.title}</h2>
          <h3>
            <Link to={`/member/${article.author._id}`}>
              {article.author.name}
            </Link>{" "}
            -{" "}
            {new Date(article.date).toLocaleDateString("en-UK", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            - {Math.round(article.text.split(" ").length / 300)} min. read
          </h3>
          <ImageC
            image={`https://apis.news.newton.ac.th/images${article.image}`}
            caption={article.title}
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
            {article.text}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default Article;
