export default {
    rootDir: '.',
    files: ['./build/**/*.(spec|test).js'],
    nodeResolve: true,
    preserveSymlinks: true,
    coverage: true,
    testFramework: {
        // https://mochajs.org/api/mocha
        config: {
            ui: 'tdd',
        },
    }
};