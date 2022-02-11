import { playwrightLauncher } from "@web/test-runner-playwright";

export default {
  rootDir: ".",
  files: ["./out/**/*.(spec|test).js"],
  nodeResolve: true,
  preserveSymlinks: true,
  coverage: true,
  coverageConfig: {
    include: ["./out/**/*.js"],
    exclude: ["**/api.js", "**/__tests__/**", "**/generated/**"],
  },
  browsers: [playwrightLauncher({ product: "chromium" })],
  testFramework: {
    // https://mochajs.org/api/mocha
    config: {
      ui: "tdd",
    },
  },
};
