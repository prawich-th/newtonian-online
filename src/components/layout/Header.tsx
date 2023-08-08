import Link from "next/link";

const Header = () => {
  return (
    <div className="header__wrapper">
      <div className="header">
        <div className="header__logo">
          <Link href="/">
            <img
              src="/logo.svg"
              alt="The Newtonian Logo"
              className="header__logo--light"
            />
            <img
              src="/logo-dark.svg"
              alt="The Newtonian Logo"
              className="header__logo--dark"
            />
          </Link>
        </div>
        <div className="header__nav">
          <ul>
            <li key={"ca"}>
              <Link href={"/articles"}>Categories</Link>
            </li>
            <li key={"iss"}>
              <Link href={"/issues"}>Issues</Link>
            </li>
            <li key={"members"}>
              <Link href={"/members"}>Members</Link>
            </li>
            <>
              <li>
                <Link style={{ color: "#CC3333" }} href={"/eics"}>
                  Eics
                </Link>
              </li>
            </>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
