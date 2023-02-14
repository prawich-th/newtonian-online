import { ClockLoader } from "react-spinners";

const Loading: React.FC<{ msg?: string }> = (props) => {
  return (
    <div className="loading__wrapper">
      <div className="loading">
        <ClockLoader size={"80px"} color={"var(--signature-grey)"} />
        <span>
          <h3>Loading...</h3>
          {props.msg && <h4>{props.msg}</h4>}
        </span>
      </div>
    </div>
  );
};

export default Loading;
