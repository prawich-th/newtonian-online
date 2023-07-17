import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  console.log(params);
  const data = await fetch(`https://apis.news.newton.ac.th/api/reader/article/${params.id}`);

  if (data.status === 500 || data.status === 404)
    throw error(404, { message: "Article not found" });

  return await data.json();
};
