import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { Link } from "react-router-dom";

const ImageC: React.FC<{
  image: string;
  caption: string;
  notfound?: "gone" | "img";
}> = (props) => {
  const condition = props.notfound ?? "img";
  const [gone, setIsGone] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <ReactModal
        isOpen={openModal}
        style={{
          content: {
            width: "70vw",
            height: "60vh",
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            backgroundColor: "var(--background-color)",
            border: "solid 0.1rem var( --border-color)",
            borderRadius: "1.1rem",
          },
          overlay: {
            backgroundColor: "var(--overlay-color)",
          },
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <img
            src={props.image}
            alt="Image With Caption"
            style={{
              height: "100%",
              width: "fit",
              // objectFit: "cover",
            }}
            onError={(e) => {
              if (props.notfound === "gone") {
                setIsGone(true);
                return;
              }
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/notfound.webp";
            }}
          />
          <i
            style={{
              color: "var(--font-color)",
              fontSize: "3rem",
              position: "absolute",
              top: "1rem",
              right: "1rem",
              margin: "0",
              padding: "0",
              width: "1rem",
              height: "1rem",
              textShadow:
                "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
            }}
            onClick={() => setOpenModal(false)}
            className="bx bx-x"
          ></i>
        </div>
      </ReactModal>

      <div
        onClick={() => setOpenModal(true)}
        className="image-c"
        style={gone ? { display: "none" } : {}}
      >
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
    </>
  );
};

export default ImageC;
