/**
 * Create by lwcai
 * Description: webpack.dev.js
 * Date: 2023-02-21
 */
const path = require('path')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const scriptConfig = require('./scriptConfig')
const webpackBaseConfig =  require('./webpack.base')
const packageName = require('../package.json').name
const config = require('../src/config')


module.exports = merge(webpackBaseConfig, {
  mode: 'development',
  output: {
    publicPath: '/',
    sourceMapFilename: 'js/[name].map',
    filename: 'js/[name].js',
    // library: `${packageName}-[name]`
  },
  module: {
    rules: [

    ]
  },
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    server: 'https',
    port: config.serverPort,
    historyApiFallback: true,
    hot: true,
    liveReload: false,
    proxy: {
      '/api/*': {
        target: config.proxyServer,
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/api': '/api' }
      },
    },
    open: true
  },
  cache: {
    type: 'filesystem' // 使用持久化缓存
  },
  optimization: {
    moduleIds: 'named'
  },
  plugins: [
    // webpack5 devServer.hot = true 时自动应用HMR
    // new webpack.HotModuleReplacementPlugin(), // 新增
    new ReactRefreshWebpackPlugin(),

    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, '../src/static/index.template'),
      filename: './index.html',
      scriptsTemplate: scriptConfig.getScriptsTemplate(),
      cssTemplate: scriptConfig.getCssTemplate(),
    }),

    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
  ],
  stats: {
    // timings: true
    modules: false,
    // assets: false,
    // runtimeModules: false,
  },
  resolve: {

  },
})
