import { redirect } from "next/dist/server/api-utils";

export default async function EicsLayout() {
  const data = await fetch("https://apis.news.newton.ac.th/api/auth/getUser");

  if (data.status !== 200) {
    redirect;
  }

  const user = await data.json();
}
