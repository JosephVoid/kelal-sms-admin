import { getSession } from "@/modules/auth/lib/helpers/session";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { pagesForRoles } from "@/modules/auth/constants";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = await getSession();

  if (!token?.userId) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const role = token.role;
  const allowedPages = pagesForRoles[role] as string[];

  const isAllowed = allowedPages.some((allowedPath) =>
    allowedPages.includes(pathname)
  );

  if (!isAllowed) {
    return NextResponse.redirect(new URL("/404", req.url));
  }

  return NextResponse.next();
}

// Apply middleware only to relevant paths
export const config = {
  matcher: ["/dashboard/:path*"], // All protected paths under /dashboard
};
