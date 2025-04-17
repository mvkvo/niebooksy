import { withAuth } from "next-auth/middleware";

export default withAuth({
  // wskazujesz swoją stronę logowania
  pages: { signIn: "/login" },
  // opcjonalnie doprecyzowujesz, kiedy token jest OK
  callbacks: {
    authorized({ token }) {
      return Boolean(token);
    },
  },
});

export const config = {
  // tylko dashboard i wszystko pod nim
  matcher: ["/dashboard/:path*"],
};
