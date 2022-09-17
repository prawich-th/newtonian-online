import { Link } from "react-router-dom";

const article = {
  main: {
    id: "87yhjsm39dkfdis83ndso",
    title: "Oam and Shang: The two great minds behind the Newton Musical",
    text: "Oam and Shang are the two lead directors and founders of the Newton Musical, an event that will occur within this school year (AY 2022/23), showcasing multiple performances of a musical inspired by Dear Evan Hansen. This will be the first musical to ever be performed and created by the Newton Sixth Form student body, and they have recruited a talented group of actors to portray the different characters in the musical. One of the performances will be at the Siam Pic-Ganesha, the largest theater in Thailand, on December 24th, 2022.",
    image: "/shang-oam.png",
  },
};

const Home = () => {
  return (
    <div className="home__wrapper">
      <div className="home">
        <section className="home__banner">
          <div className="home__banner--cover">
            <Link to={`/article/${article.main.id}`}>
              <img src={article.main.image} alt="Main Article Cover picture" />
            </Link>
          </div>
          <div className="home__banner--info">
            <span>
              <h1>{article.main.title}</h1>
              <p>{article.main.text}...</p>
            </span>

            <span className="home__banner--readmore">
              <Link to={`/article/${article.main.id}`}>Read More</Link>
            </span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
