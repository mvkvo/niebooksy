import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      console.log("🔍 Token:", token);
      return !!token;
    },
  },
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
