import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import fs from "node:fs";

const clientPackage = JSON.parse(fs.readFileSync(path.resolve(__dirname, "package.json"), "utf8"));
const clientDependencies = Object.keys({ ...clientPackage.dependencies, ...clientPackage.devDependencies })
  .filter((name) => !["react", "react-dom", "tailwindcss", "vite", "@vitejs/plugin-react", "typescript", "@tailwindcss/postcss", "tw-animate-css"].includes(name))
  .map((name) => ({ find: name, replacement: path.resolve(__dirname, "node_modules", name) }));

export default defineConfig({
  root: __dirname,
  publicDir: path.resolve(__dirname, "../asset"),
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "src") },
      { find: "react", replacement: path.resolve(__dirname, "node_modules/react") },
      { find: "react-dom", replacement: path.resolve(__dirname, "node_modules/react-dom") },
      { find: "tailwindcss", replacement: path.resolve(__dirname, "node_modules/tailwindcss/index.css") },
      { find: "tw-animate-css", replacement: path.resolve(__dirname, "node_modules/tw-animate-css/dist/tw-animate.css") },
      ...clientDependencies,
      { find: "next/link", replacement: path.resolve(__dirname, "src/compat/link.jsx") },
      { find: "next/image", replacement: path.resolve(__dirname, "src/compat/image.jsx") },
      { find: "next/navigation", replacement: path.resolve(__dirname, "src/compat/navigation.jsx") },
    ],
  },
  server: {
    port: 5173,
    fs: { allow: [path.resolve(__dirname, "..") ] },
    proxy: {
      "/api": "http://localhost:4000",
      "/uploads": "http://localhost:4000",
    },
  },
});
