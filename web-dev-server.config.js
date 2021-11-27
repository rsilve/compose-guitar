import {legacyPlugin} from '@web/dev-server-legacy';
import rollupReplace from '@rollup/plugin-replace';
import { fromRollup } from '@web/dev-server-rollup';
import dotenv from 'dotenv';

dotenv.config()
const replace = fromRollup(rollupReplace);

export default {
    rootDir: 'build',
    nodeResolve: true,
    preserveSymlinks: true,
    plugins: [
        replace({ preventAssignment: true, include: ['**/*.js'],
            __api_key__: process.env.API_KEY,
            __api_client_id__: process.env.API_CLIENT_ID,
        }),
        legacyPlugin({
            polyfills: {
                // Manually imported in index.html file
                webcomponents: false,
            },
        }),
    ],
};
