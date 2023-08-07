import ArticleList from "@/components/ArticleList";
import { articleData } from "./[id]/page";
import Head from "next/head";

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
    name: "Fiction / Poetry",
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

async function fetchArticles() {
  const data = await fetch(
    `https://apis.news.newton.ac.th/api/reader/article`,
    { next: { revalidate: 60 } }
  );

  return data.json() as Promise<articleData[]>;
}

export default async function Articles() {
  const articles = await fetchArticles();

  return (
    <div className="categories__wrapper">
      <Head>
        <title>Articles | The Newtonian</title>
      </Head>
      <div className="categories">
        {catergories &&
          catergories.map((c) => {
            const l = articles.filter((a) => a.category === c.id);

            return (
              <section className="categories__articles">
                <ArticleList
                  headline={c.name}
                  articles={l.reverse()}
                  error="We do not have any published article(s) related to this topic yet."
                />
              </section>
            );
          })}
      </div>
    </div>
  );
}
