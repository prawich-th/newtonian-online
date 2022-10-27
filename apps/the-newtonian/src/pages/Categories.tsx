import { useState, useEffect } from "react";
import ArticleCard from "../components/ArticleCard";
import Loading from "../components/Loading";
import { homepage } from "../data";

const Categories = () => {
  const [articles, setArticles] = useState([
    {
      id: "",
      image: "",
      title: "",
      text: "",
      author: "",
      date: "",
      categories: "",
    },
  ]);
  const [isLoading, setIsLoading] = useState(true);

  const catergories = [
    {
      name: "Interview",
      id: "Interview",
    },
    {
      name: "School Update",
      id: "SchoolUpdate",
    },
    {
      name: "Advice / Essay",
      id: "AdviceEssay",
    },
    {
      name: "Fiction",
      id: "Fiction",
    },
    {
      name: "Performing Arts",
      id: "PerformingArts",
    },
    {
      name: "Visual Arts",
      id: "VisualArts",
    },
    {
      name: "Review",
      id: "Review",
    },
    {
      name: "Business by NBS",
      id: "NBS",
    },
  ];

  useEffect(() => {
    setArticles(homepage.other);
    setIsLoading(false);
  });

  if (isLoading) return <Loading />;

  return (
    <div className="categories__wrapper">
      <div className="categories">
        {catergories &&
          catergories.map((c) => (
            <section className="categories__articles">
              <div className="categories__articles--title">
                <h2>{c.name}</h2>
              </div>
              <div className="categories__articles--list">
                {articles.map((e) => {
                  if (e.categories !== c.id) return;
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
          ))}
      </div>
    </div>
  );
};

export default Categories;
