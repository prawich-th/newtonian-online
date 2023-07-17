import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
  const data = (await fetch(`https://apis.news.newton.ac.th/api/reader/article`)).json();
  return { data: data };
};
