import type { article } from "$lib/types/articles.js";

export const load = async ({ url }) => {
  let category = url.searchParams.get("filter") || "";
  const path = `https://apis.news.newton.ac.th/api/reader/article${
    category ? "?filter=" + category : ""
  }`;
  console.log(path);

  const data = await fetch(path);

  const articles = await data.json();

  if (!category) category = "Articles";

  return { articles: articles.reverse(), category } as {
    articles: article[];
    category: string;
  };
};
