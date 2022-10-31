import { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import ImageC from "../components/ImageC";
import Letter from "../components/Letter";
import Loading from "../components/Loading";
import { Contents, Letters } from "../data";

const ArticleLink: React.FC<{
  id: string;
  headline: string;
  author: string;
}> = (props) => {
  return (
    <Link className="issue__info--article" to={`/article/${props.id}`}>
      <h5>{props.headline}</h5>
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
      headline: "",
      author: "",
    },
  ]);
  const navigate = useNavigate();
  const [letters, setLetters] = useState([
    { title: "", text: "", signatures: [{ name: "", img: "", position: "" }] },
  ]);
  console.log(param);

  useEffect(() => {
    if (!param.id) return;

    fetch(
      `https://apis.news.newton.ac.th/api/reader/issue/getIssue/${param.id}`
    )
      .then((data) => data.json())
      .then((data) => {
        setContents(data.articles);
        setLetters(data.letters);
        setIsLoading(false);
      })
      .catch((err) => {
        navigate("/conn");
      });
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
            <div className="issue__headline">
              <h1>Issue {param.id}</h1>
              <h3>31th October 2022</h3>
            </div>
            <a
              href={
                "https://drive.google.com/file/d/1NEBp3h-GWxHdTAYCwU-pZCvZGpAtJ4vh/view?usp=sharing"
              }
            >
              <div className="issue__pdf">
                <h3>Access the pdf copy</h3>
              </div>
            </a>
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
