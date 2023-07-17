import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const fetcher = async () => {
    const data = await fetch(`https://apis.news.newton.ac.th/api/member/${params.id}`);
    return await data.json();
  };

  return fetcher();
};
