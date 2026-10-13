import { spawnSync } from "node:child_process";

const env = { ...process.env };
delete env.DEPLOY_TARGET;
delete env.NEXT_PUBLIC_BASE_PATH;
delete env.NEXT_PUBLIC_SITE_URL;

const result = spawnSync(process.execPath, ["node_modules/next/dist/bin/next", "build"], { stdio: "inherit", env });
process.exit(result.status ?? 1);
