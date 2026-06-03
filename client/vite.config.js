import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    port: 5180,
    strictPort: false,
  },
  preview: {
    port: 5180,
    strictPort: false,
  },
});
