import { NextResponse, type NextRequest } from "next/server";

/**
 * Per-request proxy that emits a Content Security Policy plus security
 * headers. Runs on the Edge in Next 16 (replaces middleware.ts).
 *
 * Why no nonce + strict-dynamic: Next.js prerendered HTML is baked at
 * build time and ships without a per-request nonce. A nonce + strict-
 * dynamic policy invalidates the chunk + inline bootstrap scripts that
 * actually power the page. The pragmatic policy here keeps host-based
 * allowlisting strict, blocks cross-origin script execution, and uses
 * 'unsafe-inline' for the bootstrap scripts and styled-jsx style tags
 * that the framework requires.
 */
export function proxy(request: NextRequest) {
  const isDev = process.env.NODE_ENV !== "production";

  const directives: Record<string, string[]> = {
    "default-src": ["'self'"],
    "base-uri": ["'self'"],
    "frame-ancestors": ["'none'"],
    "form-action": ["'self'", "mailto:"],
    "object-src": ["'none'"],
    "script-src": [
      "'self'",
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

  const response = NextResponse.next();

  // CSP only in production: dev HMR + Turbopack rely on inline scripts
  // that violate the host-restricted policy.
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
