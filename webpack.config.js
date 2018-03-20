const path = require('path')
const webpack = require('webpack')
// const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

module.exports = {
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'public/js'),
    publicPath: '/js',
    filename: 'app.js',
    sourceMapFilename: '[file].map',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    alias: {
      src: path.join(__dirname, 'src'),
    },
  },
  plugins: [
    // new LodashModuleReplacementPlugin({
    //   collections: true,
    // }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        APP_ENV: JSON.stringify(process.env.APP_ENV || 'development'),
        QUESTIONNAIRE: JSON.stringify(process.env.QUESTIONNAIRE || '0'),
        EXTENT: JSON.stringify(process.env.EXTENT || null),
        CODES: JSON.stringify(process.env.CODES || '0'),
        DEV_PDF_HOST: JSON.stringify(process.env.DEV_PDF_HOST || null),
      },
    }),
  ],
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    host: '0.0.0.0',
    port: 8263,
    historyApiFallback: {
      index: 'index.html',
    },
    inline: true,
  },
}
