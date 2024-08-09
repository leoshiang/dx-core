const path = require('path')
module.exports = {
  mode: 'production',
  entry: './index.js',
  output: {
    filename: 'index.bundle.js',
    path: path.resolve(__dirname, 'lib'),
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader?plugins=rewire',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  resolve: {
    fallback: {
      'fs': false,
      'os': false,
    },
  },
}
