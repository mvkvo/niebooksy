import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: { signIn: "/login" },
  callbacks: {
    authorized({ token, req }) {
      // pozwól na wewnętrzne fetchy RSC
      if (req.nextUrl.searchParams.has("_rsc")) return true;
      return Boolean(token);
    },
  },
});

export const config = { matcher: ["/dashboard/:path*"] };
