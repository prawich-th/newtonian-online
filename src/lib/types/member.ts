import type { article } from "./articles";

export interface member {
  // Basic member info
  id: number;
  name: string;
  nickname: string;
  year: number;
  track: string;
  status: string;

  // Media
  profile: string;
  signature: string;

  // Role info
  permission: number;
  role: string;
  bio: string;

  articles: article[];
}
