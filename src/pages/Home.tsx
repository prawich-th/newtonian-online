import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link, useNavigate } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";
import Loading from "../components/Loading";
import { homepage } from "../data";

const Home = () => {
  const [homepageData, setHomepageData] = useState({
    main: {
      _id: "",
      image: "",
      title: "",
      text: "",
      author: { name: "", _id: "" },
    },
    other: [
      {
        _id: "",
        image: "",
        title: "",
        text: "",
        author: { name: "", _id: "" },
        date: "",
      },
    ],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [mainPreview, setMainPreview] = useState("");
  const navigate = useNavigate();

  console.log(import.meta.env.VITE_URL);

  useEffect(() => {
    fetch(`https://apis.news.newton.ac.th/api/reader/get-homepage-data`)
      .then((data) => data.json())
      .then((data) => {
        // console.log(data.main.text);
        setHomepageData(data);
        const text = data.main.text.split(".").slice(0, 4).join(".");

        text.length >= 400
          ? setMainPreview(text.split(" ").slice(0, 80).join(" "))
          : setMainPreview(text);

        setIsLoading(false);
      })
      .catch((err) => {
        navigate("/conn");
      });
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="home__wrapper">
      <div className="home">
        <section className="home__banner">
          <div className="home__banner--cover">
            <Link to={`/article/${homepageData.main._id}`}>
              <img
                src={`https://apis.news.newton.ac.th/images${homepageData.main.image}`}
                alt="Main homepageData Cover picture"
              />
            </Link>
          </div>
          <div className="home__banner--info">
            <span>
              <h1>{homepageData.main.title}</h1>
              <h5>
                By:{" "}
                <Link to={`/member/${homepageData.main.author._id}`}>
                  {homepageData.main.author.name}
                </Link>
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
              <Link to={`/article/${homepageData.main._id}`}>Read More</Link>
            </span>
          </div>
        </section>
        <section className="home__articles">
          <div className="home__articles--title">
            <h2>Articles</h2>
          </div>
          <div className="home__articles--list">
            {homepageData.other.map((e) => {
              return (
                <ArticleCard
                  key={e._id}
                  _id={e._id}
                  image={e.image}
                  title={e.title}
                  text={e.text}
                  author={e.author}
                  date={e.date}
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
