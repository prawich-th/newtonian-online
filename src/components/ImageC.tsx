import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ImageC: React.FC<{
  image: string;
  caption: string;
  notfound?: "gone" | "img";
}> = (props) => {
  const condition = props.notfound ?? "img";
  const [gone, setIsGone] = useState(false);

  return (
    <div className="image-c" style={gone ? { display: "none" } : {}}>
      <img
        src={props.image}
        alt="Image With Caption"
        onError={(e) => {
          if (props.notfound === "gone") {
            setIsGone(true);
            return;
          }
          e.currentTarget.onerror = null;
          e.currentTarget.src = "/notfound.webp";
        }}
      />
      <p>{props.caption}</p>
    </div>
  );
};

export default ImageC;
