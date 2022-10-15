import ArticleCard from "./ArticleCard";

const ArticleList: React.FC<{
  articles: {
    id: string;
    image: string;
    title: string;
    text: string;
    author: string;
    date: string;
    // categories: string;
  }[];
}> = (props) => {
  return (
    <section className="home__articles">
      <div className="home__articles--title">
        <h2>Articles</h2>
      </div>
      <div className="home__articles--list">
        {props.articles.map((e) => {
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
  );
};

export default ArticleList;
