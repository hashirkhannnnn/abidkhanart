import type { NextConfig } from "next";

/**
 * Two build modes.
 *
 * By default the site runs as a Node service: it reads WordPress on a timer,
 * so a painting added in the CMS appears within minutes, and it resizes the
 * photographs itself. This needs a host that runs Node — on Hostinger, a
 * Business or Cloud Startup plan.
 *
 * With STATIC_EXPORT=1 it builds to plain files in out/ that any host can
 * serve from public_html. WordPress is then read once, at build time: the
 * catalogue is whatever it was when the site was built, and adding a
 * painting means building and uploading again. Image resizing is also off,
 * so photographs are served at their uploaded size.
 */
const isStatic = process.env.STATIC_EXPORT === "1";

const wp = new URL(process.env.WORDPRESS_URL ?? "https://abidkhanart.com");

const nextConfig: NextConfig = {
  ...(isStatic ? { output: "export" as const, trailingSlash: true } : {}),
  images: isStatic
    ? { unoptimized: true }
    : {
        remotePatterns: [
          {
            protocol: wp.protocol.replace(":", "") as "http" | "https",
            hostname: wp.hostname,
            pathname: "/wp-content/uploads/**",
          },
        ],
      },
};

export default nextConfig;
