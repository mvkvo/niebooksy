import CredentialsProvider from "next-auth/providers/credentials";
import type { AuthOptions } from "next-auth";

export const authConfig: AuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [],
};
