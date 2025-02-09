import type { member } from "$lib/types/member";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
  const data = await fetch("https://apis.news.newton.ac.th/api/member");

  const members: member[] = await data.json();
  // console.log(members);

  const important = members.filter((member) => member.permission >= 6);

  return {
    important,
    members: members
      .filter((a) => a.permission !== 6)
      .sort((a, b) => {
        if (a.permission > b.permission) return -1;
        return 0;
      }),
  };
};
