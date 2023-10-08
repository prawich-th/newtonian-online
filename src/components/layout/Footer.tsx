import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer__wrapper">
      <div className="footer">
        <div className="footer__copy">
          All Rights Reserved &copy; 2022-23 The Newtonian
        </div>

        <div className="footer__right">
          <h4>
            The Newtonian Online Version 2.1 <br />
            <Link to={"/member/1"}>Written By Prawich Thawansakdivudhi</Link>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Footer;
