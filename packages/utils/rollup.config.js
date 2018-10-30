import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'

import pkg from './package.json'

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'es',
    },
  ],
  external: ['draft-js', 'immutable'],
  plugins: [
    external(),
    babel({
      babelrc: false,
      configFile: '../../babel.config.js',
      exclude: 'node_modules/**',
    }),
    commonjs(),
  ],
}
