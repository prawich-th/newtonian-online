// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      user?: {
        id: number;
        name: string;
        nickname: string;
        role: string;
        profile: string;
        year: number;
        track: string;
        signature: string;
        bio: string;
        permission: number;
        password: string;
        status: string;
        memberSince: DateTime;
      };
    }
    // interface PageData {}
    // interface Platform {}
  }
}

export {};
