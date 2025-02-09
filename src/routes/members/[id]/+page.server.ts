import { type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { member } from "$lib/types/member";

export const load: PageServerLoad = async ({ params }) => {
  const id = +params.id;

  const raw = await fetch("https://apis.news.newton.ac.th/api/member/" + id);
  const data = (await raw.json()) as member;

  // console.log(data);

  return data;
};

export const actions: Actions = {
  subscribe: async ({ request }) => {
    const form = await request.formData();
    const subscribed = form.get("subscribed");
    const id = form.get("id");
  },
};
