import Link from "next/link";

const Footer = () => {
  return (
    <div className="footer__wrapper">
      <div className="footer">
        <div className="footer__copy">
          All Rights Reserved &copy; 2022-23 The Newtonian
        </div>

        <div className="footer__right">
          <h4>
            The Newtonian Online Version 2.0 <br />
            <Link
              href={"/members/1"}
              style={{
                fontStyle: "italic",
              }}
            >
              Written by Prawich Thawansakdivudhi
            </Link>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Footer;
