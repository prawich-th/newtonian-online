import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import ImageC from "../components/ImageC";
import Letter from "../components/Letter";

const Contents = [
  {
    id: "256fde4g123df",
    heading: "Letter From the headmaster",
    author: "Dr. Teerakiat Jaroensettasin M.D. Ph.D.",
  },
  {
    id: "123sfd456sdfd",
    heading: "Oam and Shang: The two great minds behind the Newton Musical",
    author: "Yanitta Iewwongcharoen",
  },
  {
    id: "er4789dfg123f",
    heading: "An uncompleted guide: to write a web application",
    author: "Prawich Thawansaldivudhi",
  },
  {
    id: "ijdfsu338jd93",
    heading: "Newton geçt feature in the National Geographic",
    author: "Yanitta Iewwongcharoen",
  },
];

const Letters = [
  {
    title: "Headmaster",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec luctus elit vel varius consectetur. Sed blandit eros id vehicula semper. Maecenas ullamcorper et arcu a feugiat. Curabitur nec iaculis enim. Nullam dapibus egestas mauris, scelerisque interdum dolor congue sit amet. Vestibulum quis dui a orci ornare venenatis. Sed ut iaculis sapien. Suspendisse in lobortis lacus. Curabitur luctus luctus risus et consectetur. Morbi eget sapien vel nunc molestie varius. Praesent eu ante at est eleifend egestas. Ut vel nisi a elit imperdiet bibendum. Nunc accumsan felis sed sapien commodo dapibus. Donec blandit, nisl eu consequat feugiat, tellus tortor scelerisque purus, sed convallis eros ex sed purus. Donec nec varius massa.",
    signatures: [
      {
        name: "Dr. Teerakiat Jaroensettasin M.D. Ph.D.",
        position: "Headmaster of The Newton Sixth Form School",
        img: "/signatures/teerakiat.png",
      },
    ],
  },
  {
    title: "Editor-in-chief",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec luctus elit vel varius consectetur. Sed blandit eros id vehicula semper. Maecenas ullamcorper et arcu a feugiat. Curabitur nec iaculis enim. Nullam dapibus egestas mauris, scelerisque interdum dolor congue sit amet. Vestibulum quis dui a orci ornare venenatis. Sed ut iaculis sapien. Suspendisse in lobortis lacus. Curabitur luctus luctus risus et consectetur. Morbi eget sapien vel nunc molestie varius. Praesent eu ante at est eleifend egestas. Ut vel nisi a elit imperdiet bibendum. Nunc accumsan felis sed sapien commodo dapibus. Donec blandit, nisl eu consequat feugiat, tellus tortor scelerisque purus, sed convallis eros ex sed purus. Donec nec varius massa.",
    signatures: [
      {
        name: "Yanitta Iewwongcharoen",
        position: "Editor-in-chief",
        img: "/signatures/krapook.png",
      },
    ],
  },
  {
    title: "Deputy Editor-in-chief",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec luctus elit vel varius consectetur. Sed blandit eros id vehicula semper. Maecenas ullamcorper et arcu a feugiat. Curabitur nec iaculis enim. Nullam dapibus egestas mauris, scelerisque interdum dolor congue sit amet. Vestibulum quis dui a orci ornare venenatis. Sed ut iaculis sapien. Suspendisse in lobortis lacus. Curabitur luctus luctus risus et consectetur. Morbi eget sapien vel nunc molestie varius. Praesent eu ante at est eleifend egestas. Ut vel nisi a elit imperdiet bibendum. Nunc accumsan felis sed sapien commodo dapibus. Donec blandit, nisl eu consequat feugiat, tellus tortor scelerisque purus, sed convallis eros ex sed purus. Donec nec varius massa.",
    signatures: [
      {
        name: "Kunapas Sumpunwetchakul",
        position: "Deputy Editor-in-chief",
        img: "/signatures/kimnite.png",
      },
    ],
  },
];

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
  console.log(param);

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
            {Contents && Contents.map((e) => <ArticleLink key={e.id} {...e} />)}
          </div>
        </div>
        {Letters &&
          Letters.map((e) => {
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
