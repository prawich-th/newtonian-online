import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies }) => {
  cookies.set(
    "token",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjgwMjAzNDUyfQ.DakSMO2pBLjRq86EZBMMdGEclcUsfk1E6wi_1GFT-n8"
  );
};
