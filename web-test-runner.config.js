import { playwrightLauncher } from '@web/test-runner-playwright';

export default {
    rootDir: '.',
    files: ['./build/**/*.(spec|test).js'],
    nodeResolve: true,
    preserveSymlinks: true,
    coverage: true,
    browsers: [
        playwrightLauncher({ product: 'firefox' })
    ],
    testFramework: {
        // https://mochajs.org/api/mocha
        config: {
            ui: 'tdd',
        },
    }
};