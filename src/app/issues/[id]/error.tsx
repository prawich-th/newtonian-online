"use client";

import ImageC from "@/components/ImageC";
import Head from "next/head";
import { useParams } from "next/navigation";

export default function LoadingIssue({
  error,
  reset,
}: {
  error: Error & { digest?: string; cause: number };
  reset: () => void;
}) {
  const { id } = useParams();

  return (
    <div className="issue__wrapper">
      <Head>
        <title>Issue {id} | The Newtonian</title>
      </Head>
      <div className="issue">
        <div className="issue__info">
          <div className="issue__info--cover">
            <ImageC image={`/notfound.webp`} caption={`Not Found`} />
          </div>
          <div className="issue__info--content">
            <div className="issue__headline">
              <h1>Issue {id}</h1>
              <h3>To be announced</h3>
            </div>

            <h4>{error.message}</h4>
            {/* {contents &&
          contents
            .sort((a, b) => {
              let e = 0;
              if (a.id === main) e = 1000;
              return +b.id - e;
            })
            .map((e) => <ArticleLink key={e.id} {...e} />)} */}
          </div>
        </div>
      </div>
    </div>
  );
}
