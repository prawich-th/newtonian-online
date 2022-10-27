import { Link } from "react-router-dom";

const ImageC: React.FC<{
  image: string;
  caption: string;
}> = (props) => {
  return (
    <div className="image-c">
      <img src={props.image} alt="Image With Caption" />
      <p>{props.caption}</p>
    </div>
  );
};

export default ImageC;
