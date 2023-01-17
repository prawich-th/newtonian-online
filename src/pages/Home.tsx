import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link, useNavigate } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";
import Loading from "../components/Loading";

const Home = () => {
  const [homepageData, setHomepageData] = useState({
    main: {
      id: "",
      cover: "",
      headline: "",
      content: "",
      member: [{ name: "", id: "" }],
    },
    articles: [
      {
        id: "",
        cover: "",
        headline: "",
        content: "",
        member: [{ name: "", id: "" }],
        publishingDate: "",
      },
    ],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [mainPreview, setMainPreview] = useState("");
  const navigate = useNavigate();

  console.log(import.meta.env.VITE_URL);

  useEffect(() => {
    document.title = `Home | The Newtonian`;
    fetch(`https://apis.news.newton.ac.th/api/reader/homepage?amount=16`)
      .then((data) => data.json())
      .then((data) => {
        // console.log(data.main.text);
        setHomepageData(data);
        const text = data.main.content.split(".").slice(0, 4).join(".");

        text.length >= 400
          ? setMainPreview(text.split(" ").slice(0, 80).join(" "))
          : setMainPreview(text);

        setIsLoading(false);
      })
      .catch((err) => {
        // navigate("/conn");
      });
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="home__wrapper">
      <div className="home">
        <section className="home__banner">
          <div className="home__banner--cover">
            <Link to={`/article/${homepageData.main.id}`}>
              <img
                src={`https://apis.news.newton.ac.th/images${homepageData.main.cover}`}
                alt="Main homepageData Cover picture"
              />
            </Link>
          </div>
          <div className="home__banner--info">
            <span>
              <h1>{homepageData.main.headline}</h1>
              <h5>
                By:{" "}
                {homepageData.main.member.map((member, i) => (
                  <span>
                    {i > 0 ? ", " : ""}
                    <Link to={`/member/${member.id}`}>{member.name}</Link>
                  </span>
                ))}
              </h5>
              <ReactMarkdown
                components={{
                  // @ts-ignore
                  p: (paragraph: { children?: boolean; node?: any }) => {
                    const { node } = paragraph;

                    if (node.children[0].tagName === "img") {
                      const image = node.children[0];
                      const caption = image.properties.alt;

                      return <></>;
                    }
                    return <p>{paragraph.children}</p>;
                  },
                }}
              >
                {mainPreview + "..."}
              </ReactMarkdown>
            </span>

            <span className="home__banner--readmore">
              <Link to={`/article/${homepageData.main.id}`}>Read More</Link>
            </span>
          </div>
        </section>
        <section className="home__articles">
          <div className="home__articles--title">
            <h2>Articles</h2>
          </div>
          <div className="home__articles--list">
            {homepageData.articles.map((e) => {
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
        </section>
      </div>
    </div>
  );
};

export default Home;
