import { Link, useLocation } from "react-router-dom";

const Letter: React.FC<{
  title: string;
  text: string;
  signatures: {
    img: string;
    name: string;
    position: string;
  }[];
}> = (props) => {
  return (
    <div className="letter__wrapper">
      <div className="letter">
        <h1>Letter From {props.title}</h1>
        <p>{props.text}</p>
        <div className="letter__signatures">
          {props.signatures.length > 0 &&
            props.signatures.map((e) => {
              return (
                <div className="letter__signatures--item">
                  <div className="letter__signatures--wrap">
                    <img src={e.img} />
                  </div>
                  <span>
                    <h3>{e.name}</h3>
                    <h4>{e.position}</h4>
                  </span>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Letter;
