import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'iife',
    name: 'myBundle',
  },
  // external: [ 'three-js' ], // <-- suppresses the warning
  plugins: [
    resolve({
      jsnext: true,
      main: true
    }),
    commonjs({
      include: 'node_modules/**',
      extensions: [ '.js', '.coffee' ],
      ignore: [ 'conditional-runtime-dependency' ]
    }),
    resolve(),
    babel({
      exclude: 'node_modules/**',
    }),
  ],
};
