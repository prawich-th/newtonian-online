import { json, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  return {
    member: {
      id: 1,
      firstname: "Prawich",
      lastname: "Thawansakdivudhi",
      nickname: "T",
      position: "Head of Tech",
      year: 13,
      track: "Medicine",
      bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, temporibus sint autem modi fugit animi dolorem reprehenderit blanditiis dicta alias natus voluptatem nemo consectetur porro rem molestias adipisci expedita facere.",
      subscribed: true,
    },
    articles: [
      {
        title: "To Live is to Suffer is that so?",
        date: new Date(),
        author: "Sakulya Kovitkoolkri",
        cover: "/cover.webp",
        content:
          " Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, temporibus sint autem modi fugit animi dolorem reprehenderit blanditiis dicta alias natus voluptatem nemo consectetur porro rem molestias adipisci expedita facere.",
      },
      {
        title: "To Live is to Suffer is that so?",
        date: new Date(),
        author: "Sakulya Kovitkoolkri",
        cover: "/cover.webp",
        content:
          " Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, temporibus sint autem modi fugit animi dolorem reprehenderit blanditiis dicta alias natus voluptatem nemo consectetur porro rem molestias adipisci expedita facere.",
      },
      {
        title: "To Live is to Suffer is that so?",
        date: new Date(),
        author: "Sakulya Kovitkoolkri",
        cover: "/cover.webp",
        content:
          " Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, temporibus sint autem modi fugit animi dolorem reprehenderit blanditiis dicta alias natus voluptatem nemo consectetur porro rem molestias adipisci expedita facere.",
      },
      {
        title: "To Live is to Suffer is that so?",
        date: new Date(),
        author: "Sakulya Kovitkoolkri",
        cover: "/cover.webp",
        content:
          " Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, temporibus sint autem modi fugit animi dolorem reprehenderit blanditiis dicta alias natus voluptatem nemo consectetur porro rem molestias adipisci expedita facere.",
      },
    ],
  };
};

export const actions: Actions = {
  subscribe: async ({ request }) => {
    const form = await request.formData();
    const subscribed = form.get("subscribed");
    const id = form.get("id");
    console.log(subscribed, id);
  },
};
