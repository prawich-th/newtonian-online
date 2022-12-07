import { Link } from "react-router-dom";
import nth from "../utilities/nth";
import ImageC from "./ImageC";

const IssueCard: React.FC<{ date: string; no: number; cover: string }> = (
  props
) => {
  return (
    <div className="issue-card">
      <Link to={`/issues/${props.no}`}>
        <div className="issue-card__cover">
          <img src={`https://apis.news.newton.ac.th/images${props.cover}`} />
        </div>
        <div className="issue-card__info">
          <h3>Issue {props.no}</h3>
          <h4>{nth(props.date)}</h4>
        </div>
      </Link>
    </div>
  );
};

export default IssueCard;
