import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import ArticleCard from "../components/ArticleCard";
import ArticleList from "../components/ArticleList";
import Loading from "../components/Loading";

const Categories = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const catergories = [
    { name: "Letter", id: "Letter" },
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
      name: "Research",
      id: "Research",
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
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `Catergories | The Newtonian`;

    fetch(`https://apis.news.newton.ac.th/api/reader/article`)
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        setArticles(data);
        setIsLoading(false);
      })
      .catch((err) => {
        navigate("/conn");
      });
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="categories__wrapper">
      <div className="categories">
        {catergories &&
          catergories.map((c) => {
            const l = articles.filter((a) => a.category === c.id);
            console.log(l);
            return (
              <section className="categories__articles">
                <ArticleList headline={c.name} articles={l} />
              </section>
            );
          })}
      </div>
    </div>
  );
};

export default Categories;
