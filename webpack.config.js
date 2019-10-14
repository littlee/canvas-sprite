const path = require('path');
module.exports = (env, argv) => {
  const isDev = argv.mode === 'development';
  return {
    devServer: {
      host: '0.0.0.0',
      contentBase: path.resolve(__dirname, './example'),
      open: true,
      openPage: 'http://localhost:8080',
      hot: true
    },
    entry: './src/index_next.js',
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-transform-runtime']
            }
          }
        }
      ]
    },
    output: {
      path: isDev ? path.resolve(__dirname, './example') : undefined,
      library: 'CanvasSprite',
      libraryExport: 'default',
      libraryTarget: 'umd'
    }
  };
};
