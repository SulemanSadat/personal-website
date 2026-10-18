import type { NextConfig } from "next";

const isGitHubPages = process.env.DEPLOY_TARGET === "github-pages";
const basePath = isGitHubPages ? "/personal-website" : "";

const nextConfig: NextConfig = {
  // Keep the Node.js production build deployable as a compact Hostinger bundle.
  // The GitHub Pages build continues to use output: "export" in its own branch.
  ...(isGitHubPages ? {} : { output: "standalone" as const }),
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
