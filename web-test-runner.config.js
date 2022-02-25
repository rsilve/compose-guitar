import { playwrightLauncher } from "@web/test-runner-playwright";
import { esbuildPlugin } from '@web/dev-server-esbuild';

export default {
  rootDir: ".",
  files: ["./src/**/*.(spec|test).ts"],
  nodeResolve: true,
  preserveSymlinks: true,
  coverage: true,
  coverageConfig: {
    include: ["./src/**/*.ts"],
    exclude: ["**/api.ts", "**/__tests__/**", "**/generated/**"],
  },
  plugins: [esbuildPlugin({ ts: true })],
  browsers: [playwrightLauncher({ product: "chromium" })],
};
