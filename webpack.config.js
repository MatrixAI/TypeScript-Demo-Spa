const process = require('process');
const path = require('path');
const webpack = require('webpack');
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devtool: 'source-map',
  devServer: {
    host: process.env.DEMO_HOST,
    port: process.env.DEMO_PORT,
    watchContentBase: true,
    historyApiFallback: true,
    contentBase: [path.resolve(__dirname, 'dist'), path.resolve(__dirname, 'tests')],
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.vue', '.json'],
    plugins: [new TsConfigPathsPlugin()]
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        test: /\.css$/i,
        use: [ MiniCssExtractPlugin.loader, 'css-loader' ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico|woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      }
    ]
  },
  watchOptions: {
    ignored: /node_modules/
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'assets'
        }
      ]
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
      inject: 'body',
      xhtml: true,
      filename: 'index.html',
      templateParameters: {
        title: 'Demo',
        configJs: `
          window.config = {};
          ${process.env.DEMO_PROT ? `window.config["DEMO_PROT"] = "${process.env.DEMO_PROT}";` : ''}
          ${process.env.DEMO_HOST ? `window.config["DEMO_HOST"] = "${process.env.DEMO_HOST}";` : ''}
          ${process.env.DEMO_PORT ? `window.config["DEMO_PORT"] = "${process.env.DEMO_PORT}";` : ''}
          ${process.env.DEMO_BASE ? `window.config["DEMO_BASE"] = "${process.env.DEMO_BASE}";` : ''}
        `
      }
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: 'true',
      __VUE_PROD_DEVTOOLS__: 'true'
    }),
  ]
};
