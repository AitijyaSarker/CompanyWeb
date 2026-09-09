import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "../../src") },
      { find: "next/link", replacement: path.resolve(__dirname, "src/compat/link.jsx") },
      { find: "next/image", replacement: path.resolve(__dirname, "src/compat/image.jsx") },
      { find: "next/navigation", replacement: path.resolve(__dirname, "src/compat/navigation.jsx") },
    ],
  },
  server: {
    port: 5173,
    fs: { allow: [path.resolve(__dirname, "../..") ] },
    proxy: { "/api": "http://localhost:4000" },
  },
});
