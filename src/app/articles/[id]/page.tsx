import ReactMarkdown from "react-markdown";
import Link from "next/link";
import ImageC from "@/components/ImageC";
import { Suspense } from "react";
import LoadingArticle from "./loading";
import Head from "next/head";

export interface articleData {
  id: string;
  headline: string;
  cover: string;
  member: { id: string; name: string }[];
  publishingDate: string;
  content: string;
  category: string;
}

async function fetchArticleData(id: string) {
  const data = await fetch(
    `https://apis.news.newton.ac.th/api/reader/article/${id}`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (data.status !== 200) throw new Error("Article not found");

  return data.json() as Promise<articleData>;
  // return {
  //   // content: "ercl",
  // };
}

export default async function Article({ params }: { params: { id: string } }) {
  const article = await fetchArticleData(params.id);

  return (
    <Suspense fallback={<LoadingArticle />}>
      <Head>
        <title>{article.headline} | The Newtonian</title>
      </Head>
      <div className="article">
        <div className="article__wrapper">
          {/* <Suspense fallback={<Loading />}> */}
          <div className="article__heading">
            <h2>{article.headline}</h2>
            <h3>
              {article.member.map((member, i) => (
                <span key={member.id}>
                  {i > 0 ? ", " : " "}
                  <Link href={`/members/${member.id}`}>
                    {member.name.trim()}
                  </Link>
                </span>
              ))}
              {" - "}
              {new Date(article.publishingDate).toLocaleDateString("en-UK", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              {" - "}
              {Math.round(article.content.split(" ").length / 300)} min. read
              {" - "}
              {"id: " + article.id}
            </h3>
            <ImageC
              image={`https://apis.news.newton.ac.th/images${article.cover}`}
              caption={article.headline}
              notfound="gone"
            />
          </div>
          <div className="article__content">
            <ReactMarkdown
              components={{
                // @ts-ignore
                p: (paragraph: { children?: boolean; node?: any }) => {
                  const { node } = paragraph;

                  if (node.children[0].tagName === "img") {
                    const image = node.children[0];
                    const caption = image.properties.alt;

                    return (
                      <div className="article__content--image">
                        <ImageC
                          image={`https://apis.news.newton.ac.th${image.properties.src}`}
                          caption={caption}
                          notfound="gone"
                        />
                      </div>
                    );
                  }
                  return <p>{paragraph.children}</p>;
                },
              }}
            >
              {article.content}
            </ReactMarkdown>
          </div>
          {/* </Suspense> */}
        </div>
      </div>
    </Suspense>
  );
}
