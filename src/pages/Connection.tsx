import { Link, useLocation } from "react-router-dom";

const ConnectionErr = () => {
  const location = useLocation();

  return (
    <div className="not-found__wrapper">
      <div className="not-found">
        <h1>Connection Error</h1>
        <p>
          The Newtonian Online cannot contact the server, please try agian
          later.
        </p>
      </div>
    </div>
  );
};

export default ConnectionErr;
