import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { uuid } from "uuidv4";

export const actions: Actions = {
  async save({ request, cookies }) {
    const data = await request.formData();
    const userAuth = cookies.get("token");

    const content = data.get("content");
    const headline = data.get("headline");
    const author = data.get("author");
    const category = data.get("category");
    const issueNo = data.get("issue");
    const cover = `https://apis.news.newton.ac.th/images/articles/${uuid()}/cover.webp`;

    console.log({
      content,
      headline,
      writerId: author,
      category,
      docId: "",
      cover: "",
      issueNo,
    });

    const upload = await fetch(
      `https://apis.news.newton.ac.th/api/eics/new-article`,
      {
        method: "POST",
        headers: {
          authorization: "Bearer " + userAuth,
          "Content-Type": "application/json",
        },
        cache: "no-cache",
        body: JSON.stringify({
          content,
          headline,
          writerId: author,
          category,
          docId: "",
          issueNo,
          cover,
        }),
      }
    );

    const response = await upload.json();

    console.log(response);
  },
  async login({ request, cookies }) {
    const data = await request.formData();

    const token = data.get("token")?.toString();

    if (!token) return;

    cookies.set("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
  },
};

export const load: PageServerLoad = async ({ cookies }) => {
  const userAuth = cookies.get("token");

  const raw = await fetch("https://apis.news.newton.ac.th/api/auth/getUser", {
    headers: {
      Authorization: `Bearer ${userAuth}`,
    },
  });

  const rawmembers = await fetch(
    "https://apis.news.newton.ac.th/api/eics/get-members",
    {
      headers: {
        authorization: "Bearer " + userAuth,
      },
    }
  );

  const user = await raw.json();
  const members = await rawmembers.json();

  if (!user) throw redirect(301, "/management/login");
  console.log(members.members[0]);
  return { user, members, token: userAuth };
};
