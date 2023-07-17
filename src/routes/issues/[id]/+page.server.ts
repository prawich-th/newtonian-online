import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const fetcher = async () => {
    const data = await fetch(`https://apis.news.newton.ac.th/api/reader/issue/${params.id}`);
    const parsed = await data.json();

    // console.log(parsed);

    return parsed;
  };

  return { thisIssue: fetcher(), id: +params.id };
};

export const actions = {
  toPdf: async ({ request, params }) => {
    const pdfLink = (await request.formData()).get("pdfLink");
    console.log(pdfLink);
    if (!pdfLink) throw redirect(303, `/issues`);

    await fetch(`https://apis.news.newton.ac.th/api/reader/viewPdf/${params.id}`, {
      method: "PATCH",
    });

    throw redirect(303, pdfLink.toString());
  },
} satisfies Actions;
