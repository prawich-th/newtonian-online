import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
  const fetcher = async () => {
    return (await (await fetch("https://apis.news.newton.ac.th/api/reader/issue")).json()) as {
      id: number;
      cover: string;
      publishingDate: string;
      published: boolean;
      lettersId: number;
      mainArticlesId: number;
      pdfLink: string;
    }[];
  };

  return { issues: fetcher() };
};
