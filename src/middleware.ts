import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      return !!token?.name && !!token?.email;
    },
  },
});

export const config = {
  matcher: ["/contributes/new/"],
};
