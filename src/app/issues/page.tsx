import IssueCard from "@/components/IssueCard";
import Head from "next/head";

const fetchIssuesData = async () => {
  const data = await fetch("https://apis.news.newton.ac.th/api/reader/issue", {
    next: {
      revalidate: 60,
    },
  });

  return data.json();
};

const Issues = async () => {
  const issues = await fetchIssuesData();

  console.log(issues);

  return (
    <div className="issues__wrapper">
      <Head>
        <title>Issues | The Newtonian</title>
      </Head>
      <div className="issues">
        <h2>All Issues</h2>

        <div className="issues__list">
          {issues.map((issue: any) => {
            return (
              <IssueCard
                key={issue.id}
                no={issue.id}
                publishingDate={issue.publishingDate}
                cover={issue.cover}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Issues;
