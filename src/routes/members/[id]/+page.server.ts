import { json, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { member } from "$lib/types/member";
import type { article } from "$lib/types/articles";

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
  {
    member: {
      id: 3,
      firstname: "Boonruk",
      lastname: "Seanghirunwattana",
      nickname: "Shang",
      position: "Head Writer",
      cover: "/shang.webp",
      year: 14,
      track: "Medicine",
      bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, temporibus sint autem modi fugit animi dolorem reprehenderit blanditiis dicta alias natus voluptatem nemo consectetur porro rem molestias adipisci expedita facere.",
      subscribed: true,
    },
    articles: [
      {
        title: "The Newton Musical: Technical Director",
        id: 2,
        date: new Date().toISOString(),
        author: { name: "Prawich Thawansakdivudhi", id: 1 },
        cover: "/cover.webp",
        tags: [{ name: "Musical", color: "#001a99" }],
        content:
          " Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, temporibus sint autem modi fugit animi dolorem reprehenderit blanditiis dicta alias natus voluptatem nemo consectetur porro rem molestias adipisci expedita facere.",
      },
    ],
  },
];

export const load: PageServerLoad = async ({ params }) => {
  const id = +params.id;

  const raw = await fetch("https://apis.news.newton.ac.th/api/member/" + id);
  const data = (await raw.json()) as member;

  // console.log(data);

  return data;
};

export const actions: Actions = {
  subscribe: async ({ request }) => {
    const form = await request.formData();
    const subscribed = form.get("subscribed");
    const id = form.get("id");
    // console.log(subscribed, id);
  },
};
