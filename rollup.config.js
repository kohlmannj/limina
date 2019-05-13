const path = require('path');
const fs = require('fs');
const typescript = require('rollup-plugin-typescript');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
const sourcemaps = require('rollup-plugin-sourcemaps');
const { terser } = require('rollup-plugin-terser');
const { pascalCase } = require('change-case');

const extensions = ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json', '.node'];

const pkgPath = path.join(process.cwd(), 'package.json');
const pkgStr = fs.readFileSync(pkgPath);
const pkg = JSON.parse(pkgStr);

/** Generate a library name from this package's `name` field, e.g. '@limina/core' → 'LiminaCore' */
const libraryName = path.basename(pascalCase(pkg.name.replace(/^@([^/]+)\//, '$1-')));

const external = pkg.peerDependencies ? Object.keys(pkg.peerDependencies) : [];

module.exports = {
  input: './src/index.ts',
  output: {
    dir: 'dist',
    format: 'umd',
    name: libraryName,
    sourcemap: true,
  },
  external,
  plugins: [
    nodeResolve({ extensions }),
    typescript(),
    commonjs({ extensions }),
    sourcemaps(),
    process.env.NODE_ENV === 'production' &&
      terser({
        output: {
          comments(node, { type, value: text }) {
            // multiline comment
            if (type === 'comment2') {
              return /@preserve|@license|@cc_on/i.test(text);
            }
            return '';
          },
        },
      }),
  ],
};
