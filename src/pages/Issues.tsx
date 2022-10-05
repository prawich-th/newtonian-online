import { Link } from "react-router-dom";
import ImageC from "../components/ImageC";
import IssueCard from "../components/IssueCard";
import Letter from "../components/Letter";

const Issues = () => {
  return (
    <div className="issues">
      <h2>All Issues</h2>

      <div className="issues__list">
        <IssueCard no={1} date={"10-31-2022"} cover={"/issue1-cover.png"} />
      </div>
    </div>
  );
};

export default Issues;
