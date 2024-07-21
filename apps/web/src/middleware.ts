import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const url = request.nextUrl;

  try {
    const token = await getToken({ req: request });

    if (token && (url.pathname === "/api/auth/signin" || url.pathname.split("").length === 1)) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (!token && (url.pathname === "/dashboard" || url.pathname === "/")) {
      return NextResponse.redirect(new URL("/api/auth/signin", request.url));
    }

  } catch (error) {
    console.log(error, "Error");
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/dashboard", "/", "/api/auth/signin"],
};
