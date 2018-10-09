import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import resolve from 'rollup-plugin-node-resolve'
import url from 'rollup-plugin-url'
import { plugin as analyze } from 'rollup-plugin-analyzer'

import pkg from './package.json'

export default {
  external: ['react', 'djs-editor'],
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
    }),
    url(),
    babel({
      exclude: 'node_modules/**',
    }),
    resolve({
      modulesOnly: true
    }),
    commonjs(),
    analyze({
      limit: 10
    })
  ]
}
