import { cpSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const standalone = join(root, ".next", "standalone");

if (!existsSync(standalone)) {
  console.log("Standalone output not found — skipping asset copy.");
  process.exit(0);
}

const staticSrc = join(root, ".next", "static");
const staticDest = join(standalone, ".next", "static");
const publicSrc = join(root, "public");
const publicDest = join(standalone, "public");
const dbSrc = join(root, "db");
const dbDest = join(standalone, "db");

mkdirSync(join(standalone, ".next"), { recursive: true });
cpSync(staticSrc, staticDest, { recursive: true });
cpSync(publicSrc, publicDest, { recursive: true });
if (existsSync(dbSrc)) cpSync(dbSrc, dbDest, { recursive: true });

console.log("Copied static assets into .next/standalone");
