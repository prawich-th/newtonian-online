import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <div className="header__logo">
        <img src="logo.png" />
      </div>
      <div className="header__nav">
        <ul>
          <li>
            <Link to={"/categories"}>Categories</Link>
          </li>
          <li>
            <Link to={"/issues"}>Issues</Link>
          </li>
          <li>
            <Link to={"/about-us"}>About Us</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
