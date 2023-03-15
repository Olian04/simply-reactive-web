import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

/** @type {import('rollup').RollupOptions[]} */
export default [
  {
    input: './src/api.ts',
    external: ['simply-reactive'],
    output: {
      file: './cdn/umd.js',
      format: 'umd',
      name: 'simplyReactiveWeb',
      sourcemap: true,
      globals: {
        'simply-reactive': 'simplyReactive',
      },
    },
    plugins: [
      typescript({
        target: 'es5',
        module: 'es6',
        compilerOptions: {
          declaration: false,
          sourceMap: true,
        },
        exclude: ['tests/**/*.ts'],
      }),
      resolve(),
      commonjs(),
      terser(),
    ],
  },
  {
    input: './src/api.ts',
    external: ['simply-reactive'],
    output: {
      file: './cdn/esm.js',
      format: 'es',
      sourcemap: true,
      paths: {
        'simply-reactive': 'https://cdn.jsdelivr.net/npm/simply-reactive@5',
      },
    },
    plugins: [
      typescript({
        target: 'es6',
        module: 'es6',
        compilerOptions: {
          declaration: false,
          sourceMap: true,
        },
        exclude: ['tests/**/*.ts'],
      }),
      resolve(),
      commonjs(),
      terser(),
    ],
  },
];
