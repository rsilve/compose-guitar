// Import rollup plugins
import html from "@web/rollup-plugin-html";
import { copy } from "@web/rollup-plugin-copy";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import minifyHTML from "rollup-plugin-minify-html-literals";
import summary from "rollup-plugin-summary";
import replace from "@rollup/plugin-replace";
import dotenv from "dotenv";

dotenv.config({ path: ".env.production" });
console.log(process.env.API_KEY);
export default {
  plugins: [
    // Entry point for application build; can specify a glob to build multiple
    // HTML files for non-SPA app
    html({
      input: ["build/index.html"],
      extractAssets: true,
      minify: true,
    }),
    // Resolve bare module specifiers to relative paths
    resolve(),
    // replace
    replace({
      preventAssignment: true,
      include: ["**/*.js"],
      __api_key__: process.env.API_KEY,
      __api_client_id__: process.env.API_CLIENT_ID,
      __synchro_enabled__: process.env.SYNCHRO_ENABLED,
    }),
    // Minify HTML template literals
    minifyHTML(),
    // Minify JS
    terser({
      ecma: 2020,
      module: true,
      warnings: true,
    }),
    // Print bundle summary
    summary(),
    // Optional: copy any static assets to build directory
    copy({
      patterns: ["assets/**/*", "sw.js", "robots.txt"],
      rootDir: "build",
    }),
  ],
  output: {
    dir: "dist",
    chunkFileNames: "[name]-[hash].js",
    entryFileNames: "[name]-[hash].js",
  },
  preserveEntrySignatures: "strict",
};
