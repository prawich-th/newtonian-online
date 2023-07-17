import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  console.log(params);
  const data = (
    await fetch(`https://apis.news.newton.ac.th/api/reader/article/${params.id}`)
  ).json();
  return data;
};
