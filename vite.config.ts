import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { readFileSync } from "node:fs";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    {
      name: "initial-home-html",
      transformIndexHtml(html: string) {
        const pagePath = path.resolve(__dirname, "src/paginas/versao-08-07");
        const css = readFileSync(path.join(pagePath, "topo.css"), "utf8") +
          readFileSync(path.join(pagePath, "initial-home.css"), "utf8");
        return html
          .replace("<!-- initial-home-styles -->", `<style>${css}</style>`)
          .replace("<!-- initial-home-content -->", readFileSync(path.join(pagePath, "initial-home.html"), "utf8"));
      },
    },
    react(), mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-accordion', '@radix-ui/react-select'],
          'form-vendor': ['react-hook-form', '@hookform/resolvers', 'zod'],
          'query-vendor': ['@tanstack/react-query'],
          'icons': ['lucide-react'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    minify: 'esbuild',
    cssMinify: 'esbuild',
    target: 'es2015',
    assetsInlineLimit: 4096,
  },
}));
