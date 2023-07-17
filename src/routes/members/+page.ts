import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
  const memberLoader = async () => {
    const data = await fetch(`https://apis.news.newton.ac.th/api/member`);

    return (await data.json()) as {
      id: number;
      name: string;
      nickname: string;
      profile: string;
      year: string;
      status: string;
      track: string;
      permission: number;
      role: string;
    }[];
  };

  return { members: memberLoader() };
};
