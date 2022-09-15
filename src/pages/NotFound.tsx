import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <h1>404 | Not Found</h1>
      <p>
        the page requested cannot be found. <Link to={"/"}>back home</Link>
      </p>
    </>
  );
};

export default NotFound;
