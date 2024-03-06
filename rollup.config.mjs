// rollup.config.mjs
import terser from '@rollup/plugin-terser';

export default {
    input: 'lib/index.js',
    output: {
        file: 'dist/cli.min.js',
        format: 'es',
        plugins: [terser()],
    },
};
