import type { NextConfig } from "next";

const isGitHubPages = process.env.DEPLOY_TARGET === "github-pages";
const basePath = isGitHubPages ? "/personal-website" : "";

const nextConfig: NextConfig = {
  ...(isGitHubPages ? {
    output: "export",
    basePath,
    assetPrefix: `${basePath}/`,
    trailingSlash: true,
    images: { unoptimized: true },
  } : {}),
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
