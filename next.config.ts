import type { NextConfig } from "next";

/**
 * Paintings are served from WordPress, so its host has to be allowed as an
 * image source. Set WORDPRESS_URL and this follows it; without one it falls
 * back to the site's own domain, where WordPress currently lives.
 */
const wp = new URL(process.env.WORDPRESS_URL ?? "https://abidkhanart.com");

const nextConfig: NextConfig = {
  images: {
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
