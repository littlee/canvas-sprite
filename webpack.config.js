const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

const defaultBabelPlugins = ['@babel/plugin-transform-runtime'];

module.exports = (env, argv) => {
  const isDev = argv.mode === 'development';
  return {
    devServer: {
      host: '0.0.0.0',
      contentBase: path.resolve(__dirname, './example'),
      open: true,
      openPage: 'http://localhost:8080',
      hot: true,
    },
    plugins: [],
    devtool: isDev ? 'inline-source-map' : undefined,
    entry: './src/lib.js',
    externals: {
      'url-parse': {
        commonjs: 'url-parse',
        commonjs2: 'url-parse',
        amd: 'url-parse',
        root: 'URLParse',
      },
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: isDev
                ? defaultBabelPlugins
                : defaultBabelPlugins.concat(['transform-remove-console']),
            },
          },
        },
      ],
    },
    output: {
      path: isDev ? path.resolve(__dirname, './example') : undefined,
      library: 'CanvasSprite',
      libraryExport: 'default',
      libraryTarget: 'umd',
    },
  };
};
