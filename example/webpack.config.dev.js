const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const TransferWebpackPlugin = require('transfer-webpack-plugin')
const toolboxVariables = require('./toolbox-variables');

module.exports = {
  context: __dirname,
  devtool: 'inline-source-map',
  entry: {
    app: [
      'webpack-hot-middleware/client',
      './src/app/index.js'
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['', '.scss', '.css', '.js'],
    packageMains: ['browser', 'web', 'browserify', 'main', 'style'],
    modulesDirectories: [
      'node_modules',
      path.resolve(__dirname, './node_modules')
    ]
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, './src')],
        loader: 'babel'
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss')
      }
    ]
  },
  postcss (webpackInstance) {
    return [
      require('postcss-import')({
        root: path.join(__dirname, './'),
        path: [
          path.join(__dirname, './src')
        ]
      }),
      require('postcss-mixins')(),
      require('postcss-each')(),
      require('postcss-cssnext')({
        features: {
          customProperties: {
            variables: toolboxVariables
          }
        }
      }),
      require('postcss-reporter')({ clearMessages: true })
    ];
  },
  plugins: [
    new ExtractTextPlugin('app.css', { allChunks: true }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]
};