import { playwrightLauncher } from '@web/test-runner-playwright';

export default {
    rootDir: '.',
    files: ['./build/**/*.(spec|test).js'],
    nodeResolve: true,
    preserveSymlinks: true,
    coverage: true,
    coverageConfig: {
        include: ['./build/**/*.js'],
        exclude: ['**/api.js', '**/__tests__/**']
    },
    browsers: [
        playwrightLauncher({ product: 'chromium' })
    ],
    testFramework: {
        // https://mochajs.org/api/mocha
        config: {
            ui: 'tdd',
        },
    }
};