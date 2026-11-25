// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// Never set ssr.external or resolve.external: the Worker has no runtime module resolution, so
// the build fails. Never add compression (compressPublicAssets, vite-plugin-compression):
// hosting already compresses at the edge.
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// GitHub Pages serves the site from https://<user>.github.io/<repo-name>/, so the
// deploy workflow sets VITE_BASE_PATH=/<repo-name>/. Locally and on Lovable it stays "/".
// When a base path is set we also prerender every page to static HTML, because
// GitHub Pages can only host static files (no server).
const pagesBasePath = process.env["VITE_BASE_PATH"];

export default defineConfig({
  vite: {
    base: pagesBasePath ?? "/",
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    ...(pagesBasePath
      ? { prerender: { enabled: true, crawlLinks: true, failOnError: false } }
      : {}),
  },
});
