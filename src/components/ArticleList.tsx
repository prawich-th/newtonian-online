import ArticleCard from "./ArticleCard";

const ArticleList: React.FC<{
  articles: {
    _id: string;
    image: string;
    title: string;
    text: string;
    author: { name: string; _id: string };
    date: string;
    // categories: string;
  }[];
}> = (props) => {
  console.log({ props });
  return (
    <section className="home__articles">
      <div className="home__articles--title">
        <h2>Articles</h2>
      </div>
      <div className="home__articles--list">
        {props.articles.map((e) => {
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
  );
};

export default ArticleList;
