import { Link } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";

const article = {
  main: {
    id: "87yhjsm39dkfdis83ndso",
    title: "Oam and Shang: The two great minds behind the Newton Musical",
    text: "Oam and Shang are the two lead directors and founders of the Newton Musical, an event that will occur within this school year (AY 2022/23), showcasing multiple performances of a musical inspired by Dear Evan Hansen. This will be the first musical to ever be performed and created by the Newton Sixth Form student body, and they have recruited a talented group of actors to portray the different characters in the musical. One of the performances will be at the Siam Pic-Ganesha, the largest theater in Thailand, on December 24th, 2022.",
    image: "/shang-oam.png",
  },
  other: [
    {
      id: "fi904nvsutiodjfodj4e",
      title: "Letter From The Headmaster",
      text: "I'm very proud of the student's progress on making this club, this will promote the student on their reading and writing skill.",
      image:
        "https://expatlifeinthailand.com//assets/media/2020/03/DSC00925-scaled.jpg",
      author: "Prawich Thawansaldivudhi",
      date: "2022-09-22",
    },
    {
      id: "fi904nvsutiodjfodj4e",
      title: "An uncompleted guide: to write a web application",
      text: "How to write a good web-application. A good one. In this essay I will guide you on how to make a functional web-application",
      image: "/shang-oam.png",
      author: "Prawich Thawansaldivudhi",
      date: "2022-09-22",
    },
    {
      id: "fi904nvsutiodjfodj4e",
      title: "Newton get feature in the National Geographic",
      text: "How to write a good web-application. A good one. In this essay I will guide you on how to make a functional web-application",
      image:
        "https://ngthai.com/app/uploads/2022/01/271939248_265006249014747_703847268792885236_n.jpg",
      author: "Yanitta Iewwongcharoen",
      date: "2021-11-10",
    },
    {
      id: "fi904nvsutiodjfodj4e",
      title: "An uncompleted guide: to write a web application",
      text: "How to write a good web-application. A good one. In this essay I will guide you on how to make a functional web-application",
      image: "/shang-oam.png",
      author: "Prawich Thawansaldivudhi",
      date: "2022-09-22",
    },
    {
      id: "fi904nvsutiodjfodj4e",
      title: "An uncompleted guide: to write a web application",
      text: "How to write a good web-application. A good one. In this essay I will guide you on how to make a functional web-application",
      image: "/shang-oam.png",
      author: "Prawich Thawansaldivudhi",
      date: "2022-09-22",
    },
    {
      id: "fi904nvsutiodjfodj4e",
      title: "An uncompleted guide: to write a web application",
      text: "How to write a good web-application. A good one. In this essay I will guide you on how to make a functional web-application",
      image: "/shang-oam.png",
      author: "Prawich Thawansaldivudhi",
      date: "2022-09-22",
    },
    {
      id: "fi904nvsutiodjfodj4e",
      title: "An uncompleted guide: to write a web application",
      text: "How to write a good web-application. A good one. In this essay I will guide you on how to make a functional web-application",
      image: "/shang-oam.png",
      author: "Prawich Thawansaldivudhi",
      date: "2022-09-22",
    },
  ],
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
        <section className="home__articles">
          <div className="home__articles--title">
            <h2>Articles</h2>
          </div>
          <div className="home__articles--list">
            {article.other.map((e) => {
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
