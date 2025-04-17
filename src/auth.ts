import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { sql } from "@vercel/postgres";
import { compare } from "bcrypt";

const handler = NextAuth({
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const response = await sql`
          SELECT * FROM users WHERE email = ${credentials.email}
        `;
        const user = response.rows[0];
        if (!user) return null;

        const passwordCorrect = await compare(
          credentials?.password || "",
          user.password
        );

        if (!passwordCorrect) return null;

        console.log("credentials", credentials);
        return {
          id: user.id,
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
