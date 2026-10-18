import { spawnSync } from "node:child_process";
import { cpSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const env = { ...process.env };
delete env.DEPLOY_TARGET;
delete env.NEXT_PUBLIC_BASE_PATH;
delete env.NEXT_PUBLIC_SITE_URL;

const result = spawnSync(process.execPath, ["node_modules/next/dist/bin/next", "build"], { stdio: "inherit", env });
if (result.status !== 0) process.exit(result.status ?? 1);

// Standalone output omits static assets by design. Bundle them beside the
// generated server so Hostinger can serve the complete site from one folder.
const standaloneDir = join(process.cwd(), ".next", "standalone");
mkdirSync(join(standaloneDir, ".next"), { recursive: true });
cpSync(join(process.cwd(), ".next", "static"), join(standaloneDir, ".next", "static"), { recursive: true });
cpSync(join(process.cwd(), "public"), join(standaloneDir, "public"), { recursive: true });
console.log("Hostinger standalone bundle ready at .next/standalone");
