// No "server-only" guard here on purpose: this constant is read both from
// server-only code (src/lib/auth.ts) and from src/proxy.ts, which runs
// outside the React Server Components bundling context.
export const SESSION_COOKIE = "silvitour_admin_session";
