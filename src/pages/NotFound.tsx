import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <h2>404 | Not Found</h2>
      <p>
        the page requested cannot be found. <Link to={"/"}>back home</Link>
      </p>
    </>
  );
};

export default NotFound;
