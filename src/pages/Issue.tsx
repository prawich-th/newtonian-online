import { Link, useLocation } from "react-router-dom";
import Letter from "../components/Letter";

const Letters = [
  {
    title: "Headmaster",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec luctus elit vel varius consectetur. Sed blandit eros id vehicula semper. Maecenas ullamcorper et arcu a feugiat. Curabitur nec iaculis enim. Nullam dapibus egestas mauris, scelerisque interdum dolor congue sit amet. Vestibulum quis dui a orci ornare venenatis. Sed ut iaculis sapien. Suspendisse in lobortis lacus. Curabitur luctus luctus risus et consectetur. Morbi eget sapien vel nunc molestie varius. Praesent eu ante at est eleifend egestas. Ut vel nisi a elit imperdiet bibendum. Nunc accumsan felis sed sapien commodo dapibus. Donec blandit, nisl eu consequat feugiat, tellus tortor scelerisque purus, sed convallis eros ex sed purus. Donec nec varius massa.",
    signatures: [
      {
        name: "Dr. Teerakiat Jaroensettasin M.D. Ph.D.",
        position: "Headmaster of The Newton Sixth Form School",
        img: "/eics-signatures/kimnite.png",
      },
    ],
  },
  {
    title: "Editors-in-chief",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec luctus elit vel varius consectetur. Sed blandit eros id vehicula semper. Maecenas ullamcorper et arcu a feugiat. Curabitur nec iaculis enim. Nullam dapibus egestas mauris, scelerisque interdum dolor congue sit amet. Vestibulum quis dui a orci ornare venenatis. Sed ut iaculis sapien. Suspendisse in lobortis lacus. Curabitur luctus luctus risus et consectetur. Morbi eget sapien vel nunc molestie varius. Praesent eu ante at est eleifend egestas. Ut vel nisi a elit imperdiet bibendum. Nunc accumsan felis sed sapien commodo dapibus. Donec blandit, nisl eu consequat feugiat, tellus tortor scelerisque purus, sed convallis eros ex sed purus. Donec nec varius massa.",
    signatures: [
      {
        name: "Yanitta Iewwongcharoen",
        position: "Editor-in-chief",
        img: "/eics-signatures/krapook.png",
      },
    ],
  },
  {
    title: "Deputy Editors-in-chief",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec luctus elit vel varius consectetur. Sed blandit eros id vehicula semper. Maecenas ullamcorper et arcu a feugiat. Curabitur nec iaculis enim. Nullam dapibus egestas mauris, scelerisque interdum dolor congue sit amet. Vestibulum quis dui a orci ornare venenatis. Sed ut iaculis sapien. Suspendisse in lobortis lacus. Curabitur luctus luctus risus et consectetur. Morbi eget sapien vel nunc molestie varius. Praesent eu ante at est eleifend egestas. Ut vel nisi a elit imperdiet bibendum. Nunc accumsan felis sed sapien commodo dapibus. Donec blandit, nisl eu consequat feugiat, tellus tortor scelerisque purus, sed convallis eros ex sed purus. Donec nec varius massa.",
    signatures: [
      {
        name: "Kunapas Sumpunwetchakul",
        position: "Deputy Editor-in-chief",
        img: "/eics-signatures/kimnite.png",
      },
    ],
  },
];

const Issue = () => {
  return (
    <>
      {Letters &&
        Letters.map((e) => {
          return (
            <Letter title={e.title} text={e.text} signatures={e.signatures} />
          );
        })}
    </>
  );
};

export default Issue;
