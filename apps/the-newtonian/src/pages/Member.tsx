import ArticleList from "../components/ArticleList";
import { homepage } from "../data";

const Member = () => {
  return (
    <div className="member__wrapper">
      <div className="member">
        <div className="member__info">
          <div className="member__info--left">
            <div className="member__info--image">
              <img src="/members/image.jpeg" alt="member's image" />
            </div>
            <div className="member__info--bio">
              <h3>Prawich Thawansakdivudhi</h3>
              <h4>Year 11 - Medical</h4>
              <h5>Head Technician / Writer</h5>
              {/* <h5>Writer</h5> */}
              <p>
                Prawich was an Assumption student before he came to the Newton
                Sixth Form School. He is a talented programmer, accually he
                written this website himself along with P' Kane. However, he's
                hooked with the idea of micro biology and thus want to pursue
                being a researcher.
              </p>
            </div>
          </div>
          <div className="member__info--right">
            <img src="/signatures/prawich.png" alt="Member's Signature" />
          </div>
        </div>
        <ArticleList articles={homepage.other} />
      </div>
    </div>
  );
};

export default Member;
