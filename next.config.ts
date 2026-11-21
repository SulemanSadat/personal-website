import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hostinger serves the contents of `out` directly from public_html.
  // Do not set basePath or assetPrefix: the site lives at the domain root.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  allowedDevOrigins: ["127.0.0.1"],
  /* config options here */
  devIndicators: false, 
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: false,
  partialPrefetching: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
