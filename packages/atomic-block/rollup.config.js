import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import resolve from 'rollup-plugin-node-resolve'
import url from 'rollup-plugin-url'

import pkg from './package.json'

export default {
  external: [
    '@djsp/core',
    '@djsp/utils',
    'draft-js',
    'draft-js/lib/DraftOffsetKey',
    'react',
  ],
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
  plugins: [
    external(),
    postcss({
      modules: true,
      extract: true,
    }),
    url(),
    babel({
      babelrc: false,
      configFile: '../../babel.config.js',
      exclude: 'node_modules/**',
    }),
    resolve(),
    commonjs(),
  ],
}
