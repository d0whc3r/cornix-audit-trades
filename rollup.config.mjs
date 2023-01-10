import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import nodeResolve from '@rollup/plugin-node-resolve'
import builtinModules from 'builtin-modules'
import autoExternal from 'rollup-plugin-auto-external'
import esbuild from 'rollup-plugin-esbuild'
import pkgJson from './package.json' assert { type: 'json' }

const isProd = process.env.NODE_ENV === 'production'

export default function rollupConfig() {
  const resolveOptions = {
    mainFields: ['jsnext:main', 'es2020', 'es2018', 'es2017', 'es2015', 'module', 'main'],
    preferBuiltins: true,
    extensions: ['.ts', '.js', '.mjs', '.node'],
    modulesOnly: false,
    browser: false,
  }
  const plugins = [
    json(),
    autoExternal({
      builtins: true,
      peerDependencies: true,
      dependencies: true,
    }),
    nodeResolve(resolveOptions),
    commonjs(),
    esbuild({
      minify: isProd,
      target: ['node18'],
      sourceMap: !isProd,
    }),
  ]

  const external = [...builtinModules]
  const outputMain = {
    input: 'src/index.ts',
    treeshake: true,
    output: [{ sourcemap: !isProd, file: pkgJson.main, format: 'cjs' }],
    plugins,
    external,
  }
  const outputModule = {
    ...outputMain,
    output: [{ sourcemap: !isProd, file: pkgJson.module, format: 'esm' }],
  }
  return [outputMain, outputModule]
}
