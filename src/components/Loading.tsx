import { ClockLoader } from "react-spinners";

const Loading: React.FC = (props) => {
  return (
    <div className="loading__wrapper">
      <div className="loading">
        <ClockLoader size={"80px"} color={"#9e9e9e"} />
        <h3>Loading...</h3>
      </div>
    </div>
  );
};

export default Loading;
