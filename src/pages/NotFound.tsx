import { Link, useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  return (
    <>
      <h1>404 | Not Found</h1>
      <p>
        the {location.pathname.startsWith("/article") ? "article" : "page"}{" "}
        requested (
        {location.pathname.startsWith("/article")
          ? location.pathname.split("/").reverse()[0]
          : location.pathname}
        ) cannot be found. <Link to={"/"}>back home</Link>
      </p>
    </>
  );
};

export default NotFound;
