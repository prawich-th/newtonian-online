import ImageC from "../components/ImageC";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import { article } from "../data";
import Loading from "../components/Loading";
import { useParams } from "react-router-dom";

const Article = () => {
  const [articleData, setArticleData] = useState({
    heading: "",
    img: "",
    author: "",
    date: "",
    text: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  const articleId = useParams().id;

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
          <ReactMarkdown
            components={{
              // @ts-ignore
              p: (paragraph: { children?: boolean; node?: any }) => {
                const { node } = paragraph;

                if (node.children[0].tagName === "img") {
                  const image = node.children[0];
                  const caption = image.properties.alt;

                  return (
                    <ImageC image={image.properties.src} caption={caption} />
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
