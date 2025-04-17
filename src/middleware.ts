import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: { signIn: "/login" },
  callbacks: {
    authorized({ token, req }) {
      // jeżeli to fetch danych RSC – zostawiamy dostęp
      const isRsc =
        req.headers.get("x-nextjs-data") === "1" ||
        req.nextUrl.searchParams.has("_rsc");
      if (isRsc) return true;

      // w pozostałych przypadkach wymaga tokenu
      return Boolean(token);
    },
  },
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
