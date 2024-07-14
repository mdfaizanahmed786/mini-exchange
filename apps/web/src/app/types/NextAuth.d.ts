import "next-auth";

declare module "next-auth" {
  interface User {
    name: string;
    id: string;
  }
  interface Session {
    user: User & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  export interface JWT {
    id: string;
  }
}
