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
import nth from "../utilities/nth";

const ArticleLink: React.FC<{
  id: string;
  headline: string;
  member: any;
}> = (props) => {
  return (
    <Link className="issue__info--article" to={`/article/${props.id}`}>
      <h5>{props.headline}</h5>
      <h6>
        {" "}
        {props.member.map((member: any, i: number) => (
          <span key={i}>
            {i > 0 ? ", " : ""}
            {member.name}
          </span>
        ))}
      </h6>
    </Link>
  );
};

const Issue = () => {
  const param = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [pubDate, setPubDate] = useState("");
  const [pdfLink, setPdfLink] = useState("");
  const [contents, setContents] = useState([
    {
      id: "",
      headline: "",
      member: {
        name: "",
        nickname: "",
        id: 0,
      },
    },
  ]);
  const [isNotFound, setIsNotFound] = useState(false);
  const navigate = useNavigate();
  const [letter, setLetter] = useState({
    id: "",
    sender: "",
    content: "",
    letterSigner: [
      {
        members: {
          signature: "",
          name: "",
          role: "",
        },
      },
    ],
  });
  const [main, setMain] = useState();

  useEffect(() => {
    if (!param.id) return;

    document.title = `Issue ${param.id} | The Newtonian`;

    fetch(`https://apis.news.newton.ac.th/api/reader/issue/${param.id}`)
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        setPubDate(data.publishingDate);
        setContents(data.articles);
        setPdfLink(data.pdfLink);
        setLetter(data.letter);
        setMain(data.mainArticlesId);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsNotFound(true);
        setIsLoading(false);
      });
  }, []);
  const [toPdf, setToPdf] = useState(false);
  const pdfViewHandler = () => {
    setToPdf(true);
    setIsLoading(true);
    console.log("adding view");
    fetch(`https://apis.news.newton.ac.th/api/reader/viewPdf/${param.id}`, {
      method: "PATCH",
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        window.open(pdfLink, "_blank", "noreferrer");
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        window.open(pdfLink, "_blank", "noreferrer");
        setIsLoading(false);
      });
  };

  if (isLoading && toPdf)
    return (
      <Loading
        msg={`Outbound Traffic: Redirecting you to ${pdfLink},\n you will no longer be under the Newtonian Online policy.`}
      />
    );
  if (isLoading) return <Loading />;

  if (isNotFound)
    return (
      <div className="issue__wrapper">
        <div className="issue">
          <div className="issue__info">
            <div className="issue__info--cover">
              <ImageC
                image={`/notfound.webp`}
                caption={`issue ${param.id} - cover`}
              />
            </div>
            <div className="issue__info--content">
              <div className="issue__headline">
                <h1>Issue {param.id}</h1>
                <h3>To be announced</h3>
              </div>

              <h4>
                Issue {param.id} has yet to be released, please come back later!
              </h4>
              {/* {contents &&
                contents
                  .sort((a, b) => {
                    let e = 0;
                    if (a.id === main) e = 1000;
                    return +b.id - e;
                  })
                  .map((e) => <ArticleLink key={e.id} {...e} />)} */}
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="issue__wrapper">
      <div className="issue">
        <div className="issue__info">
          <div className="issue__info--cover">
            <ImageC
              image={`https://apis.news.newton.ac.th/images/cover/issue${param.id}.webp`}
              caption={`issue ${param.id} - cover`}
            />
          </div>
          <div className="issue__info--content">
            <div className="issue__headline">
              <h1>Issue {param.id}</h1>
              <h3>{nth(pubDate)}</h3>
            </div>
            <div className="issue__pdf" onClick={pdfViewHandler}>
              <i className="bx bxs-file-pdf"></i>
              <h3> Access the pdf copy</h3>
            </div>
            <h4>Table Of Contents</h4>
            {contents &&
              contents
                .sort((a, b) => {
                  let e = 0;
                  if (a.id === main) e = 1000;
                  return +b.id - e;
                })
                .map((e) => <ArticleLink key={e.id} {...e} />)}
          </div>
        </div>
        {letter && (
          <Letter
            key={letter.id}
            sender={letter.sender}
            content={letter.content}
            signatures={letter.letterSigner}
          />
        )}
      </div>
    </div>
  );
};

export default Issue;
