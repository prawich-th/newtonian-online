import { json, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

const members = [
  {
    member: {
      id: 1,
      firstname: "Prawich",
      lastname: "Thawansakdivudhi",
      nickname: "T",
      position: "Head of Tech",
      cover: "/t.jpg",
      year: 13,
      track: "Medicine",
      bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, temporibus sint autem modi fugit animi dolorem reprehenderit blanditiis dicta alias natus voluptatem nemo consectetur porro rem molestias adipisci expedita facere.",
      subscribed: true,
    },
    articles: [
      {
        title: "To Live is to Suffer is that so?",
        date: new Date().toISOString(),
        author: { name: "Sakulya Kovitkoolkri", id: 2 },
        tags: [{ name: "Health", color: "#FF0000" }],
        cover: "/cover.webp",
        id: 1,
        content:
          " Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, temporibus sint autem modi fugit animi dolorem reprehenderit blanditiis dicta alias natus voluptatem nemo consectetur porro rem molestias adipisci expedita facere.",
      },
      {
        title: "How to build a Web-app",
        id: 1,
        date: new Date().toISOString(),
        tags: [{ name: "Advice", color: "#00000a" }],
        author: { name: "Prawich Thawansakdivudhi", id: 1 },
        cover: "/student.png",
        content:
          " Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, temporibus sint autem modi fugit animi dolorem reprehenderit blanditiis dicta alias natus voluptatem nemo consectetur porro rem molestias adipisci expedita facere.",
      },
    ],
  },
  {
    member: {
      id: 2,
      firstname: "Sakulya",
      lastname: "Kovitkoolkri",
      nickname: "Jean",
      position: "Author",
      cover: "/jean.png",
      year: 13,
      track: "Medicine",
      bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, temporibus sint autem modi fugit animi dolorem reprehenderit blanditiis dicta alias natus voluptatem nemo consectetur porro rem molestias adipisci expedita facere.",
      subscribed: true,
    },
    articles: [
      {
        title: "To Live is to Suffer is that so?",
        id: 1,
        date: new Date().toISOString(),
        author: { name: "Sakulya Kovitkoolkri", id: 2 },
        cover: "/cover.webp",
        tags: [{ name: "Health", color: "#FF0000" }],
        content:
          " Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, temporibus sint autem modi fugit animi dolorem reprehenderit blanditiis dicta alias natus voluptatem nemo consectetur porro rem molestias adipisci expedita facere.",
      },
      {
        title: "To Live is to Suffer is that so?",
        date: new Date().toISOString(),
        id: 1,
        tags: [{ name: "Health", color: "#FF0000" }],
        author: { name: "Sakulya Kovitkoolkri", id: 2 },
        cover: "/cover.webp",
        content:
          " Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, temporibus sint autem modi fugit animi dolorem reprehenderit blanditiis dicta alias natus voluptatem nemo consectetur porro rem molestias adipisci expedita facere.",
      },
    ],
  },
];

export const load: PageServerLoad = async ({ params }) => {
  const id = +params.id - 1;

  // console.log(id, members[id]);

  return members[id];
};

export const actions: Actions = {
  subscribe: async ({ request }) => {
    const form = await request.formData();
    const subscribed = form.get("subscribed");
    const id = form.get("id");
    console.log(subscribed, id);
  },
};
