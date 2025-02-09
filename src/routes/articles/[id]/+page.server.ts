import type { article } from "$lib/types/articles.js";

export const load = async ({ params }) => {
  const id = +params.id;

  const data = await fetch(
    `https://apis.news.newton.ac.th/api/reader/article/${id}`
  );

  const article = await data.json();

  return {
    article,
  } as { article: article };
};
