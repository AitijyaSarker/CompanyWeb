import { assetDirectory, clientDirectory, validateClientBuild } from "./client-build.js";

await validateClientBuild();
console.log(`Verified frontend build: ${clientDirectory}; assets: ${assetDirectory}`);
