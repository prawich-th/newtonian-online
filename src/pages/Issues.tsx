import { Link } from "react-router-dom";
import Letter from "../components/Letter";

const Issues = () => {
  return (
    <div>
      <h1>A list of Issues (will be update)</h1>

      <span style={{ fontSize: "1.75rem" }}>
        <Link to={"/issues/1"}>Issue 1</Link>
      </span>
    </div>
  );
};

export default Issues;
