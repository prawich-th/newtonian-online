import { Link, useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import ImageC from "./ImageC";

const Letter: React.FC<{
  sender: string;
  content: string;
  signatures: {
    members: {
      signature: string;
      name: string;
      role: string;
    };
  }[];
}> = (props) => {
  console.log(props);
  return (
    <div className="letter">
      <h1>Letter From {props.sender}</h1>

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
        {props.content}
      </ReactMarkdown>
      <div className="letter__signatures">
        {props.signatures.length > 0 &&
          props.signatures.map((e) => {
            return (
              <div key={e.members.name} className="letter__signatures--item">
                <div className="letter__signatures--wrap">
                  <img
                    src={`https://apis.news.newton.ac.th/images${e.members.signature}`}
                  />
                </div>
                <span>
                  <h3>{e.members.name}</h3>
                  <h4>{e.members.role}</h4>
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Letter;
