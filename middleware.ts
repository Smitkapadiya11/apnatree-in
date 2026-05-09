import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const pathname = req.nextUrl.pathname;
    const token = req.nextauth.token;

    if (pathname.startsWith("/admin")) {
      const role = token?.role;
      const fieldAgentMediaOnly =
        role === "FIELD_AGENT" &&
        (pathname === "/admin/media-upload" || pathname.startsWith("/admin/media-upload/"));

      if (role !== "ADMIN" && !fieldAgentMediaOnly) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/admin", "/admin/:path*"],
};
