import ImageC from "../components/ImageC";

const article = {
  heading: "Oam and Shang: The two great minds behind the Newton Musical",
  img: "/shang-oam.png",
  author: "Yanitta Iewwongcharoen",
  date: "2022-09-12",
  text: "",
};

const Article = () => {
  return (
    <div className="article">
      <div className="article__heading--wrapper">
        <div className="article__heading">
          <h2>{article.heading}</h2>
          <h3>
            {article.author} -{" "}
            {new Date(article.date).toLocaleDateString("en-UK", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </h3>
          <ImageC image={article.img} caption={article.heading} />
        </div>
      </div>
      <div className="article__content">
        <p>{article.text}</p>
      </div>
    </div>
  );
};

export default Article;
