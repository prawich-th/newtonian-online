import type { article } from "$lib/types/articles.js";

interface homepagedata {
  main: {};
  articles: [{}];
}

export const load = async ({ params }) => {
  const data = await fetch(
    "https://apis.news.newton.ac.th/api/reader/homepage?amount=16"
  );

  const articles: { main: article; articles: [article] } = await data.json();

  return { articles };
};
