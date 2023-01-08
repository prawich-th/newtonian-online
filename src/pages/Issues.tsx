import { useEffect, useState } from "react";
import IssueCard from "../components/IssueCard";
import Loading from "../components/Loading";

const Issues = () => {
  const [issueList, setIssueList] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = `Issues | The Newtonian`;

    fetch("https://apis.news.newton.ac.th/api/reader/issue")
      .then((data) => data.json())
      .then((data) => {
        setIssueList(data);
        setIsLoading(false);
      });
  }, []);

  console.log(issueList);
  if (isLoading) return <Loading />;

  return (
    <div className="issues__wrapper">
      <div className="issues">
        <h2>All Issues</h2>

        <div className="issues__list">
          {issueList.map((issue: any) => {
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
