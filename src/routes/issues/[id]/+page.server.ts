import type { issue } from "$lib/types/articles";
import type { PageServerLoad } from "./$types";

// return {
//   id,
//   issue: {
//     authors: [
//       {
//         name: "Sakulya Kovitkoolkri",
//         id: 2,
//         nickname: "Jean",
//         profile: "/jean.png",
//         year: 13,
//         track: "Med A",
//       },
//       {
//         name: "Sakulya Kovitkoolkri",
//         id: 2,
//         nickname: "Jean",
//         profile: "/jean.png",
//         year: 13,
//         track: "Med A",
//       },
//       {
//         name: "Sakulya Kovitkoolkri",
//         id: 2,
//         nickname: "Jean",
//         profile: "/jean.png",
//         year: 13,
//         track: "Med A",
//       },
//     ],
//     editors: [
//       {
//         name: "Sakulya Kovitkoolkri",
//         id: 2,
//         nickname: "Jean",
//         profile: "/jean.png",
//         year: 13,
//         track: "Med A",
//       },
//       {
//         name: "Sakulya Kovitkoolkri",
//         id: 2,
//         nickname: "Jean",
//         profile: "/jean.png",
//         year: 13,
//         track: "Med A",
//       },
//       {
//         name: "Sakulya Kovitkoolkri",
//         id: 2,
//         nickname: "Jean",
//         profile: "/jean.png",
//         year: 13,
//         track: "Med A",
//       },
//     ],
//     graphics: [
//       {
//         name: "Sakulya Kovitkoolkri",
//         id: 2,
//         nickname: "Jean",
//         profile: "/jean.png",
//         year: 13,
//         track: "Med A",
//       },
//       {
//         name: "Sakulya Kovitkoolkri",
//         id: 2,
//         nickname: "Jean",
//         profile: "/jean.png",
//         year: 13,
//         track: "Med A",
//       },
//       {
//         name: "Sakulya Kovitkoolkri",
//         id: 2,
//         nickname: "Jean",
//         profile: "/jean.png",
//         year: 13,
//         track: "Med A",
//       },
//       {
//         name: "Sakulya Kovitkoolkri",
//         id: 2,
//         nickname: "Jean",
//         profile: "/jean.png",
//         year: 13,
//         track: "Med A",
//       },
//     ],
//   },
// };

export const load: PageServerLoad = async ({ params }) => {
  const id = +params.id;

  const raw = await fetch(
    "https://apis.news.newton.ac.th/api/reader/issue/" + id
  );
  const data = (await raw.json()) as issue;

  console.log(data);

  return data;
};
