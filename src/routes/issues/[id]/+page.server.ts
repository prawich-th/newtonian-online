import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const id = +params.id;
  return {
    id,
    issue: {
      authors: [
        {
          name: "Sakulya Kovitkoolkri",
          id: 2,
          nickname: "Jean",
          profile: "/jean.png",
          year: 13,
          track: "Med A",
        },
        {
          name: "Sakulya Kovitkoolkri",
          id: 2,
          nickname: "Jean",
          profile: "/jean.png",
          year: 13,
          track: "Med A",
        },
        {
          name: "Sakulya Kovitkoolkri",
          id: 2,
          nickname: "Jean",
          profile: "/jean.png",
          year: 13,
          track: "Med A",
        },
      ],
      editors: [
        {
          name: "Sakulya Kovitkoolkri",
          id: 2,
          nickname: "Jean",
          profile: "/jean.png",
          year: 13,
          track: "Med A",
        },
        {
          name: "Sakulya Kovitkoolkri",
          id: 2,
          nickname: "Jean",
          profile: "/jean.png",
          year: 13,
          track: "Med A",
        },
        {
          name: "Sakulya Kovitkoolkri",
          id: 2,
          nickname: "Jean",
          profile: "/jean.png",
          year: 13,
          track: "Med A",
        },
      ],
      graphics: [
        {
          name: "Sakulya Kovitkoolkri",
          id: 2,
          nickname: "Jean",
          profile: "/jean.png",
          year: 13,
          track: "Med A",
        },
        {
          name: "Sakulya Kovitkoolkri",
          id: 2,
          nickname: "Jean",
          profile: "/jean.png",
          year: 13,
          track: "Med A",
        },
        {
          name: "Sakulya Kovitkoolkri",
          id: 2,
          nickname: "Jean",
          profile: "/jean.png",
          year: 13,
          track: "Med A",
        },
        {
          name: "Sakulya Kovitkoolkri",
          id: 2,
          nickname: "Jean",
          profile: "/jean.png",
          year: 13,
          track: "Med A",
        },
      ],
    },
  };
};
