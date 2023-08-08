import Link from "next/link";

import ImageC from "./ImageC";
import nth from "@/utils/nth";

const IssueCard: React.FC<{
  publishingDate: string;
  no: number;
  cover: string;
}> = (props) => {
  return (
    <div className="issue-card">
      <Link href={`/issues/${props.no}`}>
        <div className="issue-card__cover">
          <img src={`https://apis.news.newton.ac.th/images${props.cover}`} />
        </div>
        <div className="issue-card__info">
          <h3>Issue {props.no}</h3>
          <h4>{nth(props.publishingDate)}</h4>
        </div>
      </Link>
    </div>
  );
};

export default IssueCard;
