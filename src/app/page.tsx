import ReactMarkdown from "react-markdown";
import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import Head from "next/head";
import { Suspense } from "react";
import Loading from "@/components/Loading";

interface HomepageData {
  main: {
    id: string;
    cover: string;
    headline: string;
    content: string;
    member: [{ name: string; id: string }];
  };
  articles: [
    {
      id: string;
      cover: string;
      headline: string;
      content: string;
      member: [{ name: string; id: string }];
      publishingDate: string;
    }
  ];
}

const fetchHomepageData = async () => {
  const data = await fetch(
    `https://apis.news.newton.ac.th/api/reader/homepage?amount=16`,
    {
      // next: {
      //   revalidate: 60,
      // },
      cache: "no-cache",
    }
  );
  // await sleep();
  // console.log("done");

  return (await data.json()) as HomepageData;
};

const HomePage = async () => {
  const homepageData = fetchHomepageData();

  return (
    <>
      <Head>
        <title>Home | The Newtonian</title>
      </Head>
      <Suspense fallback={<Loading />}>
        <Home promise={homepageData} />
      </Suspense>
    </>
  );
};

const Home = async ({ promise }: { promise: Promise<HomepageData> }) => {
  const homepageData = await promise;

  return (
    <div className="home__wrapper">
      <div className="home">
        <section className="home__banner">
          <div className="home__banner--cover">
            <Link href={`/articles/${homepageData.main.id}`}>
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
                    <Link href={`/members/${member.id}`}>{member.name}</Link>
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
                {homepageData.main.content.split(".").slice(0, 5).join(".") +
                  "..."}
              </ReactMarkdown>
            </span>

            <span className="home__banner--readmore">
              <Link href={`/articles/${homepageData.main.id}`}>Read More</Link>
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

export default HomePage;
