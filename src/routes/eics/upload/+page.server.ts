import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  return {
    user: locals.user,
  };
};

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();

    const response = await fetch("https://apis.news.newton.ac.th/api/eics/upload-img", {
      method: "POST",
      body: data,
      headers: {
        Authorization: `Bearer ${cookies.get("token")}`,
      },
    });

    console.log(await response.json());
  },
};
