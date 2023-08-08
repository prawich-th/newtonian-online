import ImageC from "@/components/ImageC";
import Letter from "@/components/Letter";
import nth from "@/utils/nth";
import Head from "next/head";
import Link from "next/link";
import { redirect } from "next/navigation";

type IssueContent = {
  id: string;
  headline: string;
  member: {
    name: string;
    nickname: string;
    id: number;
  };
}[];

type Letter = {
  id: string;
  sender: string;
  content: string;
  letterSigner: {
    members: {
      signature: string;
      name: string;
      role: string;
    };
  }[];
};

const ArticleLink: React.FC<{
  id: string;
  headline: string;
  member: any;
}> = (props) => {
  return (
    <Link className="issue__info--article" href={`/article/${props.id}`}>
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

const fetchIssueData = async (id: number) => {
  const data = await fetch(
    `https://apis.news.newton.ac.th/api/reader/issue/${id}`,
    {
      // cache: "no-cache",
      next: {
        revalidate: 3600,
      },
    }
  );

  if (data.status !== 200)
    throw new Error(
      `Issue ${id} has yet to be released, please come back later!`
    );

  return data.json() as Promise<{
    publishingDate: string;
    articles: IssueContent;
    pdfLink: string;
    letter: Letter;
    mainArticlesId: string;
  }>;
};

const Issue = async ({ params }: { params: { id: string } }) => {
  const issueData = await fetchIssueData(Number(params.id));

  // useEffect(() => {
  //   if (!params.id) return;

  //   document.title = `Issue ${params.id} | The Newtonian`;

  // const [toPdf, setToPdf] = useState(false);
  // const pdfViewHandler = () => {
  //   setToPdf(true);
  //   setIsLoading(true);
  //   console.log("adding view");
  //   fetch(`https://apis.news.newton.ac.th/api/reader/viewPdf/${params.id}`, {
  //     method: "PATCH",
  //   })
  //     .then((data) => data.json())
  //     .then((data) => {
  //       console.log(data);
  //       // window.open(pdfLink, "_blank", "noreferrer");
  //       setIsLoading(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       // window.open(pdfLink, "_blank", "noreferrer");
  //       setIsLoading(false);
  //     });
  // };

  async function pdfViewHandler() {
    "use server";

    const data = await fetch(
      `https://apis.news.newton.ac.th/api/reader/viewPdf/${params.id}`,
      {
        method: "PATCH",
      }
    );

    const json = await data.json();

    return redirect(json.pdfLink);
  }

  return (
    <div className="issue__wrapper">
      <Head>
        <title>Issue {params.id} | The Newtonian</title>
      </Head>
      <div className="issue">
        <div className="issue__info">
          <div className="issue__info--cover">
            <ImageC
              image={`https://apis.news.newton.ac.th/images/cover/issue${params.id}.webp`}
              caption={`issue ${params.id} - cover`}
            />
          </div>
          <div className="issue__info--content">
            <div className="issue__headline">
              <h1>Issue {params.id}</h1>
              <h3>{nth(issueData.publishingDate)}</h3>
            </div>
            <form action={pdfViewHandler}>
              <button className="issue__pdf">
                <i className="bx bxs-file-pdf"></i>
                <h3> Access the pdf copy</h3>
              </button>
            </form>
            <h4>Table Of Contents</h4>
            {issueData.articles &&
              issueData.articles
                .sort((a, b) => {
                  let e = 0;
                  if (a.id === issueData.mainArticlesId) e = 1000;
                  return +b.id - e;
                })
                .map((e) => <ArticleLink key={e.id} {...e} />)}
          </div>
        </div>
        {issueData.letter && (
          <Letter
            key={issueData.letter.id}
            sender={issueData.letter.sender}
            content={issueData.letter.content}
            signatures={issueData.letter.letterSigner.sort((a, b) => {
              return a.members.role.startsWith("Founder") ? -10 : 1;
            })}
          />
        )}
      </div>
    </div>
  );
};

export default Issue;
