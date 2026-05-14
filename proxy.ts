import { NextResponse, type NextRequest } from "next/server";

/**
 * Per-request proxy that emits a nonce-based Content Security Policy plus
 * security headers. Runs on the Edge in Next 16 (replaces middleware.ts).
 *
 * The CSP is strict by default: nothing loads cross-origin except what we
 * explicitly allow. Inline scripts use a per-request nonce; styles allow
 * 'unsafe-inline' for Tailwind v4 + Next styled-jsx.
 */
export function proxy(request: NextRequest) {
  const nonce = crypto.randomUUID().replace(/-/g, "");
  const isDev = process.env.NODE_ENV !== "production";

  const directives: Record<string, string[]> = {
    "default-src": ["'self'"],
    "base-uri": ["'self'"],
    "frame-ancestors": ["'none'"],
    "form-action": ["'self'", "mailto:"],
    "object-src": ["'none'"],
    "script-src": [
      "'self'",
      `'nonce-${nonce}'`,
      "'strict-dynamic'",
      // Modern browsers ignore unsafe-inline when strict-dynamic is present.
      // This lets non-executable JSON-LD scripts pass and provides a graceful
      // fallback for older browsers without breaking executable-script policy.
      "'unsafe-inline'",
      ...(isDev ? ["'unsafe-eval'"] : []),
    ],
    "style-src": ["'self'", "'unsafe-inline'"],
    "img-src": ["'self'", "data:", "blob:"],
    "font-src": ["'self'", "data:"],
    "media-src": ["'self'"],
    "connect-src": [
      "'self'",
      ...(isDev ? ["ws:", "wss:"] : []),
    ],
    "manifest-src": ["'self'"],
  };

  const csp = Object.entries(directives)
    .map(([k, v]) => `${k} ${v.join(" ")}`)
    .join("; ");

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("content-security-policy", csp);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  // CSP only in production: dev HMR + Turbopack rely on inline scripts that
  // do not get the nonce, and a strict CSP would break the workflow.
  if (!isDev) {
    response.headers.set("Content-Security-Policy", csp);
  }
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  );
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload",
  );

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     *  - api routes
     *  - _next/static
     *  - _next/image
     *  - favicon, icon, apple-icon, manifest, og images
     *  - sitemap.xml, robots.txt
     */
    {
      source:
        "/((?!api|_next/static|_next/image|favicon.ico|icon.png|apple-icon.png|manifest.webmanifest|opengraph-image|sitemap.xml|robots.txt).*)",
    },
  ],
};
