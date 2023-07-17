import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies }) => {
  const data = (await fetch(`https://apis.news.newton.ac.th/api/reader/homepage?amount=16`)).json();

  return data;
};
