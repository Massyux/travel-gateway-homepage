import { jwtVerify } from "jose";
import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import { SESSION_COOKIE } from "./lib/session-constants";

const handleIntlRouting = createMiddleware(routing);

async function isValidAdminSession(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!token || !secret) return false;
  try {
    await jwtVerify(token, new TextEncoder().encode(secret), {
      algorithms: ["HS256"],
    });
    return true;
  } catch {
    return false;
  }
}

// /admin is intentionally outside the [locale] segment (internal staff tool,
// not part of the public, translated marketing site) — see plan.md. This
// optimistic check only reads the session cookie (no DB call), per the
// Proxy guidance in node_modules/next/dist/docs: real verification happens
// again via requireAdminSession() in every protected Server Component/route.
export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") {
      return NextResponse.next();
    }
    if (!(await isValidAdminSession(req))) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
    return NextResponse.next();
  }

  return handleIntlRouting(req);
}

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
