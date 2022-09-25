import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import ImageC from "../components/ImageC";
import Letter from "../components/Letter";

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

const Issue = () => {
  const [query, setQuery] = useSearchParams();
  const param = useParams();

  console.log(query.get("id"));
  console.log(param);

  return (
    <div className="issue__wrapper">
      <div className="issue">
        <div className="issue__heading">
          <h1>Issue {param.id}</h1>
          <h3>31th October 2022</h3>
        </div>
        <div className="issue__info">
          <div className="issue__info--cover">
            <ImageC image="/issue1-cover.png" caption="issue 1 - cover" />
          </div>
          <div className="issue__info--content">
            <h4>Table Of Contents</h4>
            <div className="issue__info--article">
              <h5>Letter From The Headmaster</h5>
              <h6>Dr. Teerakiat Jaroensettasin M.D. Ph.D.</h6>
            </div>
            <div className="issue__info--article">
              <h5>
                Oam and Shang: The two great minds behind the Newton Musical
              </h5>
              <h6>Yanitta Iewwongcharoen</h6>
            </div>
            <div className="issue__info--article">
              <h5>Letter From The Headmaster</h5>
              <h6>Dr. Teerakiat Jaroensettasin M.D. Ph.D.</h6>
            </div>
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
