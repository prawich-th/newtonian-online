import { Link, useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import ImageC from "./ImageC";

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
    <div className="letter">
      <h1>Letter From {props.title}</h1>

      <ReactMarkdown
        components={{
          // @ts-ignore
          p: (paragraph: { children?: boolean; node?: any }) => {
            const { node } = paragraph;

            if (node.children[0].tagName === "image") {
              const image = node.children[0];
              const caption = image.properties.alt;

              return <ImageC image={image.properties.src} caption={caption} />;
            }
            return <p>{paragraph.children}</p>;
          },
        }}
      >
        {props.text}
      </ReactMarkdown>
      <div className="letter__signatures">
        {props.signatures.length > 0 &&
          props.signatures.map((e) => {
            return (
              <div key={e.name} className="letter__signatures--item">
                <div className="letter__signatures--wrap">
                  <img src={`https://apis.news.newton.ac.th/images${e.img}`} />
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
  );
};

export default Letter;
