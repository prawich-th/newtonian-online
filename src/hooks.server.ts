import { error, redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  console.log(event.url.pathname);
  if (event.url.pathname.startsWith("/eics")) {
    const user = await fetch("https://apis.news.newton.ac.th/api/auth/getUser", {
      headers: {
        Authorization: `Bearer ${event.cookies.get("token")}`,
      },
    });

    if (user.status !== 200) throw redirect(303, "/auth");

    event.locals.user = await user.json();
  }

  return resolve(event);
};
