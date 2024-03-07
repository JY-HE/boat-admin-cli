// rollup.config.mjs
import terser from '@rollup/plugin-terser';

export default {
    input: 'lib/index.js',
    output: {
        file: 'dist/index.mjs',
        format: 'es',
        plugins: [terser()],
    },
};
