import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  return {
    title: params.id,
    members: ["John", "Jane", "Jim"],
  };
};
