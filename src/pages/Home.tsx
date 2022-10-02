import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";
import Loading from "../components/Loading";
import { homepage } from "../data";

const Home = () => {
  const [homepageData, setHomepageData] = useState({
    main: { id: "", image: "", title: "", text: "" },
    other: [{ id: "", image: "", title: "", text: "", author: "", date: "" }],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setHomepageData(homepage);
    setIsLoading(false);
  });

  if (isLoading) return <Loading />;

  return (
    <div className="home__wrapper">
      <div className="home">
        <section className="home__banner">
          <div className="home__banner--cover">
            <Link to={`/article/${homepageData.main.id}`}>
              <img
                src={homepageData.main.image}
                alt="Main homepageData Cover picture"
              />
            </Link>
          </div>
          <div className="home__banner--info">
            <span>
              <h1>{homepageData.main.title}</h1>
              <p>{homepageData.main.text}...</p>
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
            {homepageData.other.map((e) => {
              return (
                <ArticleCard
                  id={e.id}
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
