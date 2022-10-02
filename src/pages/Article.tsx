import ImageC from "../components/ImageC";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import { article } from "../data";
import Loading from "../components/Loading";

const Article = () => {
  const [articleData, setArticleData] = useState({
    heading: "",
    img: "",
    author: "",
    date: "",
    text: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setArticleData(article);
    setIsLoading(false);
  });

  if (isLoading) return <Loading />;

  return (
    <div className="article">
      <div className="article__wrapper">
        <div className="article__heading">
          <h2>{article.heading}</h2>
          <h3>
            {article.author} -{" "}
            {new Date(article.date).toLocaleDateString("en-UK", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            - {Math.round(article.text.split(" ").length / 300)} min. read
          </h3>
          <ImageC image={article.img} caption={article.heading} />
        </div>
        <div className="article__content">
          <p>
            <ReactMarkdown>{article.text}</ReactMarkdown>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Article;
