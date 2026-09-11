import path from "node:path";
import { fileURLToPath } from "node:url";
import { access, readFile, readdir } from "node:fs/promises";

const sourceDirectory = path.dirname(fileURLToPath(import.meta.url));
const defaultClientDirectory = path.resolve(sourceDirectory, "../dist");

export const clientDirectory = process.env.CLIENT_DIR && path.isAbsolute(process.env.CLIENT_DIR)
  ? path.resolve(process.env.CLIENT_DIR)
  : defaultClientDirectory;
export const assetDirectory = path.join(clientDirectory, "assets");

export async function validateClientBuild() {
  const indexPath = path.join(clientDirectory, "index.html");
  await access(indexPath);
  await access(assetDirectory);

  const [indexHtml, assetFiles] = await Promise.all([
    readFile(indexPath, "utf8"),
    readdir(assetDirectory),
  ]);
  if (!assetFiles.length) throw new Error(`No frontend assets found in ${assetDirectory}`);

  const linkedAssets = [...indexHtml.matchAll(/["']\/assets\/([^"']+)["']/g)].map((match) => match[1]);
  await Promise.all(linkedAssets.map((assetFile) => access(path.join(assetDirectory, assetFile))));
}
