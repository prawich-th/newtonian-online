import ReactMarkdown from "react-markdown";
import Link from "next/link";
const ArticleCard: React.FC<{
  cover: string;
  text: string;
  headline: string;
  member: { name: string; id: string }[];
  publishingDate: string;
  id: string;
}> = (props) => {
  return (
    <div className="article-card">
      <span>
        <div className="article-card__image">
          <Link href={`/articles/${props.id}`}>
            <img
              src={`https://apis.news.newton.ac.th/images/${props.cover}`}
              alt={`Preview Image of the article ${props.headline}`}
              // onError={(e) => {
              //   e.currentTarget.onerror = null;
              //   e.currentTarget.src = "/notfound.webp";
              // }}
            />
          </Link>
        </div>
        <div className="article-card__info">
          <div className="article-card__info--content">
            <h4>{props.headline}</h4>
            <p>
              <ReactMarkdown
                components={{
                  // @ts-ignore
                  p: (paragraph: { children?: boolean; node?: any }) => {
                    const { node } = paragraph;

                    if (node.children[0].tagName === "img") {
                      const image = node.children[0];
                      const caption = image.properties.alt;

                      return <></>;
                    }
                    return paragraph.children;
                  },
                }}
              >
                {props.text.split(" ").slice(0, 20).join(" ") + "..."}
              </ReactMarkdown>
            </p>
          </div>
        </div>
      </span>
      <div
        className="article-card__author"
        style={{ display: "inline-flex", alignItems: "flex-end" }}
      >
        <h5>
          {props.member.map((member, i) => (
            <span key={member.id}>
              {i > 0 ? ", " : ""}
              <Link href={`/members/${member.id}`}>{member.name.trim()}</Link>
            </span>
          ))}
          {" | "}
          {new Date(props.publishingDate).toLocaleString("en-UK", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}{" "}
          | {`id: ${props.id}`}
        </h5>
      </div>
    </div>
  );
};

export default ArticleCard;
