import Link from "next/link";

const Header = () => {
  return (
    <div className="header">
      <div className="header__logo">
        <img src="logo.png" />
      </div>
      <div className="header__nav">
        <ul>
          <li>
            <Link href={"/categories"}>Categories</Link>
          </li>
          <li>
            <Link href={"/issues"}>Issues</Link>
          </li>
          <li>
            <Link href={"/about-us"}>About Us</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
