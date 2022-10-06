import { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import ImageC from "../components/ImageC";
import Letter from "../components/Letter";
import Loading from "../components/Loading";
import { Contents, Letters } from "../data";

const ArticleLink: React.FC<{ id: string; heading: string; author: string }> = (
  props
) => {
  return (
    <Link className="issue__info--article" to={`/article/${props.id}`}>
      <h5>{props.heading}</h5>
      <h6>{props.author}</h6>
    </Link>
  );
};

const Issue = () => {
  const param = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [contents, setContents] = useState([
    {
      id: "",
      heading: "",
      author: "",
    },
  ]);
  const [letters, setLetters] = useState([
    { title: "", text: "", signatures: [{ name: "", img: "", position: "" }] },
  ]);
  console.log(param);

  useEffect(() => {
    if (!param.id) return;
    setContents(Contents["iss1"]);
    setLetters(Letters);
    setIsLoading(false);
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="issue__wrapper">
      <div className="issue">
        <div className="issue__info">
          <div className="issue__info--cover">
            <ImageC image="/issue1-cover.png" caption="issue 1 - cover" />
          </div>
          <div className="issue__info--content">
            <div className="issue__heading">
              <h1>Issue {param.id}</h1>
              <h3>31th October 2022</h3>
            </div>
            <h4>Table Of Contents</h4>
            {contents && contents.map((e) => <ArticleLink key={e.id} {...e} />)}
          </div>
        </div>
        {letters &&
          letters.map((e) => {
            return (
              <Letter
                key={e.title}
                title={e.title}
                text={e.text}
                signatures={e.signatures}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Issue;
