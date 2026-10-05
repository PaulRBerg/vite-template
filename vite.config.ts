import { fileURLToPath, URL } from "node:url";

import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const localServer = { host: "127.0.0.1", port: 5173, strictPort: true };

export default defineConfig({
  plugins: [react(), babel({ presets: [reactCompilerPreset()] }), tailwindcss()],
  build: {
    // Bundle size is not a concern for these apps, so never warn about it.
    chunkSizeWarningLimit: Infinity,
    emptyOutDir: true,
    outDir: "dist",
  },
  preview: localServer,
  server: localServer,
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("src", import.meta.url)),
    },
  },
});
