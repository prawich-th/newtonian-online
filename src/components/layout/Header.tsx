import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header__wrapper">
      <div className="header">
        <div className="header__logo">
          <Link to="/">
            <img src="/logo.svg" />
          </Link>
        </div>
        <div className="header__nav">
          <ul>
            <li key={"ca"}>
              <Link to={"/categories"}>Categories</Link>
            </li>
            <li key={"iss"}>
              <Link to={"/issues"}>Issues</Link>
            </li>
            <li key={"members"}>
              <Link to={"/members"}>Members</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
