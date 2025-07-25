import { RouteMiddleware } from "rwsdk/router";
import { IS_DEV } from "rwsdk/constants";


export const setCommonHeaders =
  (): RouteMiddleware =>
  ({ headers, rw: { nonce } }) => {
    if (!IS_DEV) {
      // Forces browsers to always use HTTPS for a specified time period (2 years)
      headers.set(
        "Strict-Transport-Security",
        "max-age=63072000; includeSubDomains; preload"
      );
    }

    // Forces browser to use the declared content-type instead of trying to guess/sniff it
    headers.set("X-Content-Type-Options", "nosniff");

    // Stops browsers from sending the referring webpage URL in HTTP headers
    headers.set("Referrer-Policy", "no-referrer");

    // Explicitly disables access to specific browser features/APIs
    headers.set(
      "Permissions-Policy",
      "geolocation=(), microphone=(), camera=()"
    );

    // Defines trusted sources for content loading and script execution:
    headers.set(
      "Content-Security-Policy",
      `default-src 'self'; script-src 'self' 'nonce-${nonce}' https://challenges.cloudflare.com https://cdn.usefathom.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://cdn.usefathom.com https://github.com https://avatars.githubusercontent.com https://queue.simpleanalyticscdn.com; connect-src 'self' https://api.cloudflare.com; frame-src https://challenges.cloudflare.com https://www.youtube.com https://youtube.com; object-src 'none';`
    );
  };