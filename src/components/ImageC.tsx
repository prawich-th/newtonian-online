"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
const ImageC: React.FC<{
  image: string;
  caption?: string;
  notfound?: "gone" | "img";
  width?: number;
  height?: number;
}> = (props) => {
  const condition = props.notfound ?? "img";
  const [imageSrc, setImageSrc] = useState(props.image);

  return (
    <>
      <div
        className="image-c"
        // style={{ position: "relative", width: "100%", height: "100%" }}
      >
        <Image
          src={imageSrc}
          alt="Image With Caption"
          onError={(e) => {
            if (props.notfound === "gone") return;
            setImageSrc("/notfound.webp");
          }}
          width={props.width ?? 500}
          height={props.height ?? 500}
          style={{ objectFit: "cover" }}
        />
        {props.caption && <p>{props.caption}</p>}
      </div>
    </>
  );
};

export default ImageC;
