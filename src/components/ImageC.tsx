import Link from "next/link";
const ImageC: React.FC<{
  image: string;
  caption: string;
  notfound?: "gone" | "img";
}> = (props) => {
  const condition = props.notfound ?? "img";

  return (
    <>
      <div
        className="image-c"
        // style={gone ? { display: "none" } : {}}
      >
        <img
          src={props.image}
          alt="Image With Caption"
          // onError={(e) => {
          //   if (props.notfound === "gone") {              return;
          //   }
          //   e.currentTarget.onerror = null;
          //   e.currentTarget.src = "/notfound.webp";
          // }}
        />
        <p>{props.caption}</p>
      </div>
    </>
  );
};

export default ImageC;
