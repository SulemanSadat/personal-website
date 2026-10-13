import { spawnSync } from "node:child_process";

const result = spawnSync(process.execPath, ["node_modules/next/dist/bin/next", "build"], {
  stdio: "inherit",
  env: {
    ...process.env,
    DEPLOY_TARGET: "github-pages",
    NEXT_PUBLIC_BASE_PATH: "/personal-website",
    NEXT_PUBLIC_SITE_URL: "https://sulemansadat.github.io/personal-website",
  },
});

process.exit(result.status ?? 1);
