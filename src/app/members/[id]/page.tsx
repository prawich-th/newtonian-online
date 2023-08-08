import ImageC from "@/components/ImageC";
import { Member } from "../page";
import ArticleList from "@/components/ArticleList";

const fetchMemberData = async (id: number) => {
  const data = await fetch(`https://apis.news.newton.ac.th/api/member/${id}`);

  return data.json() as Promise<Member>;
};

const Member = async ({ params }: { params: { id: string } }) => {
  const memberData = await fetchMemberData(+params.id);
  let memberStatus: string;

  switch (memberData.status) {
    case "ACTI":
      memberStatus = "Active";
      break;
    case "GRAD":
      memberStatus = "Graduated";
      break;
    case "CONS":
      memberStatus = "Award Winner";
      break;
    case "LEAV":
      memberStatus = "Resigned";
      break;
    default:
      memberStatus = "Active";
      break;
  }
  // console.log({ memberData });

  return (
    <div className="member__wrapper">
      <div className="member">
        <div className="member__info">
          <div className="member__info--left">
            <div className="member__info--image">
              <ImageC
                image={`https://apis.news.newton.ac.th/images${memberData.profile}`}
                caption={`${memberData.nickname}'s image`}
                notfound="img"
                height={280}
              />
            </div>
            <div className="member__info--bio">
              <h3>
                {memberData.name} ({memberData.nickname})
              </h3>
              <h4>
                Year {memberData.year} - {memberData.track}{" "}
                <span style={{ fontStyle: "italic" }}>({memberStatus})</span>
              </h4>
              <h5 style={{ color: "var(--signature-grey)" }}>
                {memberData.role}
              </h5>
              <p>{memberData.bio}</p>
            </div>
          </div>
          <div className="member__info--right">
            <img
              src={`https://apis.news.newton.ac.th/images${memberData.signature}`}
              alt="Member's Signature"
            />
          </div>
        </div>
        <ArticleList
          headline={"Articles"}
          articles={memberData.articles}
          error="This member has not published any article"
        />
      </div>
    </div>
  );
};

export default Member;
