import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { uuid } from "uuidv4";

export const actions: Actions = {
  async token({ request, cookies }) {
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

  async login({ request, cookies }) {
    const data = await request.formData();

    const username = data.get("username")?.toString();
    const password = data.get("password")?.toString();

    if (!username || !password) return;

    const raw = await fetch("https://apis.news.newton.ac.th/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const response = await raw.json();

    if (response.error) {
      return redirect(301, "/management/login");
    }

    cookies.set("token", response.token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return redirect(301, "/management/write");
  },
};

// export const load: PageServerLoad = async ({ cookies }) => {
//   const userAuth = cookies.get("token");

//   const raw = await fetch("https://apis.news.newton.ac.th/api/auth/getUser", {
//     headers: {
//       Authorization: `Bearer ${userAuth}`,
//     },
//   });

//   const rawmembers = await fetch(
//     "https://apis.news.newton.ac.th/api/eics/get-members",
//     {
//       headers: {
//         authorization: "Bearer " + userAuth,
//       },
//     }
//   );

//   const user = await raw.json();
//   const members = await rawmembers.json();

//   if (!user) throw redirect(301, "/management/login");
//   console.log(members.members[0]);
//   return { user, members, token: userAuth };
// };
