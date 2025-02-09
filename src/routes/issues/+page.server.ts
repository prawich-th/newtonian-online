import type { issue } from "$lib/types/articles.js";

export const load = async ({ params }) => {
  const data = await fetch(`https://apis.news.newton.ac.th/api/reader/issue`);

  const issues = await data.json();

  return { issues: issues.reverse() } as { issues: issue[] };
};
