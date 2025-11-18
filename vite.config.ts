import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  server: {
    host: "localhost",
    port: 3456,
    strictPort: false, // Si 3456 est occupé, prend automatiquement le suivant
    open: true, // Ouvre le navigateur automatiquement
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@components": path.resolve(__dirname, "components"),
    },
  },
}));
