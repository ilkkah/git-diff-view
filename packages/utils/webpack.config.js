const path = require('path');

const cjsConfig = {
  entry: './src/index.ts',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist/cjs'),
    filename: 'index.js',
    library: {
      type: 'commonjs2',
    },
  },
};

const esmConfig = {
  ...cjsConfig,
  output: {
    ...cjsConfig.output,
    path: path.resolve(__dirname, 'dist/esm'),
    filename: 'index.mjs',
    library: {
      type: 'module',
    },
  },
  experiments: {
    outputModule: true,
  },
};

module.exports = [cjsConfig, esmConfig];
